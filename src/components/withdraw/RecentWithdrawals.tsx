"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
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
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-600 text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/50 text-amber-600 text-[11px] font-bold flex items-center gap-1">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200/50 text-red-500 text-[11px] font-bold flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            Failed
          </span>
        );
    }
  };

  if (isFetching) {
    return (
      <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-4 text-center select-none">
        <h3 className="text-[18px] font-bold text-black tracking-tight text-left">
          Recent Unlocks
        </h3>
        <p className="text-[13px] text-[#6B7280]">No withdrawals initiated yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
      <h3 className="text-[18px] font-bold text-black tracking-tight">
        Recent Unlocks
      </h3>

      <div className="divide-y divide-[#F1F1F1]">
        {items.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-2 shrink-0">
                <Image src={item.logo} alt={item.name} width={24} height={24} className="w-6 h-6 object-contain" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[14px] font-bold text-black truncate">{item.name}</h5>
                <p className="text-[12px] text-[#6B7280] font-semibold mt-0.5">{item.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-extrabold text-black">{item.amount}</span>
              {getStatusBadge(item.status)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
