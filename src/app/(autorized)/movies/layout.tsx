import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Movies",
    template: "%s | CineVault",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
