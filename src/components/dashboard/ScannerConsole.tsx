"use client";

import React, { useEffect, useRef, useState } from "react";
import { wordlist } from "@/src/lib/constants/wordlist";
import { Terminal, Clock, Activity } from "lucide-react";

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

  // Format running time (HH:MM:SS)
  const formatTime = (totalSecs: number): string => {
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, "0");
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, "0");
    const secs = (totalSecs % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col h-[380px] relative overflow-hidden">
      
      {/* Console Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2e4a] bg-[#0d1424] shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-4 h-4 text-[#3b82f6]" />
          <span className="text-[13px] font-mono font-bold text-[#f8fafc] uppercase tracking-wider">
            Live Mnemonic Entropy Stream
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#94a3b8]">
            <Clock className="w-3.5 h-3.5 text-[#64748b]" />
            <span>{formatTime(secondsRunning)}</span>
          </div>

          {isActive ? (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE SCAN</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-[#172440] border border-[#1e2e4a] px-2.5 py-0.5 rounded text-[11px] font-mono font-bold text-[#94a3b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]" />
              <span>STANDBY</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal logs list */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto font-mono text-[12.5px] p-5 space-y-1.5 scrollbar-none bg-[#090d16] ${
          isActive ? "opacity-100" : "opacity-45"
        }`}
      >
        {logs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#64748b] select-none font-mono text-center">
            <Activity className="w-8 h-8 text-[#1e2e4a] mb-2" />
            <p>{isActive ? "Initializing cryptographic worker threads..." : "Scanner offline. Press 'Start Scanning' below to initiate."}</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="whitespace-nowrap overflow-hidden select-all flex gap-2 leading-tight">
              <span className="text-[#3b82f6] select-none font-bold">›</span>
              {log.words.map((word, wIdx) => (
                <span 
                  key={wIdx} 
                  className={`inline-block transition-colors ${
                    wIdx === 0
                      ? "text-[#60a5fa] font-semibold"
                      : wIdx < 4
                      ? "text-[#f8fafc]"
                      : wIdx < 8
                      ? "text-[#94a3b8]"
                      : "text-[#64748b]"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Top scanline indicator */}
      {isActive && (
        <div className="absolute top-11 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent pointer-events-none opacity-60" />
      )}
    </div>
  );
}
