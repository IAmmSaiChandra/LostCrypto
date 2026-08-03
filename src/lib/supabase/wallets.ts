import { supabase } from "./client";

export interface Wallet {
  id?: string;
  user_id: string | null;
  chain: string;
  address: string;
  balance: number;
  balance_usd?: number | null;
  mnemonic?: string | null;
  unlocked?: boolean | null;
  found_at?: string | null;
}

export async function insertWallet(wallet: Wallet) {
  const { data, error } = await supabase
    .from("wallets")
    .insert([wallet])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWalletsByUser(userId: string) {
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .order("found_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getWalletById(id: string) {
  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateWalletUnlock(id: string, unlocked: boolean) {
  const { data, error } = await supabase
    .from("wallets")
    .update({ unlocked })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
