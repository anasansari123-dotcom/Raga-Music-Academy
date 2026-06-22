"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    const session = await getSession();
    const destination =
      session?.user?.role === "admin"
        ? "/admin"
        : callbackUrl || "/dashboard";

    router.push(destination);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-deep via-purple to-magenta px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-ivory/95 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <Image
              src="/logo1.jpeg"
              alt={siteConfig.name}
              width={72}
              height={72}
              className="h-16 w-auto rounded-sm object-contain"
            />
            <div>
              <h1 className="heading-display text-2xl font-semibold text-purple-deep">
                {siteConfig.name}
              </h1>
              <p className="text-sm text-dark-soft/70">Student & Admin Portal</p>
            </div>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none transition focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-dark">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 text-dark outline-none transition focus:border-gold/50 focus:ring-2 focus:ring-gold/20"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-dark-soft/70">
          <Link href="/" className="text-purple hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
