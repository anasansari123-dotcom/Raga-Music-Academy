"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import type { CheckResult, HealthReport } from "@/lib/health-check";

function StatusIcon({ status }: { status: CheckResult["status"] }) {
  if (status === "ok") return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
  if (status === "warn") return <AlertTriangle className="h-5 w-5 text-amber-600" />;
  return <XCircle className="h-5 w-5 text-red-600" />;
}

function statusStyles(status: CheckResult["status"]) {
  if (status === "ok") return "border-emerald-200 bg-emerald-50/60";
  if (status === "warn") return "border-amber-200 bg-amber-50/60";
  return "border-red-200 bg-red-50/60";
}

export default function CheckPage() {
  const [report, setReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runCheck = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("key");
      const url = key ? `/api/check?key=${encodeURIComponent(key)}` : "/api/check";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok && !data.checks) {
        throw new Error(data.error ?? "Health check failed.");
      }
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to run checks.");
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runCheck();
  }, [runCheck]);

  const allOk = report?.summary.fail === 0 && report?.summary.warn === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-cream to-gold-light/20">
      <header className="border-b border-gold/20 bg-purple-deep/95 text-ivory">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo1.jpeg"
              alt={siteConfig.name}
              width={44}
              height={44}
              className="h-10 w-auto rounded-sm object-contain"
            />
            <div>
              <p className="heading-display text-base font-semibold">{siteConfig.name}</p>
              <p className="text-xs text-gold-light/80">System Health Check</p>
            </div>
          </Link>
          <Button
            variant="outline"
            onClick={runCheck}
            disabled={loading}
            className="border-white/20 text-ivory hover:bg-white/5"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Re-run
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="heading-display text-3xl font-semibold text-purple-deep">
            Environment & Connection Check
          </h1>
          <p className="mt-2 text-dark-soft/80">
            Verifies all <code className="text-sm">.env</code> variables and live connections
            (MongoDB, Razorpay, SMTP, Auth).
          </p>
        </div>

        {loading && !report ? (
          <div className="flex items-center justify-center gap-3 py-20 text-purple-deep">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Running checks…</span>
          </div>
        ) : null}

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : null}

        {report ? (
          <>
            <div
              className={`mb-8 rounded-2xl border p-6 ${
                allOk
                  ? "border-emerald-200 bg-emerald-50/70"
                  : report.summary.fail > 0
                    ? "border-red-200 bg-red-50/70"
                    : "border-amber-200 bg-amber-50/70"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-dark">
                    {allOk
                      ? "All systems operational"
                      : report.summary.fail > 0
                        ? `${report.summary.fail} check(s) failed`
                        : `${report.summary.warn} warning(s)`}
                  </p>
                  <p className="mt-1 text-sm text-dark-soft/70">
                    {report.summary.ok} passed · {report.summary.warn} warnings ·{" "}
                    {report.summary.fail} failed · env: {report.environment}
                  </p>
                  <p className="mt-1 text-xs text-dark-soft/60">
                    Last checked: {new Date(report.checkedAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-4 text-center text-sm">
                  <div>
                    <p className="text-2xl font-bold text-emerald-700">{report.summary.ok}</p>
                    <p className="text-dark-soft/70">OK</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-700">{report.summary.warn}</p>
                    <p className="text-dark-soft/70">Warn</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-700">{report.summary.fail}</p>
                    <p className="text-dark-soft/70">Fail</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {report.checks.map((check) => (
                <article
                  key={check.id}
                  className={`rounded-xl border p-4 ${statusStyles(check.status)}`}
                >
                  <div className="flex items-start gap-3">
                    <StatusIcon status={check.status} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="font-semibold text-dark">{check.label}</h2>
                        {check.latencyMs != null ? (
                          <span className="text-xs text-dark-soft/60">{check.latencyMs}ms</span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-dark-soft/80">{check.message}</p>
                      {check.hint ? (
                        <p className="mt-2 text-xs text-dark-soft/70">💡 {check.hint}</p>
                      ) : null}
                      <p className="mt-1 font-mono text-xs text-dark-soft/50">{check.id}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-gold/20 bg-white/60 p-5 text-sm text-dark-soft/80">
              <p className="font-medium text-purple-deep">Quick links</p>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/login" className="text-purple hover:underline">
                    /login
                  </Link>{" "}
                  — Student & admin portal
                </li>
                <li>
                  <Link href="/dashboard" className="text-purple hover:underline">
                    /dashboard
                  </Link>{" "}
                  — Student payments
                </li>
                <li>
                  <Link href="/admin/payment-requests" className="text-purple hover:underline">
                    /admin/payment-requests
                  </Link>{" "}
                  — Admin panel
                </li>
                <li>
                  <a href="/api/check" className="text-purple hover:underline">
                    /api/check
                  </a>{" "}
                  — JSON health report
                </li>
              </ul>
              <p className="mt-4 text-xs text-dark-soft/60">
                In production, set <code>CHECK_SECRET</code> in env and visit{" "}
                <code>/check?key=your-secret</code> to protect this page.
              </p>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
