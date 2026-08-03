"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ListFilter, Search, CheckCircle } from "lucide-react";

interface LiveActivityProps {
  logs: string[];
}

export function LiveActivity({ logs }: LiveActivityProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
      <div className="flex items-center gap-2">
        <ListFilter className="w-5 h-5 text-black" />
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Live Activity Feed
        </h3>
      </div>

      <div
        ref={containerRef}
        className="h-44 overflow-y-auto space-y-2.5 pr-2 scrollbar-none scroll-smooth flex flex-col justify-start"
      >
        <AnimatePresence initial={false}>
          {logs.map((log, index) => {
            const isFound = log.includes("Found") || log.includes("Verified");
            return (
              <motion.div
                key={`${log}-${index}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-[13px] font-semibold ${
                  isFound
                    ? "bg-emerald-50/50 border-emerald-100/50 text-emerald-600"
                    : "bg-[#FAFAFA] border-[#F1F1F1] text-[#6B7280]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isFound ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                  <span className="truncate">{log}</span>
                </div>
                <span className="text-[10px] text-neutral-400 shrink-0 select-none">
                  Just now
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
