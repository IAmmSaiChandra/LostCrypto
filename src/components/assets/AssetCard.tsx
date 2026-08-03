"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkline } from "./Sparkline";

export interface AssetData {
  name: string;
  ticker: string;
  logo: string;
  balance: string;
  valueInUsd: number;
  percentage: number;
  change24h: number;
  sparklineData: number[];
}

interface AssetCardProps {
  asset: AssetData;
  isSelected?: boolean;
  hasSelection?: boolean;
}

const themeColors: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  BNB: "#F3BA2F",
  SOL: "#14F195",
  USDT: "#26A17B",
  TRX: "#EF0027",
  DOGE: "#C2A633",
  AVAX: "#E84142",
};

export function AssetCard({ asset, isSelected = false, hasSelection = false }: AssetCardProps) {
  const isPositive = asset.change24h >= 0;
  const themeColor = themeColors[asset.ticker] || "#000000";

  return (
    <motion.div
      animate={{
        y: isSelected ? -4 : 0,
        boxShadow: isSelected 
          ? "0 12px 32px rgba(0,0,0,0.06)" 
          : "0 4px 20px rgba(0,0,0,0.01)",
        borderColor: isSelected ? themeColor : "#E5E7EB",
        opacity: hasSelection && !isSelected ? 0.4 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full bg-white rounded-[20px] border p-5 transition-all duration-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4`}
      style={{
        borderWidth: isSelected ? "2px" : "1px",
      }}
    >
      {/* Left segment - Logo & Metadata */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-[#F1F1F1] p-2 flex items-center justify-center shrink-0">
          <Image
            src={asset.logo}
            alt={asset.name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-[16px] font-extrabold text-black truncate">
              {asset.name}
            </h4>
            <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase bg-neutral-100 px-1.5 py-0.5 rounded">
              {asset.ticker}
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] font-semibold mt-1">
            {asset.balance}
          </p>
        </div>
      </div>

      {/* Middle/Right segment - Sparkline & Pricing data */}
      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 shrink-0">
        {/* Trend Sparkline */}
        <div className="hidden xs:block shrink-0">
          <Sparkline
            data={asset.sparklineData}
            color={isPositive ? "#10B981" : "#EF4444"}
            width={70}
            height={26}
          />
        </div>

        {/* Port Value & Metrics */}
        <div className="text-right">
          <p className="text-[16px] font-extrabold text-black">
            ${asset.valueInUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-end gap-1.5 mt-1">
            <span className="text-[12px] text-[#9CA3AF] font-bold">
              {asset.percentage}%
            </span>
            <span className="text-neutral-300">•</span>
            <span
              className={`text-[12px] font-bold ${
                isPositive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {asset.change24h}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
