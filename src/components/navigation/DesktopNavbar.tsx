"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Wallet, Send, User, HelpCircle, Shield, Cpu, ExternalLink } from "lucide-react";
import { useActiveRoute } from "@/src/hooks/useActiveRoute";
import { useAvatar } from "@/src/hooks/useAvatar";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "assets", label: "Assets", href: "/balance", icon: Wallet },
  { id: "withdraw", label: "Withdraw", href: "/withdraw", icon: Send },
  { id: "profile", label: "Profile", href: "/account", icon: User },
  { id: "support", label: "Support", href: "/support", icon: HelpCircle },
];

export function DesktopNavbar() {
  const { activeTab } = useActiveRoute();
  const { profile } = useSupabaseUser();
  const { avatarUrl } = useAvatar();
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem("activation-key");
    if (key && key.trim().length > 0) {
      setIsActivated(true);
    }
  }, []);

  if (!isActivated && !profile?.activation_key) return null;

  return (
    <header className="hidden md:block sticky top-0 z-40 w-full border-b border-[#1e2e4a] bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.35)] transition-transform group-hover:scale-105">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-extrabold tracking-wider text-[#f8fafc] uppercase flex items-center gap-1.5">
                Lost<span className="text-[#3b82f6]">Crypto</span>
              </span>
              <span className="text-[10px] font-mono text-[#64748b] tracking-tight uppercase">
                Recovery Engine
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1" aria-label="Desktop primary navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#172440] text-[#60a5fa] border border-[#2563eb]/40 font-semibold"
                      : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111a2e]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#3b82f6]" : "text-[#64748b]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Status & Profile Meta */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0d1424] border border-[#1e2e4a] text-[12px] font-mono text-[#94a3b8]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>NODE ACTIVE</span>
          </div>

          <Link
            href="/account"
            className="flex items-center gap-2.5 pl-3 border-l border-[#1e2e4a] hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full border border-[#2563eb]/40 bg-[#111a2e] overflow-hidden flex items-center justify-center shrink-0">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-[#94a3b8]" />
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-[#f8fafc] leading-tight">
                {profile?.name || "Member"}
              </span>
              <span className="text-[10px] text-[#3b82f6] font-mono">
                Verified
              </span>
            </div>
          </Link>
        </div>

      </div>
    </header>
  );
}
