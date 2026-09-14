"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, XCircle, History } from "lucide-react";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getWithdrawalsByUser } from "@/src/lib/supabase/withdrawals";
import { CHAIN_CONFIGS } from "@/src/lib/walletGenerator";

interface RecentWithdrawalItem {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export function RecentWithdrawals() {
  const { userId } = useSupabaseUser();
  const [items, setItems] = useState<RecentWithdrawalItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function loadWithdrawals() {
      if (!userId) return;
      try {
        setIsFetching(true);
        const data = await getWithdrawalsByUser(userId);
        const mapped = data.map((item: any) => {
          const config = CHAIN_CONFIGS[item.wallets.chain];
          return {
            id: item.id,
            name: config.name,
            ticker: config.ticker,
            logo: config.logo,
            amount: `${item.amount} ${config.ticker}`,
            date: new Date(item.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            status: item.status || "completed",
          };
        });
        setItems(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    }
    loadWithdrawals();
  }, [userId]);

  const getStatusBadge = (status: "completed" | "pending" | "failed") => {
    switch (status) {
      case "completed":
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Complete
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-semibold flex items-center gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-mono font-semibold flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
    }
  };

  if (isFetching) {
    return (
      <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-8 flex justify-center items-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[#3b82f6]" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1e2e4a]">
        <History className="w-4 h-4 text-[#3b82f6]" />
        <h3 className="text-[14px] font-bold text-[#f8fafc] tracking-tight">
          Recent Blockchain Transfers
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-[13px] text-[#64748b] text-center py-6">
          No previous transfers recorded for this operator.
        </p>
      ) : (
        <div className="divide-y divide-[#1e2e4a]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center p-1.5 shrink-0">
                  <Image src={item.logo} alt={item.name} width={22} height={22} className="w-5 h-5 object-contain" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-[13px] font-bold text-[#f8fafc] truncate">{item.name}</h5>
                  <p className="text-[11px] text-[#64748b] font-mono">{item.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px] font-bold font-mono text-[#f8fafc]">{item.amount}</span>
                {getStatusBadge(item.status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
