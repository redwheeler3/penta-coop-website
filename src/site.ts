import "./index.css";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const track = (name: string, params: Record<string, unknown> = {}) => {
  window.gtag?.("event", name, { page_location: window.location.href, ...params });
};

const showToast = (message: string, variant: "success" | "error" = "success") => {
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");
  toast.className = `fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
    variant === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800"
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 5000);
};

track("page_view", { page_path: window.location.pathname, page_title: document.title });

document.querySelector<HTMLButtonElement>("[data-menu-toggle]")?.addEventListener("click", () => {
  document.querySelector("[data-mobile-menu]")?.classList.toggle("hidden");
});

document.querySelector<HTMLButtonElement>("[data-open-application]")?.addEventListener("click", () => {
  track("cta_click", { button_name: "Complete Application Form", button_location: "Application Form" });
  window.open("https://applications.pentacoop.com/", "_blank", "noopener");
});

document.addEventListener("click", (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>("a");
  if (!link) return;
  const label = link.textContent?.replace(/\s+/g, " ").trim() || "Link";
  if (link.origin !== window.location.origin) {
    track("external_link_click", { link_name: label, link_url: link.href });
    const resourceCategory = link.dataset.resourceCategory;
    if (resourceCategory) track("resource_link_click", { resource_category: resourceCategory, link_name: label });
  } else if (link.pathname !== window.location.pathname) {
    track("navigation_click", { destination: link.pathname, location: "static_page" });
  }
});

document.querySelectorAll<HTMLElement>("[data-accordion-name]").forEach((trigger) => {
  trigger.addEventListener("click", () => track("accordion_click", { accordion_name: trigger.dataset.accordionName }));
});

const signup = document.querySelector<HTMLFormElement>("[data-email-signup]");
let formStarted = false;
signup?.querySelectorAll<HTMLButtonElement>("button[role=checkbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.nextElementSibling as HTMLInputElement | null;
    if (!input) return;
    input.checked = !input.checked;
    button.setAttribute("aria-checked", String(input.checked));
    button.dataset.state = input.checked ? "checked" : "unchecked";
    button.innerHTML = input.checked
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>'
      : "";
  });
});
signup?.querySelector<HTMLInputElement>("input[type=email]")?.addEventListener("focus", () => {
  if (!formStarted) track("form_start", { form_name: "Email Signup" });
  formStarted = true;
});

signup?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = signup.querySelector<HTMLInputElement>("input[type=email]");
  const preferences = [...signup.querySelectorAll<HTMLInputElement>("input[type=checkbox]:checked")];
  if (!email?.value || preferences.length === 0) {
    track("form_error", { form_name: "Email Signup", error_type: "Missing Information" });
    showToast("Please fill in both email and unit preferences.", "error");
    return;
  }
  const form = new FormData();
  form.set("emailAddress", email.value);
  preferences.forEach((input) => form.append("entry.2074227584", input.value));
  track("form_submit", { form_name: "Email Signup", bedroom_preferences: preferences.map(({ value }) => value).join(","), num_preferences: preferences.length, form_destination: "google_forms" });
  fetch("https://docs.google.com/forms/d/e/1FAIpQLSfvce57NjEBBI7qx3l7eYCsjAy3j4yMqZVnjbclGOfZ9uDFIw/formResponse", { method: "POST", mode: "no-cors", body: form })
    .then(() => { signup.reset(); showToast("Thank you! You've been added to our mailing list."); })
    .catch(() => { track("form_error", { form_name: "Email Signup", error_type: "Submission Failed" }); showToast("Failed to submit. Please try again.", "error"); });
});

window.addEventListener("pagehide", () => {
  const email = signup?.querySelector<HTMLInputElement>("input[type=email]");
  if (formStarted && email?.value) track("form_abandonment", { form_name: "Email Signup" });
});
