import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "admin" | "user";
      phone: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "admin" | "user";
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "admin" | "user";
    phone?: string;
  }
}

export {};
