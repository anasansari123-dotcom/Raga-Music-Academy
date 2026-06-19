import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `Service delivery policy for online and offline music classes at ${businessInfo.legalName}.`,
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPageLayout
      title="Shipping & Delivery Policy"
      description="How our music education services are delivered — online classes, offline sessions, and digital materials."
    >
      <p>
        {businessInfo.legalName} provides educational music services, not physical
        goods. This Shipping & Delivery Policy explains how our services and any
        digital or physical materials are delivered to enrolled students.
      </p>

      <h2>1. No Physical Product Shipping</h2>
      <p>
        We do not sell or ship physical products through our website. Course fees are
        for live music training, guidance, and related educational services. No shipping
        charges apply for standard enrollment.
      </p>

      <h2>2. Online Class Delivery</h2>
      <ul>
        <li>
          Online classes are delivered live via video conferencing platforms (e.g.,
          Google Meet, Zoom, or similar) at scheduled times agreed during enrollment.
        </li>
        <li>
          Class links, schedules, and practice materials are shared via WhatsApp, email,
          or other approved communication channels after enrollment confirmation.
        </li>
        <li>
          Students are responsible for a stable internet connection, suitable device,
          and a quiet environment for online sessions.
        </li>
        <li>
          Recordings of live classes may be shared at the faculty&apos;s discretion for
          revision purposes. Redistribution without permission is not allowed.
        </li>
      </ul>

      <h2>3. Offline Class Delivery</h2>
      <ul>
        <li>
          Offline classes are conducted at designated academy locations or partner
          centres, primarily in Chennai and other affiliated locations as communicated
          at enrollment.
        </li>
        <li>
          Students must attend sessions at the agreed venue and time. Venue details
          are shared upon enrollment.
        </li>
      </ul>

      <h2>4. Service Commencement Timeline</h2>
      <ul>
        <li>
          Classes typically commence within <strong>3–7 business days</strong> after
          fee confirmation and enrollment approval.
        </li>
        <li>
          Exact start dates depend on batch availability, faculty schedule, and student
          level assessment.
        </li>
        <li>
          You will receive confirmation of your class schedule via WhatsApp or phone
          before the first session.
        </li>
      </ul>

      <h2>5. Digital Materials</h2>
      <p>
        Practice notes, notation sheets, audio references, and assignment materials may
        be shared digitally through WhatsApp, email, or cloud links. These are delivered
        electronically and do not require physical shipping.
      </p>

      <h2>6. Certification & Examination Materials</h2>
      <p>
        Study materials for affiliated grade examinations (e.g., Bridge Academy, AIMA,
        Suro Bharati) may be provided digitally or through partner institutions.
        Physical books or certificates, if applicable, are dispatched by the respective
        examination body according to their own delivery timelines — not by us directly.
      </p>

      <h2>7. Global Students</h2>
      <p>
        We serve students across India, USA, Canada, Australia, Singapore, UAE, and
        other regions through online live classes. Time zones and class timings are
        coordinated during enrollment. No international shipping is involved for our
        standard services.
      </p>

      <h2>8. Delivery Issues</h2>
      <p>
        If you do not receive class links, schedules, or materials within the expected
        timeframe after payment, contact us immediately via{" "}
        <a href={businessInfo.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        or{" "}
        <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>. We will
        resolve the issue promptly.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about service delivery, visit our{" "}
        <Link href="/contact">Contact Us</Link> page or call{" "}
        <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}>{businessInfo.phone}</a>.
      </p>
    </PolicyPageLayout>
  );
}
