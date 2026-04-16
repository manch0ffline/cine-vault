"use client";

import Input from "@/src/components/form/Input";
import Loader from "@/src/components/loader/Loader";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { signInThunk } from "@/src/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(signInThunk({ email, password }))
      .unwrap()
      .then(() => {
        router.replace("/movies");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="login d-flex flex-column h-100 gap-5 justify-content-center">
      <div className="login__top d-flex flex-column gap-2">
        <h1 className="m-0">Welcome Back</h1>
        <p className="m-0">Enter your details to access your vault.</p>
      </div>
      <div className="login__form d-flex flex-column justify-content-center">
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
            name="email"
            title="Email Address"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            name="password"
            title="Password"
          />
          <button
            type="submit"
            className="btn primary position-relative"
            disabled={isLoading || !email.trim() || !password.trim()}
          >
            {isLoading ? <Loader variant="spinner" size="small" /> : "Sign In"}
          </button>
        </form>
        <div className="login__form__actions mt-4 d-flex justify-content-between align-items-center">
          <Link href="#" className="text-decoration-none btn p-0">
            Forgot Password?
          </Link>
          <span className="d-flex align-items-center gap-1">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-decoration-none btn p-0">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
