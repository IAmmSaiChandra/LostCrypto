import { NextResponse } from "next/server";

// In-memory mock counter that increments over time
let speed = 3245;
let scannedToday = 12845932;
let foundCount = 184;

export async function GET() {
  // Simulate speed drift and increment scanned wallets
  const speedDrift = Math.floor(Math.random() * 200) - 100;
  speed = Math.max(2800, Math.min(3800, speed + speedDrift));
  
  // Scanned increment (speed * 2.5 seconds)
  scannedToday += Math.floor(speed * 2.5);

  // 10% chance to find a new wallet on polling tick
  let newWalletFound = null;
  if (Math.random() < 0.1) {
    foundCount += 1;
    const networks = [
      { name: "Bitcoin", ticker: "BTC", value: "$18,400", logo: "/blockchains/btc.svg" },
      { name: "Ethereum", ticker: "ETH", value: "$6,800", logo: "/blockchains/eth.svg" },
      { name: "Solana", ticker: "SOL", value: "$2,200", logo: "/blockchains/sol.svg" }
    ];
    newWalletFound = networks[Math.floor(Math.random() * networks.length)];
  }

  const logs = [
    "Scanning BTC Address segment...",
    "Checking ETH block hashes...",
    "Validating BNB Chain contract...",
    "Scanning SOL account index...",
    "Checking TRX ledger records...",
    "Analyzing DOGE wallet signature...",
    "Broadcasting scan checks..."
  ];
  const randomLog = logs[Math.floor(Math.random() * logs.length)];

  return NextResponse.json({
    speed,
    scannedToday,
    foundCount,
    newWalletFound,
    randomLog,
  });
}
