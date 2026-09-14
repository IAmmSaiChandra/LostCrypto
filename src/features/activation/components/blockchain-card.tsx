"use client";

import React from "react";
import { Check, Lock } from "lucide-react";
import Image from "next/image";
import { BlockchainNetwork } from "@/src/lib/blockchain/networks";

interface BlockchainCardProps {
  network: BlockchainNetwork;
  isSelected: boolean;
  isLocked: boolean;
  onToggle: () => void;
}

export function BlockchainCard({ network, isSelected, isLocked, onToggle }: BlockchainCardProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      onClick={isLocked ? undefined : onToggle}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-150 text-left outline-none ${
        isLocked
          ? "border-[#1e2e4a] bg-[#0d1424]/60 opacity-40 cursor-not-allowed"
          : isSelected
          ? "border-[#2563eb] bg-[#172440] shadow-[0_0_16px_rgba(37,99,235,0.15)] cursor-pointer"
          : "border-[#1e2e4a] bg-[#111a2e] hover:border-[#2d446e] hover:bg-[#15223c] cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Official logo container */}
        <div className="w-10 h-10 rounded-lg bg-[#0d1424] flex items-center justify-center border border-[#1e2e4a] relative shrink-0 p-2">
          <Image
            src={network.logoUrl}
            alt={`${network.name} logo`}
            width={28}
            height={28}
            className="object-contain"
            priority
          />
        </div>

        {/* Blockchain Information */}
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-[#f8fafc] tracking-tight leading-tight">
            {network.name}
          </span>
          <span className="text-[12px] text-[#94a3b8] font-mono mt-0.5">
            {network.symbol} • <span className="text-[#64748b]">{network.type}</span>
          </span>
        </div>
      </div>

      {/* Checkmark or Lock indicator */}
      <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
        {isLocked ? (
          <div className="w-5 h-5 rounded-md bg-[#1e2e4a] flex items-center justify-center">
            <Lock className="w-3 h-3 text-[#64748b]" />
          </div>
        ) : isSelected ? (
          <div className="w-5 h-5 rounded-md bg-[#2563eb] flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.4)]">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-md border border-[#1e2e4a] bg-[#0d1424]" />
        )}
      </div>
    </button>
  );
}
