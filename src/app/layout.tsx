import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { BootstrapClient } from "./BootstrapClient";
import Providers from "../components/Providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cinevault.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CineVault — Your Personal Movie Space",
  description:
    "Discover new movies, manage your watchlist, and never lose what you wanted to watch.",
  keywords: ["movies", "cinema", "watchlist", "ratings"],
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "CineVault",
    description: "Your Personal Movie Space",
    url: siteUrl,
    siteName: "CineVault",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/Inception.png",
        width: 1200,
        height: 630,
        alt: "CineVault",
      },
    ],
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: "CineVault",
    description: "Your Personal Movie Space",
    images: ["/images/Inception.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <Providers>
          {children}
          <BootstrapClient />
        </Providers>
      </body>
    </html>
  );
}
