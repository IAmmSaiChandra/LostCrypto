import { supabase } from "./client";

export interface ScanSession {
  id?: string;
  user_id: string;
  wallets_checked?: number;
  found_count?: number;
  speed?: number;
  is_active?: boolean;
  started_at?: string;
  last_active?: string;
}

export async function upsertScanSession(session: ScanSession) {
  const { data, error } = await supabase
    .from("scan_sessions")
    .upsert([session], { onConflict: "user_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getScanSessionByUser(userId: string) {
  const { data, error } = await supabase
    .from("scan_sessions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function updateScanSessionStats(
  userId: string,
  walletsChecked: number,
  foundCount: number,
  speed: number,
  isActive: boolean
) {
  const { data, error } = await supabase
    .from("scan_sessions")
    .update({
      wallets_checked: walletsChecked,
      found_count: foundCount,
      speed,
      is_active: isActive,
      last_active: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
