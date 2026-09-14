"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader";
import { SelectedNetworks } from "@/src/components/dashboard/SelectedNetworks";
import { ScannerConsole } from "@/src/components/dashboard/ScannerConsole";
import { ScannerControls } from "@/src/components/dashboard/ScannerControls";
import { FoundWallets } from "@/src/components/dashboard/FoundWallets";
import { DashboardToast } from "@/src/components/dashboard/DashboardToast";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getWalletsByUser, insertWallet } from "@/src/lib/supabase/wallets";
import { getScanSessionByUser, upsertScanSession, updateScanSessionStats } from "@/src/lib/supabase/scanSessions";
import { getUserChains } from "@/src/lib/supabase/userChains";
import { generateRandomWallet, CHAIN_CONFIGS, formatWalletValue } from "@/src/lib/walletGenerator";
import { supabase } from "@/src/lib/supabase/client";
import { getAvailableMockWallet, markMockWalletAsFound } from "@/src/lib/supabase/mockWallets";
import { Shield, Database, Zap, Search } from "lucide-react";

function maskAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function maskMnemonic(mnemonic: string): string {
  if (!mnemonic) return "";
  const words = mnemonic.split(" ");
  if (words.length <= 4) return words.join(" ");
  return `${words[0]} ${words[1]} ... ${words[words.length - 2]} ${words[words.length - 1]}`;
}

interface FoundWallet {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  address: string;
  value: string;
  status: string;
}

