export type CheckStatus = "ok" | "warn" | "fail";

export type CheckResult = {
  id: string;
  label: string;
  status: CheckStatus;
  message: string;
  hint?: string;
  latencyMs?: number;
};

export type HealthReport = {
  checkedAt: string;
  environment: string;
  summary: {
    total: number;
    ok: number;
    warn: number;
    fail: number;
  };
  checks: CheckResult[];
};

const PLACEHOLDER_PATTERNS = [
  /^your[-_]/i,
  /change-me/i,
  /xxxxxxxx/i,
  /your@/i,
  /example\.com$/i,
  /secret-here/i,
  /app-password$/i,
];

function isPlaceholder(value: string | undefined) {
  if (!value?.trim()) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value.trim()));
}

function maskValue(value: string | undefined) {
  if (!value?.trim()) return "Not set";
  const trimmed = value.trim();
  if (trimmed.length <= 8) return "••••••••";
  return `${trimmed.slice(0, 4)}…${trimmed.slice(-4)}`;
}

function envCheck(
  id: string,
  label: string,
  value: string | undefined,
  options?: { required?: boolean; validate?: (v: string) => string | null }
): CheckResult {
  if (!value?.trim()) {
    return {
      id,
      label,
      status: options?.required === false ? "warn" : "fail",
      message: "Environment variable is not set.",
      hint: `Add ${id} to .env.local`,
    };
  }

  if (isPlaceholder(value)) {
    return {
      id,
      label,
      status: "warn",
      message: "Set but still looks like a placeholder value.",
      hint: `Update ${id} with your real credentials.`,
    };
  }

  if (options?.validate) {
    const error = options.validate(value.trim());
    if (error) {
      return { id, label, status: "fail", message: error };
    }
  }

  return {
    id,
    label,
    status: "ok",
    message: `Configured (${maskValue(value)})`,
  };
}

async function timed<T>(fn: () => Promise<T>) {
  const start = Date.now();
  const result = await fn();
  return { result, latencyMs: Date.now() - start };
}

