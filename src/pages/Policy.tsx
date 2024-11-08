import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy Policy</h1>
          <ScrollArea className="h-[70vh]">
            <div className="space-y-6 text-gray-700">
              <p className="text-sm italic">
                TechVaseegrah ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by TechVaseegrah when you visit our website https://techvaseegrah.com or use our services.
              </p>

              <Section title="1. Information We Collect">
                <p>We collect several types of information from and about users of our website, including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Personal Identification Information (such as your name, username, email address, phone number, etc.) when you register for an account, make a purchase, or contact us.</li>
                  <li>Non-personal Information (such as your IP address, browser type, and browsing patterns) automatically through cookies and other tracking technologies.</li>
                  <li>Payment Information (such as credit/debit card numbers, UPI details) when you make purchases through our platform.</li>
                </ul>
              </Section>

              <Section title="2. How We Use Your Information">
                <p>We may use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide, operate, and maintain our services.</li>
                  <li>To process transactions and manage your orders.</li>
                  <li>To communicate with you, including responding to your inquiries and sending relevant updates.</li>
                  <li>To personalize your experience on our website.</li>
                  <li>To analyze usage trends and improve our website and services.</li>
                  <li>To prevent fraud, ensure security, and enforce legal terms.</li>
                </ul>
              </Section>

              <Section title="3. Sharing Your Information">
                <p>We do not share your personal information with third parties except:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Service Providers: We may share information with vendors and service providers who help us operate our website, such as payment processors, cloud hosting services, etc.</li>
                  <li>Legal Compliance: We may disclose your information if required by law or in response to valid requests from public authorities.</li>
                </ul>
              </Section>

              <Section title="4. Cookies and Tracking Technologies">
                <p>We use cookies and similar tracking technologies to collect information about your activities on our website. This helps us improve your browsing experience and tailor our services.</p>
                <p>You can manage your cookie preferences by adjusting your browser settings. However, disabling cookies may affect the functionality of our website.</p>
              </Section>

              <Section title="5. Data Security">
                <p>We are committed to protecting the security of your personal information. We use appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>However, no method of transmission over the internet or method of electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>
              </Section>

              <Section title="6. Your Rights">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access and Correction: You can request access to and correction of the personal data we hold about you.</li>
                  <li>Data Deletion: You can request that we delete your personal information, subject to legal or contractual retention obligations by contacting us via email.</li>
                </ul>
              </Section>

              <Section title="7. Third-Party Links">
                <p>Our website may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices or the content of such websites. Please review the privacy policies of any third-party websites you visit.</p>
              </Section>

              <Section title="8. Children's Privacy">
                <p>Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.</p>
              </Section>

              <Section title="9. Changes to This Privacy Policy">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The updated policy will be posted on this page with the "Effective Date" at the top. We encourage you to review this policy periodically.</p>
              </Section>

              <Section title="10. Contact Us">
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                <address className="mt-2 not-italic">
                  <strong>TechVaseegrah</strong><br />
                  #9, Vijaya Nagar, Wahab Nagar, Reddypalayam Road,<br />
                  Srinivasapuram Post, Thanjavur - Tamil Nadu - 613008.<br />
                  Email: <a href="mailto:admin@techvaseegrah.com" className="text-blue-600 hover:underline">admin@techvaseegrah.com</a><br />
                  Phone: +91 8524089733
                </address>
              </Section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="pl-4">{children}</div>
    </section>
  )
}