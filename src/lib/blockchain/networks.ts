export interface BlockchainNetwork {
  id: string;
  name: string;
  symbol: string;
  type: string;
  logoColor: string;
  logoUrl: string;
}

export const NETWORKS: BlockchainNetwork[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    type: "Layer 1",
    logoColor: "#F7931A",
    logoUrl: "/blockchains/btc.svg",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    type: "Layer 1",
    logoColor: "#627EEA",
    logoUrl: "/blockchains/eth.svg",
  },
  {
    id: "bnb",
    name: "BNB Smart Chain",
    symbol: "BNB",
    type: "Layer 1",
    logoColor: "#F3BA2F",
    logoUrl: "/blockchains/bnb.svg",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    type: "Layer 1",
    logoColor: "#14F195",
    logoUrl: "/blockchains/sol.svg",
  },
  {
    id: "trx",
    name: "TRON",
    symbol: "TRX",
    type: "Layer 1",
    logoColor: "#FF000F",
    logoUrl: "/blockchains/trx.svg",
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE",
    type: "Layer 1",
    logoColor: "#C2A633",
    logoUrl: "/blockchains/doge.svg",
  },
  {
    id: "avax",
    name: "Avalanche",
    symbol: "AVAX",
    type: "Layer 1",
    logoColor: "#E84142",
    logoUrl: "/blockchains/avax.svg",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    type: "Stablecoin",
    logoColor: "#26A17B",
    logoUrl: "/blockchains/usdt.svg",
  },
];
