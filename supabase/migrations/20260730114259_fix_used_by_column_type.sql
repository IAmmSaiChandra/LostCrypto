-- Fix: Change used_by on activation_keys from UUID to TEXT
-- so it can accept our client-side session UUIDs stored as text
ALTER TABLE public.activation_keys DROP CONSTRAINT IF EXISTS activation_keys_used_by_key;
ALTER TABLE public.activation_keys ALTER COLUMN used_by TYPE TEXT USING used_by::TEXT;

-- Fix: Change user_id on profiles from UUID to TEXT  
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_unique;
ALTER TABLE public.profiles ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- Fix: Change user_id on all other tables from UUID to TEXT
ALTER TABLE public.user_chains ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.wallets ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.withdrawals ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;
ALTER TABLE public.scan_sessions ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Fix: Add unique constraint on scan_sessions for upsert support
ALTER TABLE public.scan_sessions DROP CONSTRAINT IF EXISTS scan_sessions_user_id_key;
ALTER TABLE public.scan_sessions ADD CONSTRAINT scan_sessions_user_id_key UNIQUE (user_id);

-- Fix: Add unique constraint on user_chains to prevent duplicates
ALTER TABLE public.user_chains DROP CONSTRAINT IF EXISTS user_chains_user_chain_key;
ALTER TABLE public.user_chains ADD CONSTRAINT user_chains_user_chain_key UNIQUE (user_id, chain);

-- Ensure RLS policy for activation_keys allows updates
DROP POLICY IF EXISTS "activation_keys_update" ON public.activation_keys;
CREATE POLICY "activation_keys_update" ON public.activation_keys FOR UPDATE USING (true);
