"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { TrendingUp, Layers } from "lucide-react";

interface PortfolioOverviewProps {
  totalValue: number;
  changePercent: number;
}

export function PortfolioOverview({ totalValue, changePercent }: PortfolioOverviewProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const controls = animate(0, totalValue, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setVal(value);
      },
    });
    return () => controls.stop();
  }, [totalValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div className="space-y-2">
        <span className="text-[14px] font-semibold text-[#6B7280] tracking-wide uppercase">
          Total Portfolio Value
        </span>
        <div className="flex items-baseline gap-3">
          <h2 className="text-[38px] md:text-[44px] font-extrabold text-black tracking-tight leading-none">
            ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-7 px-2.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-600 text-[13px] font-bold flex items-center gap-1 shrink-0"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            +{changePercent.toFixed(1)}%
          </motion.span>
        </div>
        <p className="text-[14px] text-[#9CA3AF] flex items-center gap-1.5 pt-1">
          <Layers className="w-4 h-4 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} />
          8 Supported Blockchains
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2 border-l border-[#F1F1F1] pl-8 py-2">
        <div className="text-right">
          <p className="text-[13px] text-[#6B7280] font-medium">Daily Gains</p>
          <p className="text-[18px] font-bold text-emerald-600">+$1,902.15</p>
        </div>
      </div>
    </motion.div>
  );
}
