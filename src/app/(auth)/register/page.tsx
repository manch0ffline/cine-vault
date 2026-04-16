"use client";

import Input from "@/src/components/form/Input";
import Loader from "@/src/components/loader/Loader";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { signUpThunk } from "@/src/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields.");
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

    dispatch(signUpThunk({ email, password, fullName }))
      .unwrap()
      .then((result) => {
        if (result.hasSession) {
          router.replace("/movies");
          return;
        }

        toast.success(
          "Account created. Please confirm your email, then sign in.",
        );
        router.replace("/login");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="login d-flex flex-column h-100 gap-5 justify-content-center">
      <div className="login__top d-flex flex-column gap-2">
        <h1 className="m-0">Create Account</h1>
        <p className="m-0">Enter your details to create your account.</p>
      </div>
      <div className="login__form d-flex flex-column justify-content-center">
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            title="Full Name"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="name@example.com"
            name="email"
            title="Email Address"
          />
          <div className="passwords-row">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              name="password"
              title="Password"
            />
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              title="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="btn primary"
            disabled={
              !email.trim() ||
              !password.trim() ||
              !confirmPassword.trim() ||
              !fullName.trim()
            }
          >
            {isLoading ? <Loader variant="spinner" size="small" /> : "Sign Up"}
          </button>
        </form>
        <div className="login__form__actions mt-4 d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-1">
            Already have an account?{" "}
            <Link href="/login" className="text-decoration-none btn p-0">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
