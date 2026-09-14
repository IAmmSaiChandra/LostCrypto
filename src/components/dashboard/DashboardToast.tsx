"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface DashboardToastProps {
  title: string;
  description: string;
  onClose?: () => void;
}

export function DashboardToast({ title, description, onClose }: DashboardToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed top-6 inset-x-0 flex justify-center pointer-events-none z-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          className="flex items-center gap-3.5 bg-[#111a2e] border-2 border-[#2563eb] text-[#f8fafc] p-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto max-w-lg w-full"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#60a5fa]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[14px] text-[#f8fafc]">{title}</span>
            <span className="text-[12px] text-[#94a3b8] font-mono truncate">{description}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
