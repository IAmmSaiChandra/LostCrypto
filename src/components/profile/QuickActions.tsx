"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Copy, Check, Send, LogOut } from "lucide-react";
import { useActivationStore } from "@/src/store/use-activation-store";

interface QuickActionsProps {
  activationKey: string;
}

export function QuickActions({ activationKey }: QuickActionsProps) {
  const [copied, setCopied] = useState(false);
  const { setStep } = useActivationStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activationKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  const handleLogOut = () => {
    // Purge local storage and reset
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-email");
    localStorage.removeItem("activation-key");
    localStorage.removeItem("activation-date");
    localStorage.removeItem("uploaded-photo");
    document.cookie = "activation-key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setStep("activation");
    window.location.href = "/activation";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6"
    >
      <h3 className="text-[18px] font-bold text-black tracking-tight">
        Quick Actions
      </h3>

      <div className="flex flex-col gap-3">
        {/* Contact Support */}
        <a
          href="https://t.me/groupkeys"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-[52px] rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-semibold flex items-center justify-between px-4 transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <User className="w-4 h-4 text-black" />
            Telegram Group
          </span>
          <span className="text-[12px] text-[#6B7280] font-bold">@rioggz</span>
        </a>

        {/* Copy Activation Key */}
        <button
          onClick={handleCopy}
          className="w-full h-[52px] rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-semibold flex items-center justify-between px-4 transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <Copy className="w-4 h-4 text-black" />
            Copy Activation Key
          </span>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-emerald-600 text-[12px] font-bold"
              >
                Copied ✓
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] text-[#6B7280] font-bold"
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Log Out */}
        <button
          onClick={handleLogOut}
          className="w-full h-[52px] rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-100/50 text-[14px] text-red-600 font-bold flex items-center justify-between px-4 transition-all duration-200"
        >
          <span className="flex items-center gap-3">
            <LogOut className="w-4 h-4" />
            Log Out
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Session</span>
        </button>
      </div>
    </motion.div>
  );
}
