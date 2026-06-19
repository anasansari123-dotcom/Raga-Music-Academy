import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation policy for courses and payments at ${businessInfo.legalName}.`,
};

export default function RefundPolicyPage() {
  return (
    <PolicyPageLayout
      title="Refund & Cancellation Policy"
      description="Our policy on course cancellations, rescheduling, and fee refunds."
    >
      <p>
        {businessInfo.legalName} provides live music education services. Please read
        this policy before making a payment. By enrolling and paying fees, you agree
        to the terms below.
      </p>

      <h2>1. Nature of Services</h2>
      <p>
        Our services include live online and offline vocal music classes, structured
        training programs, and certification preparation. These are educational services
        delivered over time — not physical products.
      </p>

      <h2>2. Demo Session</h2>
      <p>
        We offer a free demo session before enrollment where possible. We encourage
        all prospective students to attend a demo to understand our teaching style,
        course structure, and fees before payment.
      </p>

      <h2>3. Cancellation by Student</h2>
      <ul>
        <li>
          Students may request cancellation of enrollment by notifying us via WhatsApp
          or email at least <strong>7 days before</strong> the start of the next billing
          cycle or program block.
        </li>
        <li>
          Cancellation requests must include the student name, enrolled course, and
          reason for cancellation.
        </li>
        <li>
          Once a class month or program block has commenced, fees for that period are
          generally non-refundable.
        </li>
      </ul>

      <h2>4. Refund Eligibility</h2>
      <p>Refunds may be considered in the following situations:</p>
      <ul>
        <li>
          <strong>Duplicate payment:</strong> If you accidentally pay twice for the same
          period, the excess amount will be refunded after verification.
        </li>
        <li>
          <strong>Payment error:</strong> If an incorrect amount was charged due to a
          technical error, we will refund the difference or the full amount as applicable.
        </li>
        <li>
          <strong>Service not delivered:</strong> If we are unable to commence classes
          within a reasonable time after confirmed payment and enrollment, you may
          request a full refund.
        </li>
        <li>
          <strong>Advance payment before start:</strong> If you paid in advance and cancel
          at least 7 days before the program start date, a refund may be issued after
          deducting any administrative or payment gateway charges.
        </li>
      </ul>

      <h2>5. Non-Refundable Cases</h2>
      <ul>
        <li>Fees for classes already attended or delivered in the billing period</li>
        <li>Missed classes due to student absence, late joining, or technical issues on the student&apos;s side</li>
        <li>Change of mind after a billing period has started</li>
        <li>Examination or certification fees paid to third-party bodies</li>
        <li>Payment gateway or bank charges (where applicable)</li>
      </ul>

      <h2>6. Rescheduling & Transfers</h2>
      <ul>
        <li>Class rescheduling may be offered based on faculty availability.</li>
        <li>Course transfers to a different program or batch are subject to approval and fee adjustment.</li>
        <li>Extended leave may be granted in genuine cases; fees for the leave period are not automatically refunded.</li>
      </ul>

      <h2>7. Cancellation by Academy</h2>
      <p>
        We reserve the right to cancel or reschedule classes due to faculty unavailability,
        technical issues, or force majeure events. In such cases, alternative sessions
        will be offered. If services cannot be delivered, eligible fees will be refunded
        or adjusted.
      </p>

      <h2>8. Refund Process</h2>
      <ol>
        <li>Submit a refund request via WhatsApp or email with payment proof.</li>
        <li>We will review and respond within 5–7 business days.</li>
        <li>Approved refunds will be processed to the original payment method within 7–14 business days.</li>
        <li>UPI refunds will be sent to the same UPI ID used for payment, where possible.</li>
      </ol>

      <h2>9. Disputes</h2>
      <p>
        If you disagree with a refund decision, contact us with supporting details.
        We will make reasonable efforts to resolve the matter amicably.
      </p>

      <h2>10. Contact</h2>
      <p>
        For refund or cancellation requests, reach us at{" "}
        <a href={businessInfo.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        ,{" "}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>, or{" "}
        <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}>{businessInfo.phone}</a>.
        See also our <Link href="/contact">Contact Us</Link> and{" "}
        <Link href="/terms">Terms & Conditions</Link> pages.
      </p>
    </PolicyPageLayout>
  );
}
