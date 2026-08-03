"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/src/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  device_id: string | null;
  activation_key: string | null;
  key_tier: string | null;
  key_expiry: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface UseSupabaseUserReturn {
  user: User | null;
  userId: string | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
}

export function useSupabaseUser(): UseSupabaseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (data && !error) {
        setProfile(data);
      }
    } catch (e) {
      console.error("Failed to fetch profile:", e);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const savedId = localStorage.getItem("lostcrypto_user_id");
    if (savedId) {
      await fetchProfile(savedId);
    }
  }, [fetchProfile]);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        let userId = localStorage.getItem("lostcrypto_user_id");
        if (!userId) {
          userId = crypto.randomUUID();
          localStorage.setItem("lostcrypto_user_id", userId);
        }

        if (mounted) {
          const mockUser = { id: userId, email: "" } as User;
          setUser(mockUser);
          
          // Ensure profile exists in DB
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle();

          if (!existingProfile) {
            await supabase.from("profiles").upsert(
              [{ user_id: userId, name: "User", email: "" }],
              { onConflict: "user_id" }
            );
          }

          await fetchProfile(userId);
        }
      } catch (e) {
        console.error("Auth initialization error:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initAuth();
  }, [fetchProfile]);

  return {
    user,
    userId: user?.id ?? null,
    profile,
    isLoading,
    isAuthenticated: !!user,
    refreshProfile,
  };
}
