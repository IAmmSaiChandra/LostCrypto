"use client";

import React from "react";
import { Info } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon = <Info className="w-10 h-10 text-neutral-300" />,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-gray-200 rounded-[20px] bg-white max-w-[400px] mx-auto">
      {/* Icon Area */}
      <div className="mb-4 flex items-center justify-center w-16 h-16 bg-[#FAFAFA] rounded-full">
        {icon}
      </div>

      {/* Texts */}
      <h3 className="text-[18px] font-bold text-black tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
        {description}
      </p>

      {/* Primary Action */}
      {actionLabel && onAction && (
        <motion.button
          type="button"
          onClick={onAction}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="h-10 px-6 bg-black text-white text-[14px] font-medium rounded-xl hover:bg-black/90 transition-all shadow-sm"
        >
          {actionLabel}
        </motion.button>
      )}
    </div>
  );
}
