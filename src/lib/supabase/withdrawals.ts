import { supabase } from "./client";

export interface Withdrawal {
  id?: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  destination_address: string;
  status?: "pending" | "completed" | "failed";
  created_at?: string;
  processed_at?: string;
}

export async function insertWithdrawal(withdrawal: Withdrawal) {
  const { data, error } = await supabase
    .from("withdrawals")
    .insert([withdrawal])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWithdrawalsByUser(userId: string) {
  const { data, error } = await supabase
    .from("withdrawals")
    .select("*, wallets(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getWithdrawalById(id: string) {
  const { data, error } = await supabase
    .from("withdrawals")
    .select("*, wallets(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateWithdrawalStatus(id: string, status: "pending" | "completed" | "failed", processedAt?: string) {
  const updateData: Partial<Withdrawal> = { status };
  if (processedAt) {
    updateData.processed_at = processedAt;
  }

  const { data, error } = await supabase
    .from("withdrawals")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
