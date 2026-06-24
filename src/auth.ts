import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email =
            typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
          const password =
            typeof credentials?.password === "string" ? credentials.password : "";

          if (!email || !password) {
            return null;
          }

          // Dynamic import keeps MongoDB out of Edge bundles (middleware).
          const { verifyCredentials } = await import("@/lib/verify-credentials");
          const user = await verifyCredentials(email, password);

          if (!user) {
            if (process.env.NODE_ENV === "development") {
              console.error("[auth] login failed for:", email);
            }
            return null;
          }

          return user;
        } catch (error) {
          console.error("[auth] authorize failed:", error);
          return null;
        }
      },
    }),
  ],
});
