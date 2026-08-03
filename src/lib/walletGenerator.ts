import { wordlist } from "@/src/lib/constants/wordlist";

interface ChainConfig {
  name: string;
  ticker: string;
  logo: string;
  prefix: string;
  addrLen: number;
  minBal: number;
  maxBal: number;
  priceUsd: number;
  fee: number;
}

export const CHAIN_CONFIGS: Record<string, ChainConfig> = {
  BTC: { name: "Bitcoin", ticker: "BTC", logo: "/blockchains/btc.svg", prefix: "bc1q", addrLen: 42, minBal: 0.0005, maxBal: 1.2, priceUsd: 67500, fee: 0.00012 },
  ETH: { name: "Ethereum", ticker: "ETH", logo: "/blockchains/eth.svg", prefix: "0x", addrLen: 42, minBal: 0.005, maxBal: 3.5, priceUsd: 3450, fee: 0.0035 },
  BNB: { name: "BNB Chain", ticker: "BNB", logo: "/blockchains/bnb.svg", prefix: "0x", addrLen: 42, minBal: 0.01, maxBal: 8.0, priceUsd: 610, fee: 0.0005 },
  SOL: { name: "Solana", ticker: "SOL", logo: "/blockchains/sol.svg", prefix: "", addrLen: 44, minBal: 0.1, maxBal: 25.0, priceUsd: 178, fee: 0.00005 },
  USDT: { name: "Tether", ticker: "USDT", logo: "/blockchains/usdt.svg", prefix: "T", addrLen: 34, minBal: 50, maxBal: 5000, priceUsd: 1, fee: 1.0 },
  TRX: { name: "TRON", ticker: "TRX", logo: "/blockchains/trx.svg", prefix: "T", addrLen: 34, minBal: 100, maxBal: 50000, priceUsd: 0.12, fee: 1.0 },
  DOGE: { name: "Dogecoin", ticker: "DOGE", logo: "/blockchains/doge.svg", prefix: "D", addrLen: 34, minBal: 50, maxBal: 25000, priceUsd: 0.15, fee: 2.0 }
};

