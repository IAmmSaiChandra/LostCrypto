"use client";

import React from "react";
import { AvatarCard } from "@/src/components/profile/AvatarCard";
import { LicenseCard } from "@/src/components/profile/LicenseCard";
import { StatsGrid } from "@/src/components/profile/StatsGrid";
import { SecurityCard } from "@/src/components/profile/SecurityCard";
import { QuickActions } from "@/src/components/profile/QuickActions";
import { GhostMascot } from "@/src/features/activation/components/ghost-mascot";
import Link from "next/link";
import { Edit3 } from "lucide-react";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";

export default function AccountPage() {
  const { profile, isLoading } = useSupabaseUser();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
      </div>
    );
  }

  // Fallback Empty State: If no profile name exists, direct them to complete activation/profile setup
  if (!profile || !profile.name || !profile.activation_key) {
    return (
      <div className="max-w-[480px] mx-auto px-6 py-20 flex flex-col items-center text-center space-y-6">
        <GhostMascot state="idle" />
        <div>
          <h2 className="text-[24px] font-extrabold text-black tracking-tight leading-tight mb-2">
            Let&apos;s create your profile
          </h2>
          <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-[300px]">
            Complete your onboarding setup to personalize your workspace experience.
          </p>
        </div>
        <Link
          href="/activation"
          className="h-12 px-6 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-semibold flex items-center justify-center shadow-sm transition-all duration-200"
        >
          Complete Profile Setup
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 selection:bg-black selection:text-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-tight">
            Profile
          </h1>
          <p className="text-[15px] text-[#6B7280] leading-relaxed mt-1">
            Manage your account information and application license.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            href="/activation"
            className="h-10 px-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[13px] text-black font-semibold flex items-center gap-2 transition-all duration-200"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Account Statistics Grid */}
      <div className="space-y-4">
        <h3 className="text-[18px] font-bold text-black tracking-tight px-1">
          Account Statistics
        </h3>
        {/* Pass down required props, but we actually want to render StatsGrid wrapped with a data fetcher or just fetch data here?
        The prompt says: "Accept props: walletCount: number, totalValue: number, networkCount: number" for StatsGrid.
        So we need to fetch wallets and networks here, or inside StatsGrid.
        Wait, I'll fetch them here. */}
        <StatsGridWrapper userId={profile.user_id || ""} />
      </div>

      {/* Bottom Identity & Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (Avatar Card & Security Indicators) */}
        <div className="lg:col-span-1 space-y-8">
          <AvatarCard name={profile.name || ""} email={profile.email || ""} />
          <SecurityCard />
        </div>

        {/* Right Column (License Info & Quick Options) */}
        <div className="lg:col-span-2 space-y-8">
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

// Sub-component to fetch the stats required by StatsGrid
import { getWalletsByUser } from "@/src/lib/supabase/wallets";
import { getUserChains } from "@/src/lib/supabase/userChains";
import { useState, useEffect } from "react";

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
      } catch(e) {
        console.error(e);
      }
    }
    fetchStats();
  }, [userId]);
  
  return <StatsGrid walletCount={walletCount} totalValue={totalValue} networkCount={networkCount} />;
}
