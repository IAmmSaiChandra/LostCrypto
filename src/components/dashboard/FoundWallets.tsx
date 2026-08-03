"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Landmark, CheckCircle2 } from "lucide-react";
import { shortenAddress } from "@/src/lib/walletGenerator";

interface FoundWallet {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  address: string;
  value: string;
  status: string;
}

interface FoundWalletsProps {
  wallets: FoundWallet[];
}

export function FoundWallets({ wallets }: FoundWalletsProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Landmark className="w-4 h-4 text-black" />
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Found Wallets
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence initial={false}>
          {wallets.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full bg-white rounded-2xl border border-[#E5E7EB] p-8 flex flex-col items-center justify-center text-center select-none min-h-[140px]"
            >
              <h4 className="text-[15px] font-bold text-black">No Wallets Found Yet</h4>
              <p className="text-[13px] text-[#6B7280] mt-1">
                Keep scanning. Wallets will appear here.
              </p>
              
              {/* Subtle loading dots indicator */}
              <div className="flex gap-1.5 mt-4">
                <span className="w-2 h-2 rounded-full bg-black/20 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-black/20 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-black/20 animate-bounce" />
              </div>
            </motion.div>
          ) : (
            wallets.map((wallet) => (
              <motion.div
                key={wallet.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
                whileTap={{ scale: 0.99 }}
                className="p-5 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.01)] cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-2 shrink-0">
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image 
                        src={wallet.logo} 
                        alt={wallet.name} 
                        width={24} 
                        height={24} 
                        className="w-6 h-6 object-contain" 
                      />
                    </motion.div>
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-[14px] font-bold text-black truncate">{wallet.name}</h5>
                    <p className="text-[11px] text-[#6B7280] font-semibold mt-0.5 font-mono">{shortenAddress(wallet.address)}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                        {wallet.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right shrink-0">
                  <span className="text-[16px] font-extrabold text-black">{wallet.value}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
