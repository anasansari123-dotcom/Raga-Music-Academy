import { NextResponse } from "next/server";
import { sendContactInquiry, type ContactInquiry } from "@/lib/contact-email";

const MAX = {
  name: 120,
  email: 254,
  message: 4000,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseBody(body: unknown): ContactInquiry | null {
  if (!body || typeof body !== "object") return null;

  const { name, email, course, message, website } = body as Record<string, unknown>;

  if (typeof website === "string" && website.trim()) return null;

  if (typeof name !== "string" || typeof email !== "string" || typeof course !== "string") {
    return null;
  }

  const msg = typeof message === "string" ? message : "";

  const trimmed = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    course: course.trim(),
    message: msg.trim(),
  };

  if (
    !trimmed.name ||
    trimmed.name.length > MAX.name ||
    !trimmed.email ||
    trimmed.email.length > MAX.email ||
    !isValidEmail(trimmed.email) ||
    !trimmed.course ||
    trimmed.message.length > MAX.message
  ) {
    return null;
  }

  return trimmed;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = parseBody(body);

    if (!data) {
      return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
    }

    await sendContactInquiry(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    const message =
      error instanceof Error ? error.message : "Unable to send your message. Please try again.";

    const status = message.includes("not configured") ? 503 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
