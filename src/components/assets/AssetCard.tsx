"use client";

import React from "react";
import Image from "next/image";
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

export function AssetCard({ asset, isSelected = false, hasSelection = false }: AssetCardProps) {
  const isPositive = asset.change24h >= 0;

  return (
    <div
      className={`w-full rounded-xl border p-4 transition-all duration-150 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 select-none ${
        isSelected
          ? "bg-[#172440] border-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.18)]"
          : "bg-[#111a2e] border-[#1e2e4a] hover:border-[#2d446e] hover:bg-[#15223c]"
      } ${hasSelection && !isSelected ? "opacity-40" : "opacity-100"}`}
    >
      {/* Left segment - Logo & Metadata */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-11 h-11 rounded-lg bg-[#0d1424] border border-[#1e2e4a] p-2 flex items-center justify-center shrink-0">
          <Image
            src={asset.logo}
            alt={asset.name}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            priority
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-[15px] font-bold text-[#f8fafc] truncate">
              {asset.name}
            </h4>
            <span className="text-[11px] font-mono font-semibold text-[#60a5fa] bg-[#0d1424] border border-[#1e2e4a] px-1.5 py-0.2 rounded">
              {asset.ticker}
            </span>
          </div>
          <p className="text-[12px] font-mono text-[#94a3b8] mt-0.5">
            {asset.balance}
          </p>
        </div>
      </div>

      {/* Right segment - Sparkline & Pricing data */}
      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 shrink-0">
        {/* Trend Sparkline */}
        <div className="hidden xs:block shrink-0">
          <Sparkline
            data={asset.sparklineData}
            color={isPositive ? "#10B981" : "#EF4444"}
            width={70}
            height={24}
          />
        </div>

        {/* Valuation & Metrics */}
        <div className="text-right">
          <p className="text-[15px] font-bold font-mono text-[#f8fafc]">
            ${asset.valueInUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center justify-end gap-1.5 mt-0.5">
            <span className="text-[11px] font-mono text-[#64748b]">
              {asset.percentage}%
            </span>
            <span className="text-[#1e2e4a]">•</span>
            <span
              className={`text-[11px] font-mono font-bold ${
                isPositive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {asset.change24h}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
