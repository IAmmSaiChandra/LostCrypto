"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
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
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
      className="bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex flex-col justify-between h-32 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-[#6B7280] font-semibold">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-black shrink-0">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-[26px] font-extrabold text-black tracking-tight leading-none">
          {prefix}{val.toLocaleString("en-IN")}{suffix}
        </h4>
      </div>
    </motion.div>
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <StatCard
        label="Assets Connected"
        value={walletCount}
        icon={<Database className="w-4 h-4" />}
        delay={0.1}
      />
      <StatCard
        label="Portfolio Value"
        value={totalValue}
        prefix="$"
        icon={<Landmark className="w-4 h-4" />}
        delay={0.2}
      />
      <StatCard
        label="Networks Enabled"
        value={networkCount}
        icon={<ShieldCheck className="w-4 h-4" />}
        delay={0.3}
      />
      <StatCard
        label="Profile Completion"
        value={100}
        suffix="%"
        icon={<CheckCircle className="w-4 h-4" />}
        delay={0.4}
      />
    </div>
  );
}
