const pageLocation = () => `${window.location.origin}${window.location.pathname}${window.location.search}`;

const track = (name, params = {}) => {
  window.gtag?.("event", name, { page_location: pageLocation(), ...params });
};

const showToast = (message, variant = "success") => {
  const toast = document.createElement("div");
  toast.setAttribute("role", variant === "error" ? "alert" : "status");
  toast.className = `fixed top-20 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border-2 px-5 py-4 text-base font-semibold shadow-2xl ${variant === "success" ? "border-green-600 bg-green-50 text-green-900" : "border-red-600 bg-red-50 text-red-900"}`;
  toast.style.position = "fixed";
  toast.style.top = "5rem";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.width = "calc(100% - 2rem)";
  toast.style.maxWidth = "32rem";
  toast.style.zIndex = "100";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 7000);
};

document.querySelector("[data-menu-toggle]")?.addEventListener("click", (event) => {
  const menu = document.querySelector("[data-mobile-menu]");
  menu?.classList.toggle("hidden");
  event.currentTarget.setAttribute("aria-expanded", String(!menu?.classList.contains("hidden")));
});

document.querySelector("[data-open-application]")?.addEventListener("click", () => {
  track("cta_click", { button_name: "Complete Application Form", button_location: "Application Form" });
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest("a");
  if (!link) return;
  const label = link.textContent.replace(/\s+/g, " ").trim() || "Link";
  if (link.origin !== window.location.origin && !link.hasAttribute("data-analytics-skip-external")) {
    track("external_link_click", { link_name: label, link_url: link.href });
    if (link.dataset.resourceCategory) track("resource_link_click", { resource_category: link.dataset.resourceCategory, link_name: label });
  } else if (link.pathname !== window.location.pathname) {
    track("navigation_click", { destination: link.pathname, location: "static_page" });
  }
});

document.querySelectorAll("[data-accordion-name]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const content = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!content) return;
    const isOpen = trigger.getAttribute("aria-expanded") !== "true";
    trigger.setAttribute("aria-expanded", String(isOpen));
    content.hidden = !isOpen;
    track("accordion_click", { accordion_name: trigger.dataset.accordionName });
  });
});

const signup = document.querySelector("[data-email-signup]");
let formStarted = false;
let isSubmitting = false;

signup?.querySelector("input[type=email]")?.addEventListener("focus", () => {
  if (!formStarted) track("form_start", { form_name: "Email Signup" });
  formStarted = true;
});

signup?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = signup.querySelector("input[type=email]");
  const preferences = [...signup.querySelectorAll('input[name="unitSize"]:checked')];
  if (!email?.validity.valid) {
    email?.setAttribute("aria-invalid", "true");
    email?.focus();
    track("form_error", { form_name: "Email Signup", error_type: "Invalid Email" });
    showToast("Please enter a valid email address.", "error");
    return;
  }
  email.removeAttribute("aria-invalid");
  if (preferences.length === 0) {
    track("form_error", { form_name: "Email Signup", error_type: "Missing Unit Preference" });
    showToast("Please select at least one unit preference.", "error");
    return;
  }
  if (isSubmitting) return;
  isSubmitting = true;
  const formName = signup.dataset.formName;
  const unitSizes = preferences.map(({ value }) => Number(value));
  track("form_submit", { form_name: formName, bedroom_preferences: unitSizes.join(","), num_preferences: preferences.length, form_destination: "penta_applications" });
  const submitButton = signup.querySelector('button[type="submit"]');
  const submitLabel = signup.querySelector("[data-submit-label]");
  const submitIcon = signup.querySelector("[data-submit-icon]");
  const submitSpinner = signup.querySelector("[data-submit-spinner]");
  submitButton?.setAttribute("aria-busy", "true");
  submitButton?.setAttribute("disabled", "");
  if (submitLabel) submitLabel.textContent = "Submitting...";
  submitIcon?.setAttribute("hidden", "");
  submitSpinner?.removeAttribute("hidden");
  try {
    const result = await submitVacancyRequest({ email: email.value, unitSizes });
    if (result === "saved") {
      signup.reset();
      formStarted = false;
      showSignupStatus("You're signed up. We'll email you once when a requested unit size becomes available.", "success");
      track("form_success", { form_name: formName });
    } else if (result === "invalid") {
      showSignupStatus("We couldn't save those details. Please check your email address and unit preferences, then try again.", "error");
      track("form_error", { form_name: formName, error_type: "Invalid Request" });
    } else {
      showSignupStatus("We're sorry, but we still couldn't save your request. Please email Tech Support at techsupport@pentacoop.com with the unit sizes you want, and we'll add you manually.", "error", true);
      track("form_error", { form_name: formName, error_type: "Recovery Exhausted" });
    }
  } finally {
    isSubmitting = false;
    submitButton?.removeAttribute("aria-busy");
    submitButton?.removeAttribute("disabled");
    if (submitLabel) submitLabel.textContent = "Subscribe for Updates";
    submitIcon?.removeAttribute("hidden");
    submitSpinner?.setAttribute("hidden", "");
  }
});

