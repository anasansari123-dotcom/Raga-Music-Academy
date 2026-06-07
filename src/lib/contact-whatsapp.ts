import { siteConfig } from "@/lib/data";

export const courseInterestLabels: Record<string, string> = {
  carnatic: "Carnatic Classical",
  hindustani: "Hindustani Classical",
  bollywood: "Bollywood / Filmy",
  bhajans: "Bhajans & Shlokas",
  western: "Western Music Vocal",
};

export type ContactFormData = {
  name: string;
  email: string;
  course: string;
  message: string;
};

export function getContactWhatsAppUrl({ name, email, course, message }: ContactFormData) {
  const courseLabel = courseInterestLabels[course] ?? course;
  const lines = [
    `*Free Demo Booking — ${siteConfig.name}*`,
    "",
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Course Interest:* ${courseLabel}`,
  ];

  if (message.trim()) {
    lines.push(`*Message:* ${message.trim()}`);
  }

  const phone = siteConfig.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
}
