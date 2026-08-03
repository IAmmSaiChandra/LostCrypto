import { supabase } from "./client";

export interface Profile {
  id?: string;
  user_id: string;
  name?: string;
  email?: string;
  activation_key?: string;
  key_tier?: "monthly" | "bimonthly" | "lifetime";
  key_expiry?: string;
  created_at?: string;
}

export async function createProfile(profile: Profile) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProfileByUser(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
