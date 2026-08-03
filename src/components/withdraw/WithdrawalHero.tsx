"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "motion/react";
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div className="space-y-3">
        <span className="text-[13px] font-bold text-[#6B7280] tracking-wider uppercase">
          Total Recovered Balance
        </span>
        <div className="flex items-baseline gap-2">
          <h2 className="text-[36px] md:text-[42px] font-extrabold text-black tracking-tight leading-none">
            ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 pt-1">
          <span className="text-[13px] text-[#6B7280] flex items-center gap-1.5 font-semibold">
            <Layers className="w-4 h-4 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} />
            {walletCount} Wallets Found
          </span>
          <span className="text-[13px] text-emerald-600 flex items-center gap-1.5 font-bold bg-emerald-50 border border-emerald-200/40 px-3 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Connected
          </span>
        </div>
      </div>

      {/* Animated Wallet Icon / Illustration */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-3xl bg-neutral-50 border border-[#F1F1F1] flex items-center justify-center text-black shadow-sm shrink-0"
      >
        <Wallet className="w-7 h-7" />
      </motion.div>
    </motion.div>
  );
}
