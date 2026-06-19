import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for enrolling and using services at ${businessInfo.legalName}.`,
};

export default function TermsPage() {
  return (
    <PolicyPageLayout
      title="Terms & Conditions"
      description={`Please read these terms carefully before enrolling in any course or making a payment to ${businessInfo.legalName}.`}
    >
      <p>
        By accessing {businessInfo.website}, booking a demo, enrolling in a course, or
        making a payment, you agree to these Terms & Conditions. If you do not agree,
        please do not use our services.
      </p>

      <h2>1. About Us</h2>
      <p>
        {businessInfo.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides{" "}
        {businessInfo.services}. Our registered contact details are listed on the{" "}
        <Link href="/contact">Contact Us</Link> page.
      </p>

      <h2>2. Services</h2>
      <p>
        We offer live online and offline music classes, structured certification
        programs, performance guidance, and related educational services. Course
        content, duration, fees, and schedules are communicated at the time of
        enrollment and may vary by program level.
      </p>

      <h2>3. Enrollment & Eligibility</h2>
      <ul>
        <li>Students of all eligible age groups may enroll, subject to faculty assessment.</li>
        <li>A free demo session may be offered before enrollment at our discretion.</li>
        <li>Enrollment is confirmed only after fee payment and administrative approval.</li>
        <li>Parents or guardians must enroll and supervise minors where applicable.</li>
      </ul>

      <h2>4. Fees & Payments</h2>
      <ul>
        <li>Course fees are displayed on our website and shared during enrollment.</li>
        <li>Payments may be accepted via UPI, bank transfer, Razorpay, or other approved methods.</li>
        <li>Fees are generally charged monthly or per program block as agreed at enrollment.</li>
        <li>All prices are in Indian Rupees (INR) unless stated otherwise.</li>
        <li>Failure to pay fees on time may result in suspension of classes.</li>
      </ul>

      <h2>5. Class Conduct</h2>
      <ul>
        <li>Students must attend classes punctually with a stable internet connection (for online classes).</li>
        <li>Recording, redistribution, or misuse of class content without permission is prohibited.</li>
        <li>Respectful behaviour toward faculty and fellow students is expected at all times.</li>
        <li>We reserve the right to suspend or terminate enrollment for misconduct or repeated absence.</li>
      </ul>

      <h2>6. Intellectual Property</h2>
      <p>
        All teaching materials, recordings, logos, curriculum, and website content are
        the property of {businessInfo.legalName} or its licensors. You may not copy,
        reproduce, or distribute them without written consent.
      </p>

      <h2>7. Certifications</h2>
      <p>
        Certificates and diplomas are awarded upon successful completion of program
        requirements and assessments. Affiliation with external examination bodies does
        not guarantee automatic certification without meeting their criteria.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        We strive to provide high-quality training but do not guarantee specific
        performance outcomes, examination results, or professional opportunities.
        To the extent permitted by law, we are not liable for indirect, incidental,
        or consequential damages arising from use of our services.
      </p>

      <h2>9. Force Majeure</h2>
      <p>
        We are not responsible for delays or interruptions caused by events beyond
        reasonable control, including internet outages, natural disasters, or government
        restrictions. Rescheduled classes will be communicated in such cases.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        We may update these Terms & Conditions at any time. Continued use of our
        services after changes are posted constitutes acceptance of the revised terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes shall be subject
        to the jurisdiction of courts in Chennai, Tamil Nadu.
      </p>

      <h2>12. Contact</h2>
      <p>
        For questions about these terms, contact us at{" "}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> or{" "}
        <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}>{businessInfo.phone}</a>.
        See our <Link href="/contact">Contact Us</Link> page for full details.
      </p>
    </PolicyPageLayout>
  );
}