export const MOCK_TEST = [
  // BTC — 15 wallets
  { chain: "BTC", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.812, mnemonic: "abandon ability able about above absent absorb abstract absurd abuse access accident" },
  { chain: "BTC", address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", balance: 0.123, mnemonic: "arrest arrive arrow art artefact artist artwork ask aspect assault asset assist" },
  { chain: "BTC", address: "1CK6KHY6MHgYvmWM4PF7H7Z1YVYwB4wQnW", balance: 0.456, mnemonic: "bleak bless blind blood blossom blouse blue blur blush board boat" },
  { chain: "BTC", address: "1D2P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 1.234, mnemonic: "body boil bomb bone bonus book boost border bore borrow boss" },
  { chain: "BTC", address: "1E3P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.567, mnemonic: "bottle bottom bounce box boy bracket brain brand brass brave bread" },
  { chain: "BTC", address: "1F4P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 2.345, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "BTC", address: "1G5P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.789, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "BTC", address: "1H6P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 3.456, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },
  { chain: "BTC", address: "1I7P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.901, mnemonic: "camera camp canal cancel cannon canvas canyon capable capital captain car" },
  { chain: "BTC", address: "1J8P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 4.567, mnemonic: "carbon card cargo carry cart case cash castle casual cat catalog" },
  { chain: "BTC", address: "1K9P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.234, mnemonic: "catch category cattle caught cause cave ceiling celery cement census century" },
  { chain: "BTC", address: "1L0P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 5.678, mnemonic: "ceramic cereal certain chain chair chalk champion change chaos chapter charge" },
  { chain: "BTC", address: "1M1P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.345, mnemonic: "chase chat cheap check cheese chef cherry chest chicken chief child" },
  { chain: "BTC", address: "1N2P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 6.789, mnemonic: "chimney choice choose chronic chunk churn cigar cinema circle citizen city" },
  { chain: "BTC", address: "1O3P1eP5QGefi2DMPTfTL5SLmv7DivfNa", balance: 0.456, mnemonic: "civic civil claim clap clarify claw clay clean clear clerk clever" },

  // ETH — 15 wallets
  { chain: "ETH", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f70b3d", balance: 2.45, mnemonic: "across act action actor actress actual adapt add addict address adjust admit" },
  { chain: "ETH", address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", balance: 5.67, mnemonic: "assume asthma athlete atom attack attend attitude attract auction audit august" },
  { chain: "ETH", address: "0x8B6eF9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6", balance: 3.21, mnemonic: "body boil bomb bone bonus book boost border bore borrow boss" },
  { chain: "ETH", address: "0xC4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3", balance: 8.9, mnemonic: "aunt author auto autumn average avocado avoid awake aware away awesome" },
  { chain: "ETH", address: "0xD5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4", balance: 1.23, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "ETH", address: "0xE6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5", balance: 4.56, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },
  { chain: "ETH", address: "0xF7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6", balance: 7.89, mnemonic: "camera camp canal cancel cannon canvas canyon capable capital captain car" },
  { chain: "ETH", address: "0x8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B", balance: 0.12, mnemonic: "carbon card cargo carry cart case cash castle casual cat catalog" },
  { chain: "ETH", address: "0x9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C", balance: 6.54, mnemonic: "catch category cattle caught cause cave ceiling celery cement census century" },
  { chain: "ETH", address: "0x0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D", balance: 2.34, mnemonic: "ceramic cereal certain chain chair chalk champion change chaos chapter charge" },
  { chain: "ETH", address: "0x1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E", balance: 9.01, mnemonic: "chase chat cheap check cheese chef cherry chest chicken chief child" },
  { chain: "ETH", address: "0x2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F", balance: 3.45, mnemonic: "chimney choice choose chronic chunk churn cigar cinema circle citizen city" },
  { chain: "ETH", address: "0x3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A", balance: 7.12, mnemonic: "civic civil claim clap clarify claw clay clean clear clerk clever" },
  { chain: "ETH", address: "0x4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B", balance: 0.78, mnemonic: "click client cliff climb clinic clip clock clog close cloth cloud" },

  // BNB — 10 wallets
  { chain: "BNB", address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C9366d6E", balance: 12.5, mnemonic: "adult advance advice aerobic affair afford afraid africa africa after again age" },
  { chain: "BNB", address: "0x9E64bC7Ef1C9f0E1c2D3A4b5C6D7E8F9A0B1C2D3", balance: 8.9, mnemonic: "aunt author auto autumn average avocado avoid awake aware away awesome" },
  { chain: "BNB", address: "0x8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7", balance: 15.3, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "BNB", address: "0x0F1E2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A6", balance: 22.7, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "BNB", address: "0x1E2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A65", balance: 5.4, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },
  { chain: "BNB", address: "0x2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F", balance: 18.6, mnemonic: "camera camp canal cancel cannon canvas canyon capable capital captain car" },
  { chain: "BNB", address: "0x3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E", balance: 9.2, mnemonic: "carbon card cargo carry cart case cash castle casual cat catalog" },
  { chain: "BNB", address: "0x4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D", balance: 11.8, mnemonic: "catch category cattle caught cause cave ceiling celery cement census century" },
  { chain: "BNB", address: "0x5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D1C", balance: 3.1, mnemonic: "ceramic cereal certain chain chair chalk champion change chaos chapter charge" },
  { chain: "BNB", address: "0x6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D1C0B", balance: 14.5, mnemonic: "chase chat cheap check cheese chef cherry chest chicken chief child" },

  // SOL — 10 wallets
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hJ", balance: 345.2, mnemonic: "agent agree ahead aim air airport aisle alarm album alcohol alert alien" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hK", balance: 789.1, mnemonic: "awful awkward axis baby bachelor bacon badge bag balance balcony ball" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hL", balance: 234.5, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hM", balance: 567.8, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hN", balance: 123.4, mnemonic: "camera camp canal cancel cannon canvas canyon capable capital captain car" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hO", balance: 456.7, mnemonic: "carbon card cargo carry cart case cash castle casual cat catalog" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hP", balance: 678.9, mnemonic: "catch category cattle caught cause cave ceiling celery cement census century" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hQ", balance: 901.2, mnemonic: "ceramic cereal certain chain chair chalk champion change chaos chapter charge" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hR", balance: 345.6, mnemonic: "chase chat cheap check cheese chef cherry chest chicken chief child" },
  { chain: "SOL", address: "7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hS", balance: 234.7, mnemonic: "chimney choice choose chronic chunk churn cigar cinema circle citizen city" },

  // DOGE — 6 wallets
  { chain: "DOGE", address: "D5s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 12845, mnemonic: "all alley allow almost alone alpha already also alter always amateur amazing" },
  { chain: "DOGE", address: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L", balance: 56789, mnemonic: "bamboo banana banner bar barely bargain barrel base basic basket battle" },
  { chain: "DOGE", address: "D7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 23456, mnemonic: "bottle bottom bounce box boy bracket brain brand brass brave bread" },
  { chain: "DOGE", address: "D8xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 78901, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "DOGE", address: "D9xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 34567, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "DOGE", address: "D0xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 67890, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },

  // TRX — 6 wallets
  { chain: "TRX", address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKLXM66", balance: 5620, mnemonic: "among amount amused analyst anchor ancient anger angle angry animal ankle announce" },
  { chain: "TRX", address: "TJbT3GvQF1P1gFwCNVbP3nVXn8DqC7vUuZ", balance: 12345, mnemonic: "beach bean beauty because become beef before begin behave behind believe" },
  { chain: "TRX", address: "T5s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 7890, mnemonic: "bottle bottom bounce box boy bracket brain brand brass brave bread" },
  { chain: "TRX", address: "T6s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 23456, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "TRX", address: "T7s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 34567, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "TRX", address: "T8s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h", balance: 45678, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" },

  // USDT — 6 wallets
  { chain: "USDT", address: "0x4f3aC7E9b2cD1e5F8a9d0b1c2D3e4F5a6B7c8D9e", balance: 12450, mnemonic: "annual another answer antenna antique anxiety any apart apology appear apple approve" },
  { chain: "USDT", address: "0x8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7", balance: 9876, mnemonic: "below belt bench benefit best betray better between beyond bicycle bid" },
  { chain: "USDT", address: "0x9F0E1D2C3B4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C", balance: 45678, mnemonic: "bottle bottom bounce box boy bracket brain brand brass brave bread" },
  { chain: "USDT", address: "0x0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E", balance: 23456, mnemonic: "breeze brick bridge brief bright bring brisk broken brother brown brush" },
  { chain: "USDT", address: "0x1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0", balance: 34567, mnemonic: "budget buffalo build bulb bulk bullet bundle bunker burden bury bus" },
  { chain: "USDT", address: "0x2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1", balance: 56789, mnemonic: "busy but butter buyer buzz cabin cactus cage cake call calm" }
];

function randomHex(length: number): string {
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function randomBase58(length: number): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateAddress(chain: string): string {
  const config = CHAIN_CONFIGS[chain];
  if (!config) return "0x" + randomHex(40);

  if (chain === "SOL") return randomBase58(config.addrLen);
  if (chain === "BTC") return config.prefix + randomHex(config.addrLen - config.prefix.length);
  if (chain === "USDT" || chain === "TRX") return config.prefix + randomBase58(config.addrLen - 1);
  return config.prefix + randomHex(config.addrLen - 2);
}

function generateMnemonic(): string {
  const words: string[] = [];
  for (let i = 0; i < 12; i++) {
    words.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
  }
  return words.join(" ");
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function generateRandomWallet(chain: string, userId: string) {
  const config = CHAIN_CONFIGS[chain];
  if (!config) throw new Error(`Unknown chain: ${chain}`);

  const chainMocks = MOCK_TEST.filter(w => w.chain === chain);
  if (chainMocks.length > 0) {
    const selectedMock = chainMocks[Math.floor(Math.random() * chainMocks.length)];
    const balance = selectedMock.balance;
    const balanceUsd = parseFloat((balance * config.priceUsd).toFixed(2));
    return {
      user_id: userId,
      chain: chain as any,
      address: selectedMock.address,
      balance,
      balance_usd: balanceUsd,
      mnemonic: selectedMock.mnemonic,
      unlocked: false,
    };
  }

  const balance = parseFloat(randomInRange(config.minBal, config.maxBal).toFixed(6));
  const balanceUsd = parseFloat((balance * config.priceUsd).toFixed(2));

  return {
    user_id: userId,
    chain: chain as "BTC" | "ETH" | "BNB" | "SOL" | "USDT" | "TRX" | "DOGE",
    address: generateAddress(chain),
    balance,
    balance_usd: balanceUsd,
    mnemonic: generateMnemonic(),
    unlocked: false,
  };
}

export function formatWalletValue(balanceUsd: number): string {
  return `$${balanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function shortenAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
