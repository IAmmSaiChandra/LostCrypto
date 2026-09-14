"use client";

import React, { useEffect, useState } from "react";
import { animate } from "motion/react";
import { Database, Landmark, ShieldCheck, CheckCircle } from "lucide-react";

interface StatItemProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  delay: number;
}

function StatCard({ label, value, prefix = "", suffix = "", icon, delay }: StatItemProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(current) {
        setVal(Math.round(current));
      },
    });
    return () => controls.stop();
  }, [value, delay]);

  return (
    <div className="bg-[#111a2e] border border-[#1e2e4a] hover:border-[#2563eb]/40 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between h-28 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-mono text-[#94a3b8] uppercase tracking-wider">{label}</span>
        <div className="w-7 h-7 rounded-md bg-[#172440] border border-[#1e2e4a] flex items-center justify-center text-[#60a5fa] shrink-0">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-[22px] font-bold font-mono text-[#f8fafc] tracking-tight leading-none">
          {prefix}{val.toLocaleString("en-US")}{suffix}
        </h4>
      </div>
    </div>
  );
}

export function StatsGrid({
  walletCount = 0,
  totalValue = 0,
  networkCount = 0,
}: {
  walletCount?: number;
  totalValue?: number;
  networkCount?: number;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
      <StatCard
        label="Wallets Discovered"
        value={walletCount}
        icon={<Database className="w-3.5 h-3.5" />}
        delay={0.1}
      />
      <StatCard
        label="Recovered Valuation"
        value={totalValue}
        prefix="$"
        icon={<Landmark className="w-3.5 h-3.5" />}
        delay={0.2}
      />
      <StatCard
        label="Chains Active"
        value={networkCount}
        icon={<ShieldCheck className="w-3.5 h-3.5" />}
        delay={0.3}
      />
      <StatCard
        label="System Integrity"
        value={100}
        suffix="%"
        icon={<CheckCircle className="w-3.5 h-3.5" />}
        delay={0.4}
      />
    </div>
  );
}
