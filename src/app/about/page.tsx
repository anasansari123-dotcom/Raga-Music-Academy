import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageLayout } from "@/components/layout/PolicyPageLayout";
import { aboutContent } from "@/lib/data";
import { businessInfo } from "@/lib/legal";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${businessInfo.legalName} — our mission, founder, teaching approach, and certifications.`,
};

export default function AboutPage() {
  return (
    <PolicyPageLayout
      title="About Us"
      description={`${businessInfo.legalName} nurtures students in Indian classical and contemporary vocal music through structured online and offline training.`}
    >
      <p>{aboutContent.intro[0]}</p>

      <h2>Our Founder</h2>
      <p>
        <strong>{aboutContent.founder.name}</strong> — {aboutContent.founder.role}.
        {aboutContent.founder.bio}
      </p>

      <h2>Teaching Approach</h2>
      <p>{aboutContent.teachingApproach}</p>

      <h2>Programs Offered</h2>
      <ul>
        {aboutContent.trainingOffered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>What Students Receive</h2>
      <ul>
        {aboutContent.studentBenefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Certifications & Affiliations</h2>
      <p>{aboutContent.certifications.intro}</p>
      <ul>
        {aboutContent.certifications.partners.map((partner) => (
          <li key={partner.name}>
            <strong>{partner.name}</strong> — {partner.description}
          </li>
        ))}
      </ul>

      <p>{aboutContent.closing}</p>

      <p>
        <Link href="/contact">Contact us</Link> to book a free demo or{" "}
        <Link href="/#courses">explore our courses</Link>.
      </p>
    </PolicyPageLayout>
  );
}
