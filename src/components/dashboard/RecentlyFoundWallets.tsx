"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Landmark, ArrowUpRight } from "lucide-react";

interface FoundWallet {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  address: string;
  value: string;
  time: string;
  status: "Verified" | "Pending";
}

const items: FoundWallet[] = [
  {
    id: "f-1",
    name: "Bitcoin",
    ticker: "BTC",
    logo: "/blockchains/btc.svg",
    address: "bc1q9k4...p9k4p",
    value: "$3,420",
    time: "2 Minutes Ago",
    status: "Verified",
  },
  {
    id: "f-2",
    name: "Ethereum",
    ticker: "ETH",
    logo: "/blockchains/eth.svg",
    address: "0x7d5d2...3f3b2",
    value: "$1,120",
    time: "15 Minutes Ago",
    status: "Verified",
  },
];

export function RecentlyFoundWallets() {
  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
      <div className="flex items-center gap-2">
        <Landmark className="w-5 h-5 text-black" />
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Recently Found Wallets
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
            key={item.id}
            className="p-5 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.01)] cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-2 shrink-0">
                <Image src={item.logo} alt={item.name} width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[14px] font-bold text-black truncate">{item.name}</h5>
                <p className="text-[11px] text-[#6B7280] font-semibold mt-0.5">{item.address}</p>
                <p className="text-[11px] text-emerald-600 font-bold mt-1 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  {item.status}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[16px] font-extrabold text-black">{item.value}</span>
              <p className="text-[11px] text-[#6B7280] font-semibold mt-0.5">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
