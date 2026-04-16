"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import { clearAuth } from "@/src/store/slices/authSlice";
import { useAppDispatch } from "@/src/store/hooks";
import Loader from "@/src/components/loader/Loader";

const navItems = [{ href: "/movies", label: "Movies" }];

function AutorizedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [logOuting, setLogOuting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        dispatch(clearAuth());
        router.replace("/login");
      }
    };

    checkAuth().finally(() => setLoading(false));
  }, [dispatch, router]);

  const onLogout = async () => {
    setLogOuting(true);
    await supabase.auth.signOut().finally(() => setLogOuting(false));
    dispatch(clearAuth());
    router.replace("/login");
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="authorized-layout">
      {logOuting && <Loader fullScreen />}
      <header className="authorized-layout__header">
        <div className="authorized-layout__brand">
          <p className="authorized-layout__eyebrow">Cine Vault</p>
          <h1>Your Movie Space</h1>
        </div>

        <nav
          aria-label="Authorized navigation"
          className="authorized-layout__nav"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                href={item.href}
                key={item.href}
                className={`authorized-layout__nav-item ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            className="authorized-layout__logout"
            onClick={onLogout}
          >
            Log out
          </button>
        </nav>
      </header>

      <main className="authorized-layout__content">{children}</main>
    </div>
  );
}

export default AutorizedLayout;
