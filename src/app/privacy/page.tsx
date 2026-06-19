import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${businessInfo.legalName} collects, uses, and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <PolicyPageLayout
      title="Privacy Policy"
      description={`${businessInfo.legalName} is committed to protecting your privacy. This policy explains what information we collect and how we use it.`}
    >
      <p>
        This Privacy Policy applies to visitors and students of {businessInfo.website}{" "}
        and to anyone who contacts us, books a demo, or enrolls in our courses.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li>
          <strong>Contact details:</strong> name, phone number, email address, and
          WhatsApp number when you submit a form or message us.
        </li>
        <li>
          <strong>Enrollment information:</strong> course interest, skill level, age
          group, preferred class timings, and messages you share with us.
        </li>
        <li>
          <strong>Payment information:</strong> transaction references, UPI payment
          confirmations, and screenshots you share for fee verification. We do not
          store full card or UPI PIN details on our servers.
        </li>
        <li>
          <strong>Technical data:</strong> browser type, device information, IP
          address, and pages visited (via standard website analytics, if enabled).
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to demo requests and course enquiries</li>
        <li>To enroll you in classes and communicate schedules</li>
        <li>To process and confirm fee payments</li>
        <li>To provide teaching support and share practice materials</li>
        <li>To improve our website, services, and student experience</li>
        <li>To comply with legal and regulatory obligations</li>
      </ul>

      <h2>3. Payment Processing</h2>
      <p>
        Online payments may be processed through secure third-party payment gateways
        such as Razorpay. Payment data is handled according to the payment provider&apos;s
        security standards. We receive only the information necessary to confirm your
        transaction (e.g., payment status, amount, reference ID).
      </p>

      <h2>4. Sharing of Information</h2>
      <p>We do not sell your personal data. We may share information only:</p>
      <ul>
        <li>With faculty and staff involved in your training</li>
        <li>With payment processors to complete transactions</li>
        <li>With affiliated examination bodies when you opt for certification</li>
        <li>When required by law, court order, or government authority</li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain your information for as long as needed to provide services, maintain
        records, and comply with legal requirements. You may request deletion of
        non-essential data by contacting us, subject to applicable record-keeping laws.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable technical and organisational measures to protect your
        information. However, no method of transmission over the internet is completely
        secure, and we cannot guarantee absolute security.
      </p>

      <h2>7. Cookies & Analytics</h2>
      <p>
        Our website may use cookies or similar technologies to improve functionality
        and understand usage patterns. You can control cookies through your browser
        settings.
      </p>

      <h2>8. Children&apos;s Privacy</h2>
      <p>
        We enroll students of various ages, including children. For minors, we expect
        parents or guardians to provide consent and supervise enrollment and
        communication.
      </p>

      <h2>9. Your Rights</h2>
      <p>You may request to:</p>
      <ul>
        <li>Access or correct your personal information</li>
        <li>Withdraw consent for non-essential communications</li>
        <li>Request deletion of data where legally permitted</li>
      </ul>

      <h2>10. Third-Party Links</h2>
      <p>
        Our website may link to social media platforms (Instagram, YouTube, Facebook,
        WhatsApp). We are not responsible for the privacy practices of those external
        sites.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
        date at the top of this page will reflect the latest revision.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        For privacy-related questions or requests, contact{" "}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> or visit our{" "}
        <Link href="/contact">Contact Us</Link> page.
      </p>
    </PolicyPageLayout>
  );
}
