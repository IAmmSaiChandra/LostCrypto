import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activationSchema, type ActivationInput } from "@/src/lib/validations/activation";
import { useActivationStore } from "@/src/store/use-activation-store";
import { supabase } from "@/src/lib/supabase/client";

export function useActivation() {
  const { status, errorMessage, setStatus, setErrorMessage, setStep } = useActivationStore();

  const form = useForm<ActivationInput>({
    resolver: zodResolver(activationSchema),
    defaultValues: {
      activationKey: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: ActivationInput) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Get current user from localStorage session identifier
      let userId = localStorage.getItem("lostcrypto_user_id");
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("lostcrypto_user_id", userId);
        
        // Ensure profile exists in DB
        await supabase.from("profiles").upsert(
          [{ user_id: userId, name: "User", email: "" }],
          { onConflict: "user_id" }
        );
      }

      // Query activation key
      const { data: keyData, error: keyError } = await supabase
        .from('activation_keys')
        .select('*')
        .eq('key_code', data.activationKey)
        .eq('is_active', true)
        .maybeSingle();

      if (keyError || !keyData) {
        setStatus("error");
        setErrorMessage("Invalid activation key. Please check your activation key and try again.");
        return;
      }

      // Query profiles currently using this key to check device limits
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('user_id, device_id')
        .eq('activation_key', data.activationKey);

      if (profileError) {
        setStatus("error");
        setErrorMessage("Failed to verify device limits.");
        return;
      }

      const isAlreadyActivated = profiles?.some(p => p.user_id === userId);

      if (!isAlreadyActivated) {
        const deviceCount = profiles ? profiles.length : 0;
        const maxDevices = (keyData as any).max_devices;
        
        // 0 or null means unlimited
        if (maxDevices !== null && maxDevices !== undefined && maxDevices > 0) {
          if (deviceCount >= maxDevices) {
            setStatus("error");
            setErrorMessage("This activation key has reached its maximum device limit.");
            return;
          }
        }
      }

      // If valid: update the key row
      const now = new Date();
      await supabase
        .from('activation_keys')
        .update({
          used_by: userId,
          device_id: navigator.userAgent,
          used_at: now.toISOString(),
        })
        .eq('id', keyData.id);

      // Calculate expiry date
      const expiryDays = keyData.expiry_days || 365;
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryDays);

      // Update the user's profile
      await supabase
        .from('profiles')
        .update({
          activation_key: data.activationKey,
          key_tier: keyData.tier,
          key_expiry: expiryDate.toISOString(),
          device_id: navigator.userAgent,
        })
        .eq('user_id', userId);

      // Keep localStorage and cookie logic
      localStorage.setItem("activation-key", data.activationKey);
      localStorage.setItem("activation-date", now.toISOString());
      document.cookie = `activation-key=${data.activationKey}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
      
      setStatus("success");
      setStep("success");
      
      // Transition to profile setup form after success animations play (2.5 seconds)
      setTimeout(() => {
        setStep("profile");
      }, 2500);
      
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      setErrorMessage(e.message || "An error occurred during activation.");
    }
  };

  return {
    form,
    status,
    errorMessage,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