export default function DashboardPage() {
  const { userId, isLoading: isUserLoading } = useSupabaseUser();
  const [isActive, setIsActive] = useState(false);
  const [foundWallets, setFoundWallets] = useState<FoundWallet[]>([]);
  const [sessionStats, setSessionStats] = useState<{ checked: number; found: number; speed: number } | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; name: string; value: string; address: string; mnemonic: string }>(
    { visible: false, name: "", value: "", address: "", mnemonic: "" }
  );
  const [isLoading, setIsLoading] = useState(true);

  // Map Supabase wallet to FoundWallet format
  const mapWallet = (wallet: any): FoundWallet => {
    const config = CHAIN_CONFIGS[wallet.chain as keyof typeof CHAIN_CONFIGS] || CHAIN_CONFIGS.BTC;
    return {
      id: wallet.id,
      name: config.name,
      ticker: config.ticker,
      logo: config.logo,
      address: wallet.address,
      value: formatWalletValue(wallet.balance_usd || 0),
      status: "Verified"
    };
  };

  // Fetch initial data
  useEffect(() => {
    async function loadData() {
      if (!userId) return;
      try {
        const [wallets, session, userChains] = await Promise.all([
          getWalletsByUser(userId),
          getScanSessionByUser(userId),
          getUserChains(userId)
        ]);
        
        const allowedChains = userChains && userChains.length > 0 
          ? userChains.map(c => c.chain)
          : ["BTC", "ETH", "SOL"];
        
        let finalChecked = session ? (session.wallets_checked || 0) : 0;
        let finalFound = session ? (session.found_count || 0) : 0;
        const speed = session ? (session.speed || 1350) : 1350;

        if (session && session.is_active && session.last_active) {
          const lastActiveTime = new Date(session.last_active).getTime();
          const elapsedSeconds = Math.floor((Date.now() - lastActiveTime) / 1000);
          
          if (elapsedSeconds > 0) {
            const additionalChecked = elapsedSeconds * Math.floor(speed / 60);
            finalChecked += additionalChecked;

            const walletsToFind = Math.floor(elapsedSeconds / 3600);
            const remainderSeconds = elapsedSeconds % 3600;
            
            localStorage.setItem("lostcrypto_active_scan_seconds", remainderSeconds.toString());
            
            let actualFoundCount = 0;
            for (let i = 0; i < walletsToFind; i++) {
              let mockWallet = await getAvailableMockWallet(allowedChains);
              if (!mockWallet) {
                mockWallet = await getAvailableMockWallet(["BTC", "ETH", "SOL", "BNB", "USDT", "TRX", "DOGE"]);
              }
              if (mockWallet) {
                const config = CHAIN_CONFIGS[mockWallet.chain as keyof typeof CHAIN_CONFIGS] || CHAIN_CONFIGS.BTC;
                const balanceUsd = parseFloat((mockWallet.balance * config.priceUsd).toFixed(2));
                
                await insertWallet({
                  user_id: userId,
                  chain: mockWallet.chain,
                  address: mockWallet.address,
                  balance: mockWallet.balance,
                  balance_usd: balanceUsd,
                  mnemonic: mockWallet.mnemonic,
                  unlocked: false
                });

                await markMockWalletAsFound(mockWallet.id, userId);
                actualFoundCount += 1;
              }
            }

            finalFound += actualFoundCount;
            await updateScanSessionStats(userId, finalChecked, finalFound, speed, true);
          }
        }
        
        const freshWallets = await getWalletsByUser(userId);
        if (freshWallets) {
          setFoundWallets(freshWallets.map(mapWallet));
        }

        if (session) {
          setSessionStats({
            checked: finalChecked,
            found: finalFound,
            speed: speed
          });
          setIsActive(!!session.is_active);
        } else {
          setSessionStats({ checked: 0, found: 0, speed: 1350 });
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isUserLoading) {
      if (userId) {
        loadData();
      } else {
        setIsLoading(false);
      }
    }
  }, [userId, isUserLoading]);

  // Keep a reference to latest stats
  const sessionStatsRef = useRef(sessionStats);
  useEffect(() => {
    sessionStatsRef.current = sessionStats;
  }, [sessionStats]);

  // Unified active scanning loop
  useEffect(() => {
    if (!isActive || !userId) return;

    const ticker = setInterval(async () => {
      setSessionStats(prev => {
        if (!prev) return null;
        return {
          ...prev,
          checked: prev.checked + Math.floor(prev.speed + (Math.random() * 80 - 40))
        };
      });

      let elapsedSeconds = parseInt(localStorage.getItem("lostcrypto_active_scan_seconds") || "0");
      elapsedSeconds += 1;

      let targetSeconds = parseInt(localStorage.getItem("lostcrypto_target_scan_seconds") || "0");
      if (targetSeconds !== 3600) {
        targetSeconds = 3600;
        localStorage.setItem("lostcrypto_target_scan_seconds", targetSeconds.toString());
      }

      if (elapsedSeconds >= targetSeconds) {
        localStorage.setItem("lostcrypto_active_scan_seconds", "0");
        const nextTarget = 3600;
        localStorage.setItem("lostcrypto_target_scan_seconds", nextTarget.toString());
        try {
          const userChains = await getUserChains(userId);
          const allowedChains = userChains && userChains.length > 0 
            ? userChains.map(c => c.chain)
            : ["BTC", "ETH", "SOL"];
          
          let mockWallet = await getAvailableMockWallet(allowedChains);
          if (!mockWallet) {
            mockWallet = await getAvailableMockWallet(["BTC", "ETH", "SOL", "BNB", "USDT", "TRX", "DOGE"]);
          }
          let inserted = null;

          if (mockWallet) {
            const config = CHAIN_CONFIGS[mockWallet.chain as keyof typeof CHAIN_CONFIGS] || CHAIN_CONFIGS.BTC;
            const balanceUsd = parseFloat((mockWallet.balance * config.priceUsd).toFixed(2));
            
            inserted = await insertWallet({
              user_id: userId,
              chain: mockWallet.chain,
              address: mockWallet.address,
              balance: mockWallet.balance,
              balance_usd: balanceUsd,
              mnemonic: mockWallet.mnemonic,
              unlocked: false
            });

            await markMockWalletAsFound(mockWallet.id, userId);
          } else {
            const randomChain = allowedChains[Math.floor(Math.random() * allowedChains.length)] as keyof typeof CHAIN_CONFIGS;
            const newWalletData = generateRandomWallet(randomChain, userId);
            inserted = await insertWallet(newWalletData);
          }

          if (inserted) {
            setSessionStats(prev => {
              if (!prev) return null;
              const nextFound = prev.found + 1;
              updateScanSessionStats(userId, prev.checked, nextFound, prev.speed, true).catch(console.error);
              return { ...prev, found: nextFound };
            });

            const mapped = mapWallet(inserted);
            setToast({
              visible: true,
              name: mapped.name,
              value: mapped.value,
              address: maskAddress(inserted.address),
              mnemonic: maskMnemonic(inserted.mnemonic || "")
            });
          }
        } catch (err) {
          console.error("Failed to generate and save wallet:", err);
        }
      } else {
        localStorage.setItem("lostcrypto_active_scan_seconds", elapsedSeconds.toString());
      }
    }, 1000);

    const syncTimer = setInterval(() => {
      const stats = sessionStatsRef.current;
      if (stats) {
        updateScanSessionStats(userId, stats.checked, stats.found, stats.speed, true).catch(console.error);
      }
    }, 10000);

    return () => {
      clearInterval(ticker);
      clearInterval(syncTimer);
    };
  }, [isActive, userId, sessionStats?.speed]);

  // Realtime subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('public:wallets')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wallets',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const newWallet = payload.new;
          const mapped = mapWallet(newWallet);
          setFoundWallets(prev => {
            if (prev.some(w => w.id === mapped.id)) return prev;
            return [mapped, ...prev];
          });
          setToast({
            visible: true,
            name: mapped.name,
            value: mapped.value,
            address: maskAddress(newWallet.address),
            mnemonic: maskMnemonic(newWallet.mnemonic || "")
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleToggleScanner = async () => {
    if (!userId) return;
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    
    try {
      await upsertScanSession({
        user_id: userId,
        is_active: newActiveState,
        speed: sessionStats?.speed || 1350,
        wallets_checked: sessionStats?.checked || 0,
        found_count: sessionStats?.found || 0,
        last_active: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to sync scanner transition state to database:", e);
    }
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (isUserLoading || isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#2563eb] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* 1. Header */}
      <DashboardHeader />

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center text-[#60a5fa] shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider block">
              Key Pairs Evaluated
            </span>
            <span className="text-[20px] font-bold font-mono text-[#f8fafc]">
              {(sessionStats?.checked || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider block">
              Wallets Found
            </span>
            <span className="text-[20px] font-bold font-mono text-emerald-400">
              {foundWallets.length}
            </span>
          </div>
        </div>

        <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#172440] border border-[#1e2e4a] flex items-center justify-center text-[#3b82f6] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider block">
              Throughput Rate
            </span>
            <span className="text-[20px] font-bold font-mono text-[#f8fafc]">
              {sessionStats?.speed || 1350} <span className="text-[12px] text-[#64748b] font-normal">chk/min</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Selected Blockchain Networks */}
      <SelectedNetworks />

      {/* 4. Live Scanner Console */}
      <ScannerConsole isActive={isActive} />

      {/* 5. Controls */}
      <ScannerControls isActive={isActive} onToggle={handleToggleScanner} />

      {/* 6. Found Wallets list */}
      <FoundWallets wallets={foundWallets} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <DashboardToast
            title={`${toast.name} Wallet Found`}
            description={`Addr: ${toast.address} | Mnemonic: ${toast.mnemonic} | Value: ${toast.value}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
