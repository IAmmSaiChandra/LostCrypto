import { supabase } from "./client";

export async function getActivationKeyByCode(keyCode: string) {
  const { data, error } = await supabase
    .from("activation_keys")
    .select("*")
    .eq("key_code", keyCode)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function markActivationKeyUsed(keyCode: string, userId: string) {
  const { data, error } = await supabase
    .from("activation_keys")
    .update({ used_by: userId, used_at: new Date().toISOString(), device_id: navigator.userAgent })
    .eq("key_code", keyCode)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function validateActivationKey(keyCode: string, userId?: string) {
  const key = await getActivationKeyByCode(keyCode);
  if (!key) {
    return { valid: false, message: "Activation key does not exist." };
  }
  
  if (!key.is_active) {
    return { valid: false, message: "Activation key is no longer active." };
  }

  if ((key as any).max_devices !== null && (key as any).max_devices !== undefined && (key as any).max_devices > 0) {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('activation_key', keyCode);
      
    const isAlreadyActivated = profiles?.some((p: any) => p.user_id === userId);
    if (!isAlreadyActivated) {
      const deviceCount = profiles ? profiles.length : 0;
      if (deviceCount >= (key as any).max_devices) {
        return { valid: false, message: "Activation key has reached its maximum device limit." };
      }
    }
  }

  // Check expiry based on expiry_days from creation date
  if (key.expiry_days && key.created_at) {
    const createdAt = new Date(key.created_at).getTime();
    const expiryMs = key.expiry_days * 24 * 60 * 60 * 1000;
    if (Date.now() > createdAt + expiryMs) {
      return { valid: false, message: "Activation key has expired." };
    }
  }

  return { valid: true, key };
}
