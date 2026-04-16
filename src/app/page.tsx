import CuratedLists from "@/src/components/home-components/CuratedLists/CuratedLists";
import Features from "@/src/components/home-components/Features/Features";
import Footer from "@/src/components/home-components/Footer/Footer";
import ReadyToStart from "@/src/components/home-components/ReadyToStart/ReadyToStart";
import TopBar from "@/src/components/TopBar/TopBar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Discover your next favorite film with curated selections and clean search tools in CineVault.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="home-page d-flex flex-column">
      <header className="d-flex flex-column">
        <TopBar />
        <div
          className="
          home-page__hero d-flex flex-column gap-4 justify-content-center align-items-center 
          text-center p-5 flex-grow-1 w-100 container"
        >
          <h1 className="m-0">
            Discover Your Next <br /> Favorite Film.
          </h1>
          <p className="home-page__lead m-0">
            Search, filter, and track the world&apos;s most cinematic
            experiences with CineVault. Curated for the modern cinephile.
          </p>
          <div className="home-page_buttons d-flex gap-4">
            <Link href="/login" className="btn primary">
              Get Started
            </Link>
            <Link href="#ready-to-start" className="btn secondary">
              Explore Catalog
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Features />
        <CuratedLists />
        <ReadyToStart />
        <Footer />
      </main>
    </div>
  );
}
