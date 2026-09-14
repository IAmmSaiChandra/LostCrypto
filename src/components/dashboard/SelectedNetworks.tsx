"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getUserChains } from "@/src/lib/supabase/userChains";
import { Cpu } from "lucide-react";

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
            setSelectedKeys(chains.map((c) => c.chain.toLowerCase()));
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
    <div className="w-full space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-[12px] font-mono font-semibold text-[#94a3b8] uppercase tracking-wider">
            Active Scanning Target Networks ({activeNetworks.length})
          </h3>
        </div>
      </div>

      {isLoading || isUserLoading ? (
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-28 h-9 bg-[#111a2e] border border-[#1e2e4a] animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {activeNetworks.map((net) => (
            <div
              key={net.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111a2e] border border-[#1e2e4a] hover:border-[#2563eb]/50 transition-all select-none"
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
              <span className="text-[13px] font-semibold text-[#f8fafc]">{net.name}</span>
              <span className="text-[11px] font-mono text-[#60a5fa]">{net.ticker}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
