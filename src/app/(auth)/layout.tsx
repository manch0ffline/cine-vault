import React from "react";
import Logo from "@/src/components/Logo/logo";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Authentication | CineVault",
    template: "%s | CineVault",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-layout">
      <ToastContainer />
      <div className="container h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="auth-layout__content">
          <div className="auth-layout__bg d-md-flex flex-column justify-content-between">
            <Logo light />
            <div className="auth-layout__bg__content d-flex flex-column gap-3">
              <h2>Curating the art of cinema.</h2>
              <p>
                Experience a hand-picked selection of the world&apos;s most
                influential films, framed in a minimalist gallery for the true
                cinephile.
              </p>
            </div>
          </div>

          <div className="auth-layout__children">
            <div className="auth-layout__mobile-logo">
              <Logo />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
