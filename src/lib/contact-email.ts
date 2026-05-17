import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/data";

export type ContactInquiry = {
  name: string;
  email: string;
  course: string;
  message: string;
};

const courseLabels: Record<string, string> = {
  carnatic: "Carnatic Classical",
  hindustani: "Hindustani Classical",
  bollywood: "Bollywood / Filmy",
  bhajans: "Bhajans & Shlokas",
};

export function formatContactEmailBody(data: ContactInquiry) {
  const courseLabel = courseLabels[data.course] ?? data.course;

  return `
New inquiry from ${siteConfig.name} website

Name: ${data.name}
Email: ${data.email}
Course interest: ${courseLabel}

Message:
${data.message || "(No message provided)"}
  `.trim();
}

export async function sendContactInquiry(data: ContactInquiry) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? siteConfig.email;

  if (!smtpUser || !smtpPass) {
    throw new Error(
      "Email is not configured. Set SMTP_USER and SMTP_PASS in your environment."
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const courseLabel = courseLabels[data.course] ?? data.course;

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${smtpUser}>`,
    to,
    replyTo: data.email,
    subject: `[${siteConfig.name}] New inquiry — ${courseLabel} — ${data.name}`,
    text: formatContactEmailBody(data),
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1520;">
        <h2 style="color: #6b2d5b; margin-bottom: 8px;">New website inquiry</h2>
        <p style="color: #666; font-size: 14px;">${siteConfig.name} contact form</p>
        <hr style="border: none; border-top: 1px solid #e8d5a3; margin: 20px 0;" />
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p><strong>Course:</strong> ${escapeHtml(courseLabel)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message || "(No message)")}</p>
      </div>
    `,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
