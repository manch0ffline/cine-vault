"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { supabase } from "../lib/supabase";
import {
  checkSessionThunk,
  clearAuth,
  setUser,
} from "../store/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import Loader from "./loader/Loader";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [checkedPathname, setCheckedPathname] = useState<string | null>(null);
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const loading = isAuthPage && checkedPathname !== pathname;

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const action = await dispatch(checkSessionThunk());

      if (!isMounted) {
        return;
      }

      if (checkSessionThunk.fulfilled.match(action) && action.payload) {
        if (isAuthPage) {
          router.replace("/movies");
          return;
        }
      }

      setCheckedPathname(pathname);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch(setUser({ id: session.user.id, email: session.user.email! }));
        if (isAuthPage) {
          router.replace("/movies");
        }
      } else {
        dispatch(clearAuth());
        if (isAuthPage) {
          setCheckedPathname(pathname);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [dispatch, isAuthPage, pathname, router]);

  if (loading) {
    return <Loader fullScreen />;
  }

  return <>{children}</>;
}

export default AuthProvider;
