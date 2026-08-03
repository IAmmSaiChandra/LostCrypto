"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { LayoutDashboard, Wallet, Send, User, HelpCircle } from "lucide-react";
import { useActiveRoute } from "@/src/hooks/useActiveRoute";

interface NavItemData {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
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
    // Check if activated — any valid key stored means user is activated
    const key = localStorage.getItem("activation-key");
    if (key && key.trim().length > 0) {
      setIsActivated(true);
    }
  }, []);

  if (!isActivated || !activeTab) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[420px] md:max-w-[460px] px-4 sm:px-0">
      <nav 
        className="h-[72px] rounded-full border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex items-center justify-around px-2 relative"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full relative z-10 py-1 transition-transform active:scale-95 duration-100"
              style={{ minWidth: "48px", minHeight: "48px" }}
            >
              {/* Selected Background Capsule */}
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute inset-x-1 inset-y-2.5 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-neutral-100/30 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Bounce effect wrapper */}
              <motion.div
                animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? "text-black" : "text-[#9CA3AF] hover:text-black/60"
                }`}
              >
                <Icon className="w-5 h-5 transition-transform" />
                <span className="text-[10px] font-bold tracking-tight select-none">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
