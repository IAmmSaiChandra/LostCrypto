"use client";

import React, { useEffect, useRef, useState } from "react";
import { wordlist } from "@/src/lib/constants/wordlist";

interface ScannerConsoleProps {
  isActive: boolean;
}

// Generates 12 random words array from full BIP39 list
function generateMnemonicWords(): string[] {
  const arr: string[] = [];
  for (let i = 0; i < 12; i++) {
    arr.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
  }
  return arr;
}

interface LogEntry {
  id: string;
  words: string[];
}

export function ScannerConsole({ isActive }: ScannerConsoleProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [secondsRunning, setSecondsRunning] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastFlushTime = useRef<number>(0);

  // High performance batch accumulator for console mnemonic lines
  useEffect(() => {
    if (!isActive) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }

    const run = (timestamp: number) => {
      if (!lastFlushTime.current) lastFlushTime.current = timestamp;
      
      const elapsed = timestamp - lastFlushTime.current;
      
      // Flush updates every frame (16.6ms) with a batch of 5 items
      if (elapsed >= 16.6) {
        const batchSize = 5;
        const newEntries: LogEntry[] = [];
        for (let i = 0; i < batchSize; i++) {
          newEntries.push({
            id: Math.random().toString(),
            words: generateMnemonicWords(),
          });
        }

        setLogs((prev) => {
          const combined = [...prev, ...newEntries];
          return combined.length > 40 ? combined.slice(combined.length - 40) : combined;
        });

        lastFlushTime.current = timestamp;
      }

      rafId.current = requestAnimationFrame(run);
    };

    rafId.current = requestAnimationFrame(run);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isActive]);

  // Running timer increments every second while active
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsRunning((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Keep logs container scrolled down automatically
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  // Calculate dynamic opacity matching the gradual fade curve
  const getWordOpacityClass = (index: number): string => {
    if (index < 5) return "opacity-100";
    if (index === 5) return "opacity-80";
    if (index === 6) return "opacity-65";
    if (index === 7) return "opacity-50";
    if (index === 8) return "opacity-35";
    if (index === 9) return "opacity-25";
    return "opacity-20";
  };

  // Format running time (HH:MM:SS)
  const formatTime = (totalSecs: number): string => {
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, "0");
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="w-full bg-white rounded-[28px] border border-[#E5E7EB] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col h-[400px] relative overflow-hidden transition-opacity duration-300">
      
      {/* Console Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F1F1] z-10 shrink-0 select-none">
        <div className="flex flex-col text-left">
          <span className="text-[13px] font-bold text-black uppercase tracking-wider">
            Live Mnemonic Generator
          </span>
          <span className="text-[11px] text-[#6B7280] font-bold font-mono mt-0.5">
            Running: {formatTime(secondsRunning)}
          </span>
        </div>
        
        {/* Animated scanning status badge */}
        <div className="flex items-center gap-2">
          {isActive ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                ACTIVE
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/50 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                PAUSED
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal logs list */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto font-mono text-[12px] py-4 pr-2 space-y-1.5 scrollbar-none transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-50"
        }`}
      >
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#9CA3AF] select-none font-semibold">
            {isActive ? "Starting generator..." : "Scanner offline. Press Start Scanning below."}
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="whitespace-nowrap overflow-hidden select-all flex gap-1.5 py-0.5 leading-none">
              {log.words.map((word, wIdx) => (
                <span 
                  key={wIdx} 
                  className={`inline-block text-black font-medium transition-opacity duration-300 ${getWordOpacityClass(wIdx)}`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Center scan line pulse indicator */}
      {isActive && (
        <div className="absolute top-14 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent animate-scan pointer-events-none" />
      )}
    </div>
  );
}
