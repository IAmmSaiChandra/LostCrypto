import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase/client";
import { insertUserChains } from "@/src/lib/supabase/userChains";

export function useBlockchainSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [allowedIds, setAllowedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load allowed chains from the user's activation key
  useEffect(() => {
    async function loadAllowedChains() {
      const userId = localStorage.getItem("lostcrypto_user_id");
      if (!userId) return;

      try {
        // Get the user's activation key code from their profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("activation_key")
          .eq("user_id", userId)
          .maybeSingle();

        if (profile?.activation_key) {
          // Get the allowed_chains from the activation_keys table
          const { data: keyData } = await supabase
            .from("activation_keys")
            .select("allowed_chains")
            .eq("key_code", profile.activation_key)
            .maybeSingle();

          if (keyData?.allowed_chains && keyData.allowed_chains.length > 0) {
            // Convert to lowercase IDs to match NETWORKS config
            setAllowedIds(keyData.allowed_chains.map((c: string) => c.toLowerCase()));
            return;
          }
        }
      } catch (e) {
        console.error("Failed to load allowed chains:", e);
      }

      // Fallback: allow all chains
      setAllowedIds(["btc", "eth", "bnb", "sol", "usdt", "trx", "doge"]);
    }

    loadAllowedChains();
  }, []);

  const toggleSelection = (id: string) => {
    // Only allow toggling chains that are in the allowed list
    if (!allowedIds.includes(id)) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selectedIds.length === 0) return;
    setIsSubmitting(true);
    
    try {
      const userId = localStorage.getItem("lostcrypto_user_id");
      if (userId) {
        await insertUserChains(userId, selectedIds);
      }
    } catch (e) {
      console.error(e);
    }
    
    setIsSubmitting(false);

    // Save selection to localStorage and redirect to dashboard
    localStorage.setItem("selected-blockchains", JSON.stringify(selectedIds));
    window.location.href = "/dashboard";
  };

  const handleSkip = () => {
    window.location.href = "/dashboard";
  };

  return {
    selectedIds,
    allowedIds,
    isSubmitting,
    toggleSelection,
    handleContinue,
    handleSkip,
  };
}