const RETRY_INTERVAL_MS = 10000;
const RETRY_DEADLINE_MS = 120000;
const REQUEST_TIMEOUT_MS = 15000;

async function submitVacancyRequest(payload) {
  const startedAt = Date.now();
  const wakingMessage = window.setTimeout(() => {
    showSignupStatus("The signup service is waking up. This is normal, and we're retrying automatically. Please give us a minute.", "waiting");
  }, 5000);
  const extendedMessage = window.setTimeout(() => {
    showSignupStatus("This is taking longer than usual. Your request has not been saved yet. We'll keep trying automatically for another 60 seconds.", "waiting");
  }, 60000);
  try {
    while (Date.now() - startedAt < RETRY_DEADLINE_MS) {
      const attemptStartedAt = Date.now();
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await fetch(signup.dataset.submitUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        if (response.ok) return "saved";
        if (response.status >= 400 && response.status < 500 && response.status !== 429) return "invalid";
      } catch {
        // A suspended or recovering service may reset the connection. The bounded loop retries it.
      } finally {
        window.clearTimeout(timeout);
      }
      const remaining = RETRY_DEADLINE_MS - (Date.now() - startedAt);
      if (remaining <= 0) break;
      const attemptDuration = Date.now() - attemptStartedAt;
      await new Promise((resolve) => window.setTimeout(resolve, Math.min(remaining, Math.max(0, RETRY_INTERVAL_MS - attemptDuration))));
    }
    return "failed";
  } finally {
    window.clearTimeout(wakingMessage);
    window.clearTimeout(extendedMessage);
  }
}

function showSignupStatus(message, variant, linkTechSupport = false) {
  const status = signup?.querySelector("[data-signup-status]");
  if (!status) return;
  status.hidden = false;
  status.classList.remove("border-green-300", "bg-green-50", "text-green-900", "border-blue-300", "bg-blue-50", "text-blue-900", "border-red-300", "bg-red-50", "text-red-900");
  const classes = variant === "success"
    ? ["border-green-300", "bg-green-50", "text-green-900"]
    : variant === "waiting"
      ? ["border-blue-300", "bg-blue-50", "text-blue-900"]
      : ["border-red-300", "bg-red-50", "text-red-900"];
  status.classList.add(...classes);
  status.textContent = message;
  if (linkTechSupport) {
    const text = "techsupport@pentacoop.com";
    const before = message.indexOf(text);
    if (before >= 0) {
      status.textContent = message.slice(0, before);
      const link = document.createElement("a");
      link.href = `mailto:${text}`;
      link.className = "font-semibold underline";
      link.textContent = text;
      status.append(link, message.slice(before + text.length));
    }
  }
}

window.addEventListener("pagehide", () => {
  const email = signup?.querySelector("input[type=email]");
  if (formStarted && email?.value) track("form_abandonment", { form_name: "Email Signup" });
});
