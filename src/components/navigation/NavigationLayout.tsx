"use client";

import React from "react";
import { BottomNavigation } from "@/src/components/navigation/BottomNavigation";

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-28">
      {children}
      <BottomNavigation />
    </div>
  );
}