export async function runHealthChecks(): Promise<HealthReport> {
  const checks: CheckResult[] = [];

  checks.push(
    envCheck("NEXT_PUBLIC_SITE_URL", "Site URL", process.env.NEXT_PUBLIC_SITE_URL, {
      validate: (v) => {
        try {
          new URL(v);
          return null;
        } catch {
          return "Invalid URL format.";
        }
      },
    })
  );

  checks.push(
    envCheck("AUTH_SECRET", "Auth Secret", process.env.AUTH_SECRET, {
      validate: (v) => (v.length < 16 ? "AUTH_SECRET should be at least 16 characters." : null),
    })
  );

  checks.push(
    envCheck(
      "AUTH_URL",
      "Auth URL",
      process.env.AUTH_URL ?? process.env.NEXTAUTH_URL,
      {
        required: false,
        validate: (v) => {
          try {
            new URL(v);
            return null;
          } catch {
            return "Invalid URL format.";
          }
        },
      }
    )
  );

  checks.push(envCheck("MONGODB_URI", "MongoDB URI", process.env.MONGODB_URI));

  if (process.env.MONGODB_URI && !isPlaceholder(process.env.MONGODB_URI)) {
    try {
      const { latencyMs } = await timed(async () => {
        const { connectDB } = await import("@/lib/db");
        const mongoose = await connectDB();
        await mongoose.connection.db?.admin().ping();
      });
      checks.push({
        id: "mongodb_connection",
        label: "MongoDB Connection",
        status: "ok",
        message: "Connected and ping successful.",
        latencyMs,
      });

      try {
        const { User } = await import("@/models/User");
        const adminCount = await User.countDocuments({ role: "admin" });
        checks.push({
          id: "admin_account",
          label: "Admin Account",
          status: adminCount > 0 ? "ok" : "warn",
          message:
            adminCount > 0
              ? `${adminCount} admin account(s) found.`
              : "No admin account found yet.",
          hint: adminCount === 0 ? "Run: npm run seed:admin" : undefined,
        });
      } catch {
        checks.push({
          id: "admin_account",
          label: "Admin Account",
          status: "warn",
          message: "Could not query users collection.",
        });
      }
    } catch (error) {
      checks.push({
        id: "mongodb_connection",
        label: "MongoDB Connection",
        status: "fail",
        message: error instanceof Error ? error.message : "Connection failed.",
        hint: "Ensure MongoDB is running and MONGODB_URI is correct.",
      });
    }
  } else {
    checks.push({
      id: "mongodb_connection",
      label: "MongoDB Connection",
      status: "fail",
      message: "Skipped — MONGODB_URI not configured.",
    });
  }

  checks.push(envCheck("RAZORPAY_KEY_ID", "Razorpay Key ID", process.env.RAZORPAY_KEY_ID));
  checks.push(
    envCheck("RAZORPAY_KEY_SECRET", "Razorpay Key Secret", process.env.RAZORPAY_KEY_SECRET)
  );

  if (
    process.env.RAZORPAY_KEY_ID &&
    process.env.RAZORPAY_KEY_SECRET &&
    !isPlaceholder(process.env.RAZORPAY_KEY_ID) &&
    !isPlaceholder(process.env.RAZORPAY_KEY_SECRET)
  ) {
    try {
      const { latencyMs } = await timed(async () => {
        const { getRazorpayClient } = await import("@/lib/razorpay");
        const client = getRazorpayClient();
        await client.orders.all({ count: 1 });
      });
      checks.push({
        id: "razorpay_connection",
        label: "Razorpay API",
        status: "ok",
        message: "API credentials verified successfully.",
        latencyMs,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "API check failed.";
      checks.push({
        id: "razorpay_connection",
        label: "Razorpay API",
        status: "fail",
        message,
        hint: "Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Razorpay dashboard.",
      });
    }
  } else {
    checks.push({
      id: "razorpay_connection",
      label: "Razorpay API",
      status: "fail",
      message: "Skipped — Razorpay keys not configured.",
    });
  }

  checks.push(envCheck("SMTP_USER", "SMTP User (Gmail)", process.env.SMTP_USER));
  checks.push(envCheck("SMTP_PASS", "SMTP Password", process.env.SMTP_PASS));
  checks.push(
    envCheck("CONTACT_TO", "Contact Inbox", process.env.CONTACT_TO, {
      required: false,
      validate: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email format."),
    })
  );

  if (
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    !isPlaceholder(process.env.SMTP_USER) &&
    !isPlaceholder(process.env.SMTP_PASS)
  ) {
    try {
      const nodemailer = await import("nodemailer");
      const { latencyMs } = await timed(async () => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASS!,
          },
        });
        await transporter.verify();
      });
      checks.push({
        id: "smtp_connection",
        label: "SMTP (Gmail)",
        status: "ok",
        message: "SMTP connection verified.",
        latencyMs,
      });
    } catch (error) {
      checks.push({
        id: "smtp_connection",
        label: "SMTP (Gmail)",
        status: "fail",
        message: error instanceof Error ? error.message : "SMTP verify failed.",
        hint: "Use a Gmail App Password, not your regular password.",
      });
    }
  } else {
    checks.push({
      id: "smtp_connection",
      label: "SMTP (Gmail)",
      status: "warn",
      message: "Skipped — SMTP credentials not configured.",
      hint: "Optional for contact form email. WhatsApp flow still works.",
    });
  }

  checks.push(
    envCheck("ADMIN_EMAIL", "Seed Admin Email", process.env.ADMIN_EMAIL, { required: false })
  );

  const summary = {
    total: checks.length,
    ok: checks.filter((c) => c.status === "ok").length,
    warn: checks.filter((c) => c.status === "warn").length,
    fail: checks.filter((c) => c.status === "fail").length,
  };

  return {
    checkedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "unknown",
    summary,
    checks,
  };
}

export function isCheckAccessAllowed(request: Request) {
  if (process.env.NODE_ENV !== "production") return true;

  const secret = process.env.CHECK_SECRET?.trim();
  if (!secret) return true;

  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? request.headers.get("x-check-key");
  return key === secret;
}
