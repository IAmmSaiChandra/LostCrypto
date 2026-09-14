"use client";

import React from "react";
import { Clock, Globe, Activity } from "lucide-react";

export function SupportStatus() {
  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4a]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-[15px] font-bold text-[#f8fafc] tracking-tight">
            Support Desk Status
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ONLINE
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center text-[#60a5fa] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b] font-mono font-semibold uppercase tracking-wider">
              Response Latency
            </p>
            <p className="text-[13px] text-[#f8fafc] font-medium mt-0.5">
              Typical reply time 30–60 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center text-[#60a5fa] shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#64748b] font-mono font-semibold uppercase tracking-wider">
              Coverage Hours
            </p>
            <p className="text-[13px] text-[#f8fafc] font-medium mt-0.5">
              24×7 Community & Technical Coverage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
