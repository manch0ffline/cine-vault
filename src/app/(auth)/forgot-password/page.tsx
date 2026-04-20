"use client";

import Input from "@/src/components/form/Input";
import Loader from "@/src/components/loader/Loader";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const BackToLoginLink = () => (
  <Link href="/login" className="text-decoration-none btn p-0">
    Back to Login
  </Link>
);

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
      : `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(
      normalizedEmail,
      {
        redirectTo,
      },
    );

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="login d-flex flex-column h-100 gap-5 justify-content-center">
      {isLoading && <Loader fullScreen />}

      {success ? (
        <>
          <div className="login__top d-flex flex-column gap-2">
            <h1 className="m-0">Check Your Email</h1>
            <p className="m-0">
              We have sent a password reset link to your email.
            </p>
          </div>
          <div className="login__form__actions d-flex align-items-center">
            <BackToLoginLink />
          </div>
        </>
      ) : (
        <>
          <div className="login__top d-flex flex-column gap-2">
            <h1 className="m-0">Forgot Password</h1>
            <p className="m-0">Enter your email to reset your password.</p>
          </div>

          <div className="login__form d-flex flex-column justify-content-center">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                name="email"
                title="Email"
              />
              <button
                className="btn primary"
                type="submit"
                disabled={isLoading || !email.trim()}
              >
                Submit
              </button>
            </form>
            <div className="login__form__actions mt-4 d-flex justify-content-between align-items-center">
              <BackToLoginLink />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
