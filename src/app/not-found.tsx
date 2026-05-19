import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-gold-dark">
        404
      </p>
      <h1 className="heading-display mt-3 text-3xl font-semibold text-dark">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-dark-soft/75">
        The page you are looking for does not exist. Return to Raga Veda to
        explore courses and book a demo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-gradient-to-r from-purple to-magenta px-8 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
