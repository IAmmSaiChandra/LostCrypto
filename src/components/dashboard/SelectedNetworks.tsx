"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getUserChains } from "@/src/lib/supabase/userChains";

interface NetworkItem {
  id: string;
  name: string;
  ticker: string;
  logo: string;
}

const networkList: NetworkItem[] = [
  { id: "btc", name: "Bitcoin", ticker: "BTC", logo: "/blockchains/btc.svg" },
  { id: "eth", name: "Ethereum", ticker: "ETH", logo: "/blockchains/eth.svg" },
  { id: "bnb", name: "BNB Chain", ticker: "BNB", logo: "/blockchains/bnb.svg" },
  { id: "sol", name: "Solana", ticker: "SOL", logo: "/blockchains/sol.svg" },
  { id: "trx", name: "TRON", ticker: "TRX", logo: "/blockchains/trx.svg" },
  { id: "doge", name: "Dogecoin", ticker: "DOGE", logo: "/blockchains/doge.svg" },
  { id: "usdt", name: "Tether", ticker: "USDT", logo: "/blockchains/usdt.svg" },
];

export function SelectedNetworks() {
  const { userId, isLoading: isUserLoading } = useSupabaseUser();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadChains() {
      if (userId) {
        try {
          const chains = await getUserChains(userId);
          if (chains && chains.length > 0) {
             setSelectedKeys(chains.map(c => c.chain.toLowerCase()));
          } else {
             setSelectedKeys(["btc", "eth", "sol"]);
          }
        } catch (error) {
          console.error("Failed to load user chains", error);
          setSelectedKeys(["btc", "eth", "sol"]);
        }
      }
      setIsLoading(false);
    }
    if (!isUserLoading) {
      if (userId) {
        loadChains();
      } else {
        setIsLoading(false);
      }
    }
  }, [userId, isUserLoading]);

  const activeNetworks = networkList.filter((net) => selectedKeys.includes(net.id));

  return (
    <div className="w-full space-y-3">
      <h3 className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider px-1">
        Scanning Networks
      </h3>
      {isLoading || isUserLoading ? (
        <div className="flex flex-wrap gap-2.5">
           {[1, 2, 3].map((i) => (
             <div key={i} className="w-24 h-9 bg-gray-100 animate-pulse rounded-full" />
           ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {activeNetworks.map((net, index) => (
            <motion.div
              key={net.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.015)] select-none cursor-pointer"
            >
              <div className="w-4 h-4 relative flex items-center justify-center shrink-0">
                <Image 
                  src={net.logo} 
                  alt={net.name} 
                  width={16} 
                  height={16} 
                  className="w-4 h-4 object-contain" 
                />
              </div>
              <span className="text-[13px] font-bold text-black">{net.name}</span>
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-[#F1F1F1]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-[#6B7280] font-bold">Online</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
