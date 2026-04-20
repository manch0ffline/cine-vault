"use client";

import Input from "@/src/components/form/Input";
import Loader from "@/src/components/loader/Loader";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [hasRecoveryAccess, setHasRecoveryAccess] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY" || !!session) {
          setHasRecoveryAccess(true);
          setIsCheckingSession(false);
        }
      },
    );

    const checkRecoverySession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!error && data.session) {
        setHasRecoveryAccess(true);
        setIsCheckingSession(false);
        return;
      }

      const hasRecoveryHash = window.location.hash.includes("type=recovery");

      if (!hasRecoveryHash) {
        toast.error("Reset link is invalid or expired. Request a new one.");
        router.replace("/forgot-password");
        setIsCheckingSession(false);
        return;
      }

      timeoutId = setTimeout(() => {
        setIsCheckingSession(false);

        if (!hasRecoveryAccess) {
          toast.error("Reset link is invalid or expired. Request a new one.");
          router.replace("/forgot-password");
        }
      }, 3500);
    };

    void checkRecoverySession();

    return () => {
      authListener.subscription.unsubscribe();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [hasRecoveryAccess, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasRecoveryAccess) {
      toast.error("Reset link is invalid or expired. Request a new one.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated. Please sign in with your new password.");
    router.replace("/login");
  };

  return (
    <div className="login d-flex flex-column h-100 gap-5 justify-content-center">
      {(isLoading || isCheckingSession) && <Loader fullScreen />}

      <div className="login__top d-flex flex-column gap-2">
        <h1 className="m-0">Reset Password</h1>
        <p className="m-0">Enter your new password below.</p>
      </div>

      <div className="login__form d-flex flex-column justify-content-center">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your new password"
            name="password"
            title="New Password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your new password"
            name="confirmPassword"
            title="Confirm Password"
          />
          <button
            className="btn primary"
            type="submit"
            disabled={
              isLoading ||
              isCheckingSession ||
              !hasRecoveryAccess ||
              !password.trim() ||
              !confirmPassword.trim()
            }
          >
            Reset
          </button>
        </form>

        <div className="login__form__actions mt-4 d-flex justify-content-between align-items-center">
          <Link href="/login" className="text-decoration-none btn p-0">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
