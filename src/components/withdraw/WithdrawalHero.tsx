"use client";

import React, { useEffect, useState } from "react";
import { animate } from "motion/react";
import { Wallet, Layers, ShieldCheck } from "lucide-react";

export function WithdrawalHero() {
  const [val, setVal] = useState(0);
  const [walletCount, setWalletCount] = useState(0);

  useEffect(() => {
    let total = 0;
    let count = 0;
    try {
      const stored = localStorage.getItem("found-wallets-list");
      if (stored) {
        const parsed = JSON.parse(stored);
        count = parsed.length;
        total = parsed.reduce((sum: number, w: any) => {
          const num = parseFloat(w.value.replace(/[^0-9.]/g, ""));
          return sum + (isNaN(num) ? 0 : num);
        }, 0);
      }
    } catch (e) {
      console.error(e);
    }
    setWalletCount(count);

    const controls = animate(0, total, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(current) {
        setVal(current);
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2">
        <span className="text-[12px] font-mono text-[#94a3b8] uppercase tracking-wider block">
          Total Liquid Balance Available for Withdrawal
        </span>
        <div className="flex items-baseline gap-3">
          <h2 className="text-[32px] md:text-[38px] font-bold font-mono text-[#f8fafc] tracking-tight leading-none">
            ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1 text-[13px]">
          <span className="text-[#94a3b8] flex items-center gap-1.5 font-mono">
            <Layers className="w-3.5 h-3.5 text-[#3b82f6]" />
            {walletCount} Target Wallets Available
          </span>
          <span className="text-[#1e2e4a]">•</span>
          <span className="text-emerald-400 flex items-center gap-1.5 font-mono bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Gateway Authorized
          </span>
        </div>
      </div>

      <div className="w-14 h-14 rounded-xl bg-[#172440] border border-[#1e2e4a] flex items-center justify-center text-[#3b82f6] shadow-sm shrink-0">
        <Wallet className="w-6 h-6" />
      </div>
    </div>
  );
}
