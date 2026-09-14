"use client";

import React from "react";
import Image from "next/image";
import { Landmark, CheckCircle2, ShieldAlert } from "lucide-react";
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
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-[14px] font-bold text-[#f8fafc] tracking-tight">
            Discovered Wallets with Unclaimed Assets
          </h3>
        </div>
        <span className="text-[12px] font-mono text-[#94a3b8] bg-[#111a2e] border border-[#1e2e4a] px-2 py-0.5 rounded">
          {wallets.length} Found
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {wallets.length === 0 ? (
          <div className="col-span-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-8 flex flex-col items-center justify-center text-center select-none min-h-[140px]">
            <ShieldAlert className="w-8 h-8 text-[#64748b] mb-2" />
            <h4 className="text-[14px] font-bold text-[#f8fafc]">No Wallets Discovered Yet</h4>
            <p className="text-[13px] text-[#94a3b8] mt-1 max-w-[340px]">
              The scanner continuously tests derived key pairs against active ledger balances. Matching accounts will appear here automatically.
            </p>
          </div>
        ) : (
          wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="p-4 bg-[#111a2e] border border-[#1e2e4a] hover:border-[#2563eb]/50 hover:bg-[#15223c] rounded-xl flex items-center justify-between transition-all select-none"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center p-2 shrink-0">
                  <Image 
                    src={wallet.logo} 
                    alt={wallet.name} 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 object-contain" 
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-[14px] font-bold text-[#f8fafc] truncate">{wallet.name}</h5>
                    <span className="text-[11px] font-mono text-[#64748b] bg-[#0d1424] px-1.5 py-0.2 rounded">
                      {wallet.ticker}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#94a3b8] font-mono mt-0.5">{shortenAddress(wallet.address)}</p>
                </div>
              </div>
              
              <div className="text-right shrink-0 pl-2">
                <span className="text-[16px] font-bold font-mono text-[#60a5fa]">{wallet.value}</span>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-mono uppercase">
                    {wallet.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
