"use client";

import React from "react";
import { DesktopNavbar } from "@/src/components/navigation/DesktopNavbar";
import { BottomNavigation } from "@/src/components/navigation/BottomNavigation";

export function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex flex-col">
      <DesktopNavbar />
      <main className="flex-1 pb-20 md:pb-12">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
