import type { Metadata } from "next";
import { AuthView } from "@/components/auth-view";

export const metadata: Metadata = {
  title: "Entrar · Blklight",
};

export default function AuthPage() {
  return <AuthView />;
}
