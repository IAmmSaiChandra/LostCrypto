"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
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
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={isSelected}
      onClick={isLocked ? undefined : onToggle}
      whileHover={isLocked ? {} : { y: -2, scale: 1.01 }}
      whileTap={isLocked ? {} : { scale: 0.99 }}
      className={`w-full flex items-center justify-between p-5 bg-white border rounded-[22px] transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.01)] outline-none focus:ring-2 focus:ring-black/5 ${
        isLocked
          ? "border-[#E5E7EB] opacity-40 cursor-not-allowed"
          : isSelected
            ? "border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.08)] border-[2px] cursor-pointer"
            : "border-[#E5E7EB] hover:border-[#9CA3AF] cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-5">
        {/* Left Section: Official logo container */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#FAFAFA] flex items-center justify-center border border-[#F1F1F1] relative shrink-0">
          <Image
            src={network.logoUrl}
            alt={`${network.name} logo`}
            width={42}
            height={42}
            className="object-contain"
            priority
          />
        </div>

        {/* Center Section: Blockchain Information */}
        <div className="flex flex-col text-left">
          <span className="text-[17px] font-bold text-black tracking-tight leading-tight">
            {network.name}
          </span>
          <span className="text-[13px] text-[#6B7280] font-medium font-mono uppercase mt-0.5">
            {network.symbol} • {network.type}
          </span>
        </div>
      </div>

      {/* Right Section: Checkmark or Lock indicator */}
      <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
        {isLocked ? (
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Lock className="w-3 h-3 text-gray-400" />
          </div>
        ) : (
          <AnimatePresence>
            {isSelected ? (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 15 }}
                className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20"
              >
                <Check className="w-3.5 h-3.5 text-white" />
              </motion.div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-[#E5E7EB]" />
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.button>
  );
}
