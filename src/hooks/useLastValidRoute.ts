"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const INVALID_ROUTES = ["/not-found", "/404", "/_not-found"];

/**
 * Hook to be used ONLY in valid page/layout scopes to track navigation.
 */
export function useRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && !INVALID_ROUTES.includes(pathname)) {
      sessionStorage.setItem("last-valid-route", pathname);
    }
  }, [pathname]);
}

/**
 * Hook to be used in error/404 scopes to retrieve recovery path.
 * Does NOT write to sessionStorage.
 */
export function useLastValidRoute() {
  const getLastValidRoute = (): string => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("last-valid-route") || "/activation";
    }
    return "/activation";
  };

  return {
    getLastValidRoute,
  };
}
