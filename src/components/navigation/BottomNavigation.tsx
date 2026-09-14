"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Wallet, Send, User, HelpCircle } from "lucide-react";
import { useActiveRoute } from "@/src/hooks/useActiveRoute";

interface NavItemData {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItemData[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "assets", label: "Assets", href: "/balance", icon: Wallet },
  { id: "withdraw", label: "Withdraw", href: "/withdraw", icon: Send },
  { id: "profile", label: "Profile", href: "/account", icon: User },
  { id: "support", label: "Support", href: "/support", icon: HelpCircle },
];

export function BottomNavigation() {
  const { activeTab } = useActiveRoute();
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("activation-key");
    if (key && key.trim().length > 0) {
      setIsActivated(true);
    }
  }, []);

  if (!isActivated || !activeTab) return null;

  return (
    <nav 
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0d1424] border-t border-[#1e2e4a] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile bottom navigation"
    >
      <div className="h-16 flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative py-1 transition-colors ${
                isActive ? "text-[#3b82f6]" : "text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 inset-x-3 h-[2px] bg-[#2563eb] rounded-b" />
              )}
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[11px] font-medium tracking-tight select-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
