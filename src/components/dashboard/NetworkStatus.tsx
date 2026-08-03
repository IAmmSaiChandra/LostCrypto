"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface NetworkItem {
  name: string;
  ticker: string;
  logo: string;
}

const networks: NetworkItem[] = [
  { name: "Bitcoin", ticker: "BTC", logo: "/blockchains/btc.svg" },
  { name: "Ethereum", ticker: "ETH", logo: "/blockchains/eth.svg" },
  { name: "BNB Chain", ticker: "BNB", logo: "/blockchains/bnb.svg" },
  { name: "Solana", ticker: "SOL", logo: "/blockchains/sol.svg" },
  { name: "TRON", ticker: "TRX", logo: "/blockchains/trx.svg" },
  { name: "Dogecoin", ticker: "DOGE", logo: "/blockchains/doge.svg" },
  { name: "Tether", ticker: "USDT", logo: "/blockchains/usdt.svg" },
];

export function NetworkStatus() {
  return (
    <div className="w-full space-y-3">
      <h3 className="text-[14px] font-bold text-[#6B7280] uppercase tracking-wide px-1">
        Supported Network Status
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {networks.map((net, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            key={net.ticker}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.015)] select-none hover:border-black/10 transition-colors"
          >
            <div className="w-5 h-5 rounded-lg flex items-center justify-center p-0.5 shrink-0">
              <Image src={net.logo} alt={net.name} width={16} height={16} className="w-4 h-4 object-contain" />
            </div>
            <span className="text-[13px] font-bold text-black">{net.name}</span>
            <div className="flex items-center gap-1.5 pl-1.5 border-l border-[#F1F1F1]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-[#6B7280] font-bold">Online</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
