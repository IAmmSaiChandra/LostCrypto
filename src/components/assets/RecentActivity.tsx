"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "received" | "sent" | "added";
  asset: string;
  ticker: string;
  amount: string;
  valueInRs: string;
  date: string;
}

const activities: ActivityItem[] = [
  {
    id: "act-1",
    type: "received",
    asset: "Bitcoin",
    ticker: "BTC",
    amount: "0.0034 BTC",
    valueInRs: "+₹18,400",
    date: "Today",
  },
  {
    id: "act-2",
    type: "added",
    asset: "Solana",
    ticker: "SOL",
    amount: "0.45 SOL",
    valueInRs: "+₹6,800",
    date: "Yesterday",
  },
  {
    id: "act-3",
    type: "received",
    asset: "Ethereum",
    ticker: "ETH",
    amount: "0.09 ETH",
    valueInRs: "+₹22,000",
    date: "2 Days Ago",
  },
];

export function RecentActivity() {
  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
      <h3 className="text-[18px] font-bold text-black tracking-tight">
        Recent Activity
      </h3>

      <div className="relative pl-6 border-l border-[#F1F1F1] space-y-8">
        {activities.map((item, index) => {
          const isReceived = item.type === "received" || item.type === "added";

          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              key={item.id}
              className="relative flex items-center justify-between gap-4"
            >
              {/* Connector Dot */}
              <div className="absolute -left-[31px] w-2.5 h-2.5 rounded-full bg-white border-2 border-black" />

              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isReceived ? "bg-emerald-50/50 border-emerald-100 text-emerald-600" : "bg-neutral-50 border-neutral-100 text-black"
                }`}>
                  {isReceived ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <h5 className="text-[14px] font-bold text-black">
                    {item.type === "received" ? "Received" : item.type === "added" ? "Added" : "Sent"} {item.asset}
                  </h5>
                  <p className="text-[12px] text-[#6B7280] font-semibold mt-0.5">
                    {item.amount} • {item.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[14px] font-extrabold ${isReceived ? "text-emerald-600" : "text-black"}`}>
                  {item.valueInRs}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
