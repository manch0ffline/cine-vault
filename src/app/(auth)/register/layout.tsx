import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your CineVault account.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
