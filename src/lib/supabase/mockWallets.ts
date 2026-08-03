import { supabase } from "./client";

const supabaseClient = supabase as any;

export interface MockWallet {
  id: string;
  chain: string;
  address: string;
  balance: number;
  mnemonic: string;
  found: boolean;
  found_by_user_id?: string | null;
  found_at?: string | null;
}

// Fetch available (unfound) mock wallets for the user's allowed chains
export async function getAvailableMockWallet(allowedChains: string[]): Promise<MockWallet | null> {
  const { data, error } = await supabaseClient
    .from("mock_wallets")
    .select("*")
    .eq("found", false)
    .in("chain", allowedChains);

  if (error) {
    console.error("Error fetching mock wallets:", error);
    return null;
  }

  if (!data || data.length === 0) {
    // Fallback: If all are found, reset or pick one at random
    const { data: fallbackData } = await supabaseClient
      .from("mock_wallets")
      .select("*")
      .in("chain", allowedChains);
    if (!fallbackData || fallbackData.length === 0) return null;
    return fallbackData[Math.floor(Math.random() * fallbackData.length)];
  }

  // Return a random mock wallet from the available ones
  return data[Math.floor(Math.random() * data.length)];
}

// Mark a mock wallet as found in the database
export async function markMockWalletAsFound(walletId: string, userId: string) {
  const { data, error } = await supabaseClient
    .from("mock_wallets")
    .update({
      found: true,
      found_by_user_id: userId,
      found_at: new Date().toISOString()
    })
    .eq("id", walletId)
    .select()
    .single();

  if (error) {
    console.error("Error marking mock wallet as found:", error);
    return null;
  }
  return data;
}
