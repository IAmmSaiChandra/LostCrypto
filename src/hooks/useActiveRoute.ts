"use client";

import { usePathname } from "next/navigation";

export function useActiveRoute() {
  const pathname = usePathname();
  
  // Maps route path prefixes to Navigation tab identifiers
  const getActiveTab = (): string => {
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/balance")) return "assets";
    if (pathname.startsWith("/withdraw")) return "withdraw";
    if (pathname.startsWith("/account")) return "profile";
    if (pathname.startsWith("/support")) return "support";
    return "";
  };

  return {
    pathname,
    activeTab: getActiveTab(),
  };
}
