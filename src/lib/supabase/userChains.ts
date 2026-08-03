import { supabase } from "./client";

export interface UserChain {
  id?: string;
  user_id: string | null;
  chain: string;
  is_allowed?: boolean | null;
  created_at?: string | null;
}

export async function getUserChains(userId: string): Promise<UserChain[]> {
  const { data, error } = await supabase
    .from("user_chains")
    .select("*")
    .eq("user_id", userId)
    .eq("is_allowed", true)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function insertUserChains(userId: string, chains: string[]): Promise<UserChain[]> {
  const records = chains.map((chain) => ({
    user_id: userId,
    chain: chain.toUpperCase(),
    is_allowed: true,
  }));

  const { data, error } = await supabase
    .from("user_chains")
    .insert(records)
    .select();

  if (error) throw error;
  return data || [];
}

export async function deleteUserChains(userId: string): Promise<void> {
  const { error } = await supabase
    .from("user_chains")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}
