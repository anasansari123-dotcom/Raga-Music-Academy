import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/data";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${businessInfo.legalName} — phone, WhatsApp, email, and demo booking.`,
};

export default function ContactPage() {
  return (
    <PolicyPageLayout
      title="Contact Us"
      description="Reach out for course enquiries, demo bookings, fee payments, or general support."
    >
      <p>
        We welcome students of all ages and skill levels. For the fastest response,
        message us on WhatsApp or fill out the demo booking form on our homepage.
      </p>

      <h2>Business Details</h2>
      <ul>
        <li>
          <strong>Business name:</strong> {businessInfo.legalName}
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`}>
            {businessInfo.phone}
          </a>
        </li>
        <li>
          <strong>WhatsApp:</strong>{" "}
          <a href={businessInfo.whatsapp} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
        </li>
        <li>
          <strong>Address:</strong> {businessInfo.address}
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href={businessInfo.website}>{businessInfo.website.replace(/^https:\/\//, "")}</a>
        </li>
      </ul>

      <h2>Book a Free Demo</h2>
      <p>
        Visit our{" "}
        <Link href="/#demo-booking">demo booking section</Link> to share your name,
        email, course interest, and message. We will respond via WhatsApp or phone.
      </p>

      <h2>Fee Payment</h2>
      <p>
        To pay course fees online, use our{" "}
        <Link href={siteConfig.payment.pagePath}>payment page</Link>. After payment,
        share the transaction screenshot on WhatsApp for confirmation.
      </p>

      <h2>Social Media</h2>
      <p>Follow us for updates, performances, and daily practice content.</p>
      <SocialLinks variant="light" className="mt-2" />
    </PolicyPageLayout>
  );
}
