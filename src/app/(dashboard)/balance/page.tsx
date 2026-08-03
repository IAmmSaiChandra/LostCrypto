"use client";

import React, { useEffect, useState } from "react";
import { PortfolioOverview } from "@/src/components/assets/PortfolioOverview";
import { PortfolioDonutChart } from "@/src/components/assets/PortfolioDonutChart";
import { AssetList } from "@/src/components/assets/AssetList";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { supabase } from "@/src/lib/supabase/client";
import { getWalletsByUser, Wallet } from "@/src/lib/supabase/wallets";
import { CHAIN_CONFIGS } from "@/src/lib/walletGenerator";
import { AssetData } from "@/src/components/assets/AssetCard";

const chainColors: Record<string, string> = {
  BTC: "#F7931A", ETH: "#627EEA", BNB: "#F3BA2F", SOL: "#14F195",
  USDT: "#26A17B", TRX: "#EF0027", DOGE: "#C2A633"
};

// Mock sparkline data mapping for visual consistency
const MOCK_SPARKLINE: Record<string, { change24h: number; sparklineData: number[] }> = {
  BTC: { change24h: 3.8, sparklineData: [42, 43, 41, 44, 45, 43, 46] },
  ETH: { change24h: 1.2, sparklineData: [32, 31, 33, 32, 34, 35, 36] },
  BNB: { change24h: -0.5, sparklineData: [28, 29, 27, 26, 28, 27, 26] },
  SOL: { change24h: 14.2, sparklineData: [18, 20, 22, 21, 23, 24, 26] },
  USDT: { change24h: 0.1, sparklineData: [10, 10.1, 10, 10.05, 10.1, 10, 10.08] },
  TRX: { change24h: 2.5, sparklineData: [12, 11.8, 12.2, 12.5, 12.3, 12.6, 12.8] },
  DOGE: { change24h: -4.2, sparklineData: [15, 14.8, 14.2, 13.9, 14.3, 14.1, 13.6] },
  AVAX: { change24h: -1.8, sparklineData: [21, 22, 20, 19.5, 20.2, 19.8, 19.2] },
};

export default function AssetsPage() {
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  
  const { userId } = useSupabaseUser();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    if (!userId) {
      // If we don't have a userId yet, we might be loading auth
      return;
    }

    const fetchWallets = async () => {
      try {
        const data = await getWalletsByUser(userId);
        setWallets(data || []);
      } catch (err) {
        console.error("Failed to fetch wallets", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();

    const channel = supabase
      .channel('wallets_balance')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'wallets',
        filter: `user_id=eq.${userId}`
      }, () => {
        fetchWallets();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  // Aggregate
  const totalValue = wallets.reduce((sum, w) => sum + (w.balance_usd || 0), 0);
  
  const chainMap = new Map<string, { balance: number; balanceUsd: number }>();
  for (const w of wallets) {
    const existing = chainMap.get(w.chain) || { balance: 0, balanceUsd: 0 };
    existing.balance += w.balance;
    existing.balanceUsd += (w.balance_usd || 0);
    chainMap.set(w.chain, existing);
  }

  const assets: AssetData[] = Array.from(chainMap.entries()).map(([chain, data]) => {
    const config = CHAIN_CONFIGS[chain];
    const percentage = totalValue > 0 ? (data.balanceUsd / totalValue) * 100 : 0;
    
    // Fallback if missing config
    const name = config?.name || chain;
    const ticker = config?.ticker || chain;
    const logo = config?.logo || "";
    
    const mock = MOCK_SPARKLINE[chain] || { change24h: 0, sparklineData: [10, 10, 10, 10, 10] };
    
    // format balance
    const formattedBalance = `${parseFloat(data.balance.toFixed(6))} ${ticker}`;

    return {
      name,
      ticker,
      logo,
      balance: formattedBalance,
      valueInUsd: data.balanceUsd,
      percentage: Math.round(percentage),
      change24h: mock.change24h,
      sparklineData: mock.sparklineData
    };
  }).sort((a, b) => b.valueInUsd - a.valueInUsd);

  const chartData = assets.map(a => ({
    name: a.name,
    value: a.percentage,
    valueInUsd: a.valueInUsd,
    color: chainColors[a.ticker] || "#cccccc",
    ticker: a.ticker,
    logo: a.logo
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 selection:bg-black selection:text-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-tight">
            Assets
          </h1>
          <p className="text-[15px] text-[#6B7280] leading-relaxed mt-1">
            Here&apos;s a complete overview of your portfolio.
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-[13px] font-bold text-black uppercase tracking-wider bg-white border border-[#E5E7EB] px-3.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            {formattedDate || "Loading Date..."}
          </span>
        </div>
      </div>

      {wallets.length === 0 ? (
        <div className="bg-white rounded-[24px] border border-[#E5E7EB] p-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
          <h3 className="text-xl font-bold text-black mb-2">No Assets Found</h3>
          <p className="text-[#6B7280]">Start a scan to find your crypto assets.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <PortfolioOverview totalValue={totalValue} changePercent={8.4} />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h3 className="text-[18px] font-bold text-black tracking-tight">
                  Asset Holdings
                </h3>
                {selectedTicker && (
                  <button
                    onClick={() => setSelectedTicker(null)}
                    className="text-[13px] font-semibold text-[#6B7280] hover:text-black transition-colors"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
              <AssetList assets={assets} selectedTicker={selectedTicker} onSelectTicker={setSelectedTicker} />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-[18px] font-bold text-black tracking-tight mb-4 px-1">
                Distribution
              </h3>
              <PortfolioDonutChart 
                data={chartData} 
                totalValue={totalValue} 
                selectedTicker={selectedTicker} 
                onSelectTicker={setSelectedTicker} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
