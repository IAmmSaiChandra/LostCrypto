"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DashboardHeader } from "@/src/components/dashboard/DashboardHeader"
import { SelectedNetworks } from "@/src/components/dashboard/SelectedNetworks"
import { ScannerConsole } from "@/src/components/dashboard/ScannerConsole"
import { ScannerControls } from "@/src/components/dashboard/ScannerControls"
import { FoundWallets } from "@/src/components/dashboard/FoundWallets"
import { DashboardToast } from "@/src/components/dashboard/DashboardToast"
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser"
import { getWalletsByUser, insertWallet } from "@/src/lib/supabase/wallets"
import { getScanSessionByUser, upsertScanSession, updateScanSessionStats } from "@/src/lib/supabase/scanSessions"
import { getUserChains } from "@/src/lib/supabase/userChains"
import { generateRandomWallet, CHAIN_CONFIGS, formatWalletValue } from "@/src/lib/walletGenerator"
import { supabase } from "@/src/lib/supabase/client"
import { getAvailableMockWallet, markMockWalletAsFound } from "@/src/lib/supabase/mockWallets"

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
  id: string
  name: string
  ticker: string
  logo: string
  address: string
  value: string
  status: string
}

export default function DashboardPage() {
  const { userId, isLoading: isUserLoading } = useSupabaseUser()
  const [isActive, setIsActive] = useState(false)
  const [foundWallets, setFoundWallets] = useState<FoundWallet[]>([])
  const [sessionStats, setSessionStats] = useState<{ checked: number; found: number; speed: number } | null>(null)
  const [toast, setToast] = useState<{ visible: boolean; name: string; value: string; address: string; mnemonic: string }>(
    { visible: false, name: "", value: "", address: "", mnemonic: "" }
  )
  const [isLoading, setIsLoading] = useState(true)

  // Map Supabase wallet to FoundWallet format
  const mapWallet = (wallet: any): FoundWallet => {
    const config = CHAIN_CONFIGS[wallet.chain as keyof typeof CHAIN_CONFIGS] || CHAIN_CONFIGS.BTC
    return {
      id: wallet.id,
      name: config.name,
      ticker: config.ticker,
      logo: config.logo,
      address: wallet.address,
      value: formatWalletValue(wallet.balance_usd || 0),
      status: "Verified"
    }
  }

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
          : ["BTC", "ETH", "SOL"]; // Fallback
        
        let finalChecked = session ? (session.wallets_checked || 0) : 0;
        let finalFound = session ? (session.found_count || 0) : 0;
        const speed = session ? (session.speed || 1350) : 1350;

        if (session && session.is_active && session.last_active) {
          const lastActiveTime = new Date(session.last_active).getTime();
          const elapsedSeconds = Math.floor((Date.now() - lastActiveTime) / 1000);
          
          if (elapsedSeconds > 0) {
            // Checked count increments: session.speed is checked per min, so convert to check per sec
            const additionalChecked = elapsedSeconds * Math.floor(speed / 60);
            finalChecked += additionalChecked;

            // Find wallets for offline background duration (1 hour / 3600s intervals)
            const walletsToFind = Math.floor(elapsedSeconds / 3600);
            const remainderSeconds = elapsedSeconds % 3600;
            
            // Set remainder active scan seconds in localStorage
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
            // Update stats in Supabase database
            await updateScanSessionStats(userId, finalChecked, finalFound, speed, true);
          }
        }
        
        // Fetch fresh wallets list after potential offline catchup inserts
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

  // Keep a reference to the latest stats to avoid closure staleness in intervals
  const sessionStatsRef = useRef(sessionStats);
  useEffect(() => {
    sessionStatsRef.current = sessionStats;
  }, [sessionStats]);

  // Unified active scanning loop (handles visual ticks, elapsed time tracker, and 5-min wallet discovery)
  useEffect(() => {
    if (!isActive || !userId) return;

    // 1-second tick loop
    const ticker = setInterval(async () => {
      // 1. Tick local checked stats visually
      setSessionStats(prev => {
        if (!prev) return null;
        return {
          ...prev,
          checked: prev.checked + Math.floor(prev.speed + (Math.random() * 80 - 40))
        };
      });

      // 2. Increment active scanning time tracker in localStorage
      let elapsedSeconds = parseInt(localStorage.getItem("lostcrypto_active_scan_seconds") || "0");
      elapsedSeconds += 1;

      // Determine or get dynamic target interval (exactly 1 hour: 3600 seconds)
      let targetSeconds = parseInt(localStorage.getItem("lostcrypto_target_scan_seconds") || "0");
      if (targetSeconds !== 3600) {
        targetSeconds = 3600;
        localStorage.setItem("lostcrypto_target_scan_seconds", targetSeconds.toString());
      }

      // 3. Trigger wallet discovery
      if (elapsedSeconds >= targetSeconds) {
        localStorage.setItem("lostcrypto_active_scan_seconds", "0");
        // Set target interval for next discovery (exactly 1 hour: 3600 seconds)
        const nextTarget = 3600;
        localStorage.setItem("lostcrypto_target_scan_seconds", nextTarget.toString());
        try {
          const userChains = await getUserChains(userId);
          const allowedChains = userChains && userChains.length > 0 
            ? userChains.map(c => c.chain)
            : ["BTC", "ETH", "SOL"]; // Fallback
          
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
              // Sync stats to DB instantly on discovery
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

    // Periodically sync stats to Supabase every 10 seconds to reduce database write overhead
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

  // Supabase Realtime Subscription for new wallets
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

  // Handle start/stop transition toggle and sync is_active to database session
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

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.visible])

  if (isUserLoading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 selection:bg-black selection:text-white">
      
      {/* 1. Header */}
      <DashboardHeader />

      {/* 2. Selected Blockchain Networks */}
      <SelectedNetworks />

      {/* 3. Live Scanner Console */}
      <ScannerConsole isActive={isActive} />

      {/* 4. Controls */}
      <ScannerControls isActive={isActive} onToggle={handleToggleScanner} />

      {/* 5. Found Wallets list */}
      <FoundWallets wallets={foundWallets} />

      {/* Dynamic Toast Success overlay */}
      <AnimatePresence>
        {toast.visible && (
          <DashboardToast
            title={`${toast.name} Wallet Found`}
            description={`Addr: ${toast.address} | Mnemonic: ${toast.mnemonic} | Value: ${toast.value}`}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
