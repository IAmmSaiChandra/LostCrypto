"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Copy, Check } from "lucide-react";

export function HelpCard() {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.01)] text-center"
    >
      <h2 className="text-[20px] font-semibold text-black tracking-tight mb-3">
        Don&apos;t have an activation key?
      </h2>
      <p className="text-[15px] text-[#6B7280] leading-relaxed mb-6 max-w-[320px] mx-auto">
        Join the group and Tag the owner @rioggz to get the key.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://t.me/groupkeys"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[15px] text-black font-medium transition-all duration-200"
        >
          <Send className="w-[18px] h-[18px]" />
          Join Telegram Group
        </a>
        <button
          onClick={copyNumber}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[15px] text-black font-medium transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-[18px] h-[18px]" />
              Copied Link
            </>
          ) : (
            <>
              <Copy className="w-[18px] h-[18px]" />
              Copy Group Link
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
