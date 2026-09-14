"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Edit3, UserCheck, Shield } from "lucide-react";
import { AvatarCard } from "@/src/components/profile/AvatarCard";
import { LicenseCard } from "@/src/components/profile/LicenseCard";
import { StatsGrid } from "@/src/components/profile/StatsGrid";
import { SecurityCard } from "@/src/components/profile/SecurityCard";
import { QuickActions } from "@/src/components/profile/QuickActions";
import { GhostMascot } from "@/src/features/activation/components/ghost-mascot";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getWalletsByUser } from "@/src/lib/supabase/wallets";
import { getUserChains } from "@/src/lib/supabase/userChains";

function StatsGridWrapper({ userId }: { userId: string }) {
  const [walletCount, setWalletCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [networkCount, setNetworkCount] = useState(0);
  
  useEffect(() => {
    if (!userId) return;
    async function fetchStats() {
      try {
        const wallets = await getWalletsByUser(userId);
        setWalletCount(wallets.length);
        const total = wallets.reduce((acc: number, w: any) => acc + (w.balance_usd || 0), 0);
        setTotalValue(total);
        
        const chains = await getUserChains(userId);
        setNetworkCount(chains.length);
      } catch (e) {
        console.error(e);
      }
    }
    fetchStats();
  }, [userId]);
  
  return <StatsGrid walletCount={walletCount} totalValue={totalValue} networkCount={networkCount} />;
}

export default function AccountPage() {
  const { profile, isLoading } = useSupabaseUser();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-[#2563eb] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!profile || !profile.name || !profile.activation_key) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 flex flex-col items-center text-center space-y-5">
        <GhostMascot state="idle" />
        <div>
          <h2 className="text-[22px] font-bold text-[#f8fafc] tracking-tight mb-1">
            Operator Profile Unconfigured
          </h2>
          <p className="text-[13px] text-[#94a3b8] leading-relaxed max-w-[300px]">
            Complete your initial cryptographic onboarding setup to access full account telemetry.
          </p>
        </div>
        <Link
          href="/activation"
          className="h-11 px-6 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all"
        >
          Initialize Onboarding
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#1e2e4a]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-[#60a5fa] font-semibold uppercase tracking-wider bg-[#2563eb]/10 border border-[#2563eb]/30 px-2 py-0.5 rounded">
              Operator Settings
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-[#f8fafc] tracking-tight leading-tight">
            Security & Profile Architecture
          </h1>
          <p className="text-[13px] text-[#94a3b8] mt-1">
            Manage your cryptographic license, local node identity, and session parameters.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/activation"
            className="h-10 px-4 rounded-lg bg-[#172440] border border-[#1e2e4a] hover:bg-[#1e3054] hover:border-[#2d446e] text-[13px] text-[#f8fafc] font-medium flex items-center gap-2 transition-all"
          >
            <Edit3 className="w-4 h-4 text-[#3b82f6]" />
            Modify Profile
          </Link>
        </div>
      </div>

      {/* Account Statistics Grid */}
      <div className="space-y-3">
        <h3 className="text-[14px] font-bold text-[#f8fafc] tracking-tight">
          Cryptographic Node Metrics
        </h3>
        <StatsGridWrapper userId={profile.user_id || ""} />
      </div>

      {/* Bottom Identity & Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Avatar Card & Security Indicators) */}
        <div className="lg:col-span-1 space-y-6">
          <AvatarCard name={profile.name || ""} email={profile.email || ""} />
          <SecurityCard />
        </div>

        {/* Right Column (License Info & Quick Options) */}
        <div className="lg:col-span-2 space-y-6">
          <LicenseCard
            activationKey={profile.activation_key}
            activationDateStr={profile.created_at || ""}
          />
          <QuickActions activationKey={profile.activation_key} />
        </div>
      </div>
    </div>
  );
}
