import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import { usePageTitle } from "@/hooks/usePageTitle";

const LAST_UPDATED = "July 25, 2026";
const CONTACT_EMAIL = "privacy@pentacoop.com";

const Terms = () => {
  usePageTitle("Terms of Service - Penta Housing Co-Op");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 text-gray-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of These Terms</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the website of Penta
              Housing Co-Operative Association ("Penta," "we," "us," or "our") at pentacoop.com. By
              accessing or using the website, you agree to these Terms. If you do not agree, please do
              not use the website. Our{" "}
              <Link to="/privacy" className="text-green-700 underline hover:text-green-800">
                Privacy Policy
              </Link>{" "}
              is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">2. About This Website</h2>
            <p>
              This website provides general information about Penta Housing Co-Op, our community, and our
              membership application process. The information on this site is provided for general
              informational purposes only. It is not an offer of housing or membership and does not create
              any contractual obligation on the part of Penta.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">3. Acceptable Use</h2>
            <p>You agree to use this website only for lawful purposes. You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>use the site in any way that violates applicable laws or regulations;</li>
              <li>interfere with or disrupt the site, its servers, or its security features;</li>
              <li>attempt to gain unauthorized access to any part of the site or related systems;</li>
              <li>collect or harvest information from the site through automated means without our permission;</li>
              <li>submit false, misleading, or fraudulent information.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">4. Membership Applications</h2>
            <p>
              Submitting an application, joining our mailing list, or otherwise expressing interest through
              this website does not create a tenancy, a membership, or any other contractual right, and
              does not guarantee that you will be offered housing or accepted as a member. All applications
              are subject to review by our membership committee, our eligibility criteria, unit
              availability, and our bylaws, rules, and applicable law. Penta may accept or decline any
              application at its discretion, and we make no representation about wait times or the
              likelihood of approval.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">5. Intellectual Property</h2>
            <p>
              The content on this website, including text, graphics, logos, images, and their arrangement,
              is owned by Penta or its licensors and is protected by applicable intellectual property laws.
              You may view and use the content for your own personal, non-commercial, informational
              purposes. You may not otherwise copy, reproduce, distribute, or create derivative works from
              the content without our prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">6. Third-Party Links and Services</h2>
            <p>
              This website may contain links to third-party websites and services, and may rely on
              third-party services for functions such as forms, sign-in, maps, and analytics. These are
              provided for your convenience. We do not control and are not responsible for the content,
              policies, or practices of any third-party website or service. Your use of a third party's
              website or service is governed by that party's own terms and privacy policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">7. Disclaimer</h2>
            <p>
              This website and its content are provided on an "as is" and "as available" basis, without
              warranties of any kind, whether express or implied. We do not warrant that the website will
              be uninterrupted, error-free, or secure, or that the information on it is accurate, complete,
              or current. Information on the site may be changed or updated at any time without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Penta and its directors, officers, members,
              volunteers, and agents will not be liable for any direct, indirect, incidental,
              consequential, or other damages arising out of or in connection with your use of, or
              inability to use, this website, your reliance on any content, or any third-party website or
              service linked from this site. Nothing in these Terms excludes or limits liability that
              cannot be excluded or limited under applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">9. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Province of
              British Columbia and the federal laws of Canada applicable therein, without regard to
              conflict-of-laws principles. You agree that the courts of British Columbia will have
              jurisdiction over any dispute arising out of or relating to these Terms or your use of the
              website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">10. Changes to These Terms</h2>
            <p>
              We may modify these Terms from time to time. When we do, we will revise the "Last updated"
              date at the top of this page. Your continued use of the website after changes take effect
              means you accept the updated Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">11. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will
              be limited or removed to the minimum extent necessary, and the remaining provisions will
              remain in full force and effect.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 underline hover:text-green-800">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link to="/privacy" className="text-sm text-green-700 underline hover:text-green-800">
            View our Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;
