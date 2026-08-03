"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
import { Search, Gift, Landmark, ShieldCheck } from "lucide-react";

interface StatsGridProps {
  scannedToday: number;
  foundCount: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  desc: string;
}

function StatCard({ label, value, icon, desc }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
      className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex flex-col justify-between h-32 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#6B7280] font-semibold">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-[#F1F1F1] flex items-center justify-center text-black shrink-0">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-[26px] font-extrabold text-black tracking-tight leading-none">
          {value}
        </h4>
        <p className="text-[12px] text-[#9CA3AF] mt-1 font-semibold">{desc}</p>
      </div>
    </motion.div>
  );
}

export function StatsGrid({ scannedToday, foundCount }: StatsGridProps) {
  // Scanned in Millions formatting: e.g. 12.8M
  const formatScanned = (num: number) => {
    return `${(num / 1000000).toFixed(2)}M`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatCard
        label="Wallets Scanned"
        value={formatScanned(scannedToday)}
        icon={<Search className="w-4 h-4" />}
        desc="Total network addresses checked"
      />
      <StatCard
        label="Wallets Found"
        value={foundCount}
        icon={<Gift className="w-4 h-4" />}
        desc="Recoverable balances detected"
      />
      <StatCard
        label="Estimated Value"
        value="$24,483"
        icon={<Landmark className="w-4 h-4" />}
        desc="Aggregated portfolio worth"
      />
      <StatCard
        label="Networks Active"
        value="8"
        icon={<ShieldCheck className="w-4 h-4" />}
        desc="Active block-scanning channels"
      />
    </div>
  );
}
