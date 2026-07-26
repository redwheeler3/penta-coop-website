import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import { usePageTitle } from "@/hooks/usePageTitle";

const LAST_UPDATED = "July 25, 2026";
const PRIVACY_EMAIL = "privacy@pentacoop.com";

const Privacy = () => {
  usePageTitle("Privacy Policy - Penta Housing Co-Op");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <p>
              Penta Housing Co-Operative Association ("Penta," "we," "us," or "our") is committed to
              protecting the privacy of visitors to our website and of people who apply for membership
              in our cooperative. This Privacy Policy explains what personal information we collect, how
              and why we use it, when we disclose it, and the choices and rights you have.
            </p>
            <p>
              We handle personal information in accordance with British Columbia's{" "}
              <em>Personal Information Protection Act</em> (PIPA), and, where it applies to information
              that crosses provincial or national borders, Canada's{" "}
              <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">1. Accountability &amp; Privacy Officer</h2>
            <p>
              Penta is responsible for the personal information under its control. We have designated a
              Privacy Officer who is accountable for our compliance with this policy and with applicable
              privacy law. You can reach our Privacy Officer at{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green-700 underline hover:text-green-800">
                {PRIVACY_EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">2. What Is Personal Information?</h2>
            <p>
              "Personal information" means information about an identifiable individual. It includes
              things like your name, email address, telephone number, household details, income
              information, and housing history. It does not include business contact information used
              solely to contact you in your role at an organization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">3. Information We Collect</h2>
            <p>We collect personal information in two different contexts:</p>

            <h3 className="text-lg font-medium text-gray-800 pt-2">Website visitors</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-gray-800">Analytics data.</span> When you visit our
                website, a third-party web analytics service collects standard technical information
                such as your approximate location, device and browser type, the pages you view, and how
                you arrived at the site. This is used in aggregate to understand and improve the site.
              </li>
              <li>
                <span className="font-medium text-gray-800">Mailing-list sign-ups.</span> If you join
                our mailing list, we collect the email address and unit preferences you submit through
                an embedded third-party form service so that we can notify you when units become
                available.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 pt-2">Membership applicants</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                The information you provide on our membership application, which may include your name,
                contact details, household composition, income information, and housing history.
              </li>
              <li>
                Your consent to a housing reference check and a credit check, where you provide it as
                part of your application.
              </li>
              <li>
                Where our application process uses a third-party sign-in (authentication) provider or
                imports responses from a third-party form service, we receive only the information
                needed to verify identity and to process and review your submission (see Section 8).
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">4. How and Why We Use Your Information</h2>
            <p>We only use personal information for purposes a reasonable person would consider appropriate in the circumstances, including to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>contact you about your application or about available units;</li>
              <li>determine your eligibility for housing and membership at Penta;</li>
              <li>determine eligibility for the Home Owner Grant;</li>
              <li>conduct a housing reference check;</li>
              <li>conduct a credit check;</li>
              <li>decide on any request for an internal move;</li>
              <li>operate, maintain, and improve our website and mailing list.</li>
            </ul>
            <p>
              Membership applications are reviewed by our membership committee and other authorized
              people (see Section 6). Some of this review is supported by an internal screening tool that
              helps the committee organize and assess applications; final membership decisions are always
              made by people, not automatically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">5. Consent</h2>
            <p>
              We collect, use, and disclose your personal information with your consent, except where we
              are authorized or required by law to do so without it. Depending on the sensitivity of the
              information, consent may be express (for example, when you agree to a credit check) or
              implied (for example, when you voluntarily provide information for a clearly identified
              purpose). We identify the purpose at or before the time we collect the information.
            </p>
            <p>
              You may withdraw your consent at any time, subject to legal or contractual restrictions and
              reasonable notice. If you withdraw consent, we will explain the likely consequences, which
              may include our being unable to process your application or keep you on our mailing list. To
              unsubscribe from the mailing list, follow the instructions in our emails or contact our
              Privacy Officer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">6. Disclosure of Personal Information</h2>
            <p>
              We limit access to your personal information to those who need it for the purposes described
              above. The personal information you provide to Penta may be made available to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>the Co-op auditor;</li>
              <li>the Co-op lawyer;</li>
              <li>the Co-op treasurer;</li>
              <li>the Co-op directors;</li>
              <li>designated committee members, as approved by the Board;</li>
              <li>agents and staff of the Co-op's management company;</li>
              <li>municipal employees, for Home Owner Grant applications;</li>
              <li>
                the general membership, only if it is relevant to an appeal you make on a Board decision.
              </li>
            </ul>
            <p>
              We do not sell or rent your personal information. Where we use a service provider to process
              information on our behalf, we require it to protect the information and to use it only for
              the purposes we specify. We may also disclose personal information where required or
              permitted by law, such as in response to a court order, subpoena, or warrant.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">7. Retention and Destruction</h2>
            <p>
              We keep personal information only as long as necessary to fulfill the purposes for which it
              was collected, or as required by law. Where we use personal information to make a decision
              that directly affects you, we retain it for at least one year so that you have an opportunity
              to request access to it. We destroy your personal information according to the following
              schedule:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium text-gray-800">Non-members:</span> within 1 year of the
                application closing date;
              </li>
              <li>
                <span className="font-medium text-gray-800">Members:</span> within 7 years of the
                application closing date.
              </li>
            </ul>
            <p>When personal information is no longer required, we securely destroy, erase, or anonymize it.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">8. Third-Party Services, Google Sign-In, and Google APIs</h2>
            <p>
              Some of our website and application features rely on third-party services, including a web
              analytics service, an embedded form service, and Google sign-in together with Google APIs
              that let authorized committee members review the applications you submit.
            </p>
            <p>
              When you sign in with Google, we receive only basic profile information (your name and email
              address) needed to verify your identity and give authorized committee members access to our
              internal application-review tool. Signing in does not grant the tool access to your Google
              Drive, Gmail, or other Google data. Separately, an authorized administrator connects the
              single Google Sheet that holds membership-application responses, using Google's file picker;
              this grants read-only access to that one file only, so the committee can review submitted
              applications. We do not access any other files in anyone's Google Drive.
            </p>
            <p>
              We use information obtained through Google sign-in and Google APIs only to provide and improve
              the features described in this policy. In particular:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                we do not sell, rent, or transfer this information to advertising networks, data brokers,
                or information resellers;
              </li>
              <li>
                we do not use it to serve advertising, including personalized, interest-based, or
                retargeted advertising;
              </li>
              <li>
                we do not allow staff or volunteers to read this information except where you have asked us
                to, where it is necessary to operate a feature you requested (such as reviewing your
                application), where it is needed to maintain security or investigate abuse, or where
                required by law;
              </li>
              <li>
                we may transfer it only to provide a feature you requested, to protect security and
                investigate abuse, to comply with applicable law, or in connection with a merger,
                acquisition, or similar transaction subject to the protections in this policy.
              </li>
            </ul>
            <p>
              Penta's use and transfer of information received from Google APIs to any other app will
              adhere to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline hover:text-green-800"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. Google handles your information under its own{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline hover:text-green-800"
              >
                privacy policy
              </a>
              , which we encourage you to review.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">9. How We Protect Your Information</h2>
            <p>
              We protect personal information with safeguards appropriate to its sensitivity. These include
              administrative measures (such as limiting access to authorized people and requiring
              confidentiality), physical measures (such as securing paper records), and technological
              measures (such as passwords, access controls, and encryption in transit where appropriate).
              No method of transmission or storage is completely secure, but we take reasonable steps to
              guard against loss, theft, and unauthorized access, use, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">10. Accuracy, Access, and Correction</h2>
            <p>
              We make reasonable efforts to keep your personal information accurate and complete. You have
              the right to ask what personal information we hold about you, how it has been used, and to
              whom it has been disclosed, and to request corrections.
            </p>
            <p>
              To make a request, contact our Privacy Officer at{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green-700 underline hover:text-green-800">
                {PRIVACY_EMAIL}
              </a>
              . We may need to verify your identity before responding. We will respond within the time
              required by law (generally 30 business days), and we will let you know in advance if any
              minimal fee applies. If we cannot correct information as you ask, we will note your requested
              correction in our records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">11. Questions and Complaints</h2>
            <p>
              If you have a question or concern about how we handle your personal information, please
              contact our Privacy Officer at{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green-700 underline hover:text-green-800">
                {PRIVACY_EMAIL}
              </a>
              . You will receive a response within 10 business days. If you are not satisfied with our
              response, you may contact the Office of the Information and Privacy Commissioner for British
              Columbia (OIPC).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last
              updated" date at the top of this page. Your continued use of our website after changes take
              effect means you accept the updated policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              Penta Housing Co-Operative Association<br />
              Vancouver, British Columbia, Canada<br />
              Privacy Officer:{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} className="text-green-700 underline hover:text-green-800">
                {PRIVACY_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link to="/terms" className="text-sm text-green-700 underline hover:text-green-800">
            View our Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
