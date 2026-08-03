"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Copy, Check } from "lucide-react";

export function SupportCard() {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("https://t.me/groupkeys");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-center relative overflow-hidden"
    >
      {/* Decorative large Telegram backdrop icon */}
      <div className="absolute -right-8 -bottom-8 text-neutral-50/50 pointer-events-none">
        <Send className="w-36 h-36" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Support Icon */}
        <div className="w-12 h-12 rounded-full bg-neutral-50 border border-[#F1F1F1] flex items-center justify-center mb-4">
          <Send className="w-5 h-5 text-black" />
        </div>

        <h3 className="text-[18px] font-bold text-black tracking-tight mb-2">
          Need an activation key?
        </h3>
        <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6 max-w-[280px]">
          Join the group and Tag the owner @rioggz to get the key.
        </p>

        {/* Username focus area */}
        <div className="text-[26px] font-extrabold text-black tracking-tight mb-6 font-mono selection:bg-black selection:text-white">
          @rioggz
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="https://t.me/groupkeys"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-medium flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
          >
            <Send className="w-4 h-4" />
            Join Telegram Group
          </a>
          
          <button
            type="button"
            onClick={copyNumber}
            className="w-full sm:w-auto h-12 px-6 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-medium flex items-center justify-center gap-2 transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  Copied Link ✓
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  Copy Group Link
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
