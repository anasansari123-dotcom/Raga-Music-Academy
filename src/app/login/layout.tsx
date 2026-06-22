import { AuthProvider } from "@/components/portal/AuthProvider";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
