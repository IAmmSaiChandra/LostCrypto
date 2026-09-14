"use client";

import React, { useEffect, useState } from "react";
import { animate } from "motion/react";
import { TrendingUp, Layers, Shield } from "lucide-react";

interface PortfolioOverviewProps {
  totalValue: number;
  changePercent: number;
}

export function PortfolioOverview({ totalValue, changePercent }: PortfolioOverviewProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, totalValue, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setVal(value);
      },
    });
    return () => controls.stop();
  }, [totalValue]);

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="space-y-2">
        <span className="text-[12px] font-mono text-[#94a3b8] uppercase tracking-wider block">
          Total Recovered Asset Valuation
        </span>
        <div className="flex items-baseline gap-3">
          <h2 className="text-[32px] md:text-[38px] font-bold font-mono text-[#f8fafc] tracking-tight leading-none">
            ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className="h-6 px-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[12px] font-mono font-bold flex items-center gap-1 shrink-0">
            <TrendingUp className="w-3 h-3" />
            +{changePercent.toFixed(1)}% (24h)
          </span>
        </div>
        <p className="text-[13px] text-[#64748b] flex items-center gap-1.5 pt-1">
          <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
          <span>7 Active Ledger Networks Monitored</span>
        </p>
      </div>

      <div className="hidden md:flex items-center gap-3 border-l border-[#1e2e4a] pl-8 py-2">
        <div className="text-right">
          <p className="text-[12px] font-mono text-[#94a3b8]">24h Valuation Shift</p>
          <p className="text-[18px] font-bold font-mono text-emerald-400">+$1,902.15</p>
        </div>
      </div>
    </div>
  );
}
