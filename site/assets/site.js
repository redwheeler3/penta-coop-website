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

signup?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signup.querySelector("input[type=email]");
  const preferences = [...signup.querySelectorAll("input[type=checkbox]:checked")];
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
  const form = new FormData();
  const formName = signup.dataset.formName;
  form.set(signup.dataset.emailField, email.value);
  preferences.forEach((input) => form.append(signup.dataset.preferenceField, input.value));
  track("form_submit", { form_name: formName, bedroom_preferences: preferences.map(({ value }) => value).join(","), num_preferences: preferences.length, form_destination: "google_forms" });
  const submitButton = signup.querySelector('button[type="submit"]');
  submitButton?.setAttribute("aria-busy", "true");
  submitButton?.setAttribute("disabled", "");
  fetch(signup.dataset.submitUrl, { method: "POST", mode: "no-cors", body: form })
    .then(() => { signup.reset(); showToast("Thank you! You've been added to our mailing list."); })
    .catch(() => { track("form_error", { form_name: "Email Signup", error_type: "Submission Failed" }); showToast("Failed to submit. Please try again.", "error"); })
    .finally(() => { isSubmitting = false; submitButton?.removeAttribute("aria-busy"); submitButton?.removeAttribute("disabled"); });
});

window.addEventListener("pagehide", () => {
  const email = signup?.querySelector("input[type=email]");
  if (formStarted && email?.value) track("form_abandonment", { form_name: "Email Signup" });
});
