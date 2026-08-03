-- 1. Profiles: Make user_id UNIQUE to allow upserts, and change references from auth.users (since we use custom UUIDs)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- 2. Drop user references from other tables so client-side UUID session works without authenticating via GoTrue auth.users
ALTER TABLE public.user_chains DROP CONSTRAINT IF EXISTS user_chains_user_id_fkey;
ALTER TABLE public.wallets DROP CONSTRAINT IF EXISTS wallets_user_id_fkey;
ALTER TABLE public.withdrawals DROP CONSTRAINT IF EXISTS withdrawals_user_id_fkey;
ALTER TABLE public.unlock_codes DROP CONSTRAINT IF EXISTS unlock_codes_user_id_fkey;
ALTER TABLE public.scan_sessions DROP CONSTRAINT IF EXISTS scan_sessions_user_id_fkey;
ALTER TABLE public.activation_keys DROP CONSTRAINT IF EXISTS activation_keys_used_by_fkey;

-- 3. Adjust RLS policies on profiles to allow reads, inserts and updates for custom user_id sessions
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);

-- 4. Adjust other tables' RLS policies to allow standard select/insert operations using the custom session IDs
DROP POLICY IF EXISTS "user_chains_select" ON public.user_chains;
DROP POLICY IF EXISTS "user_chains_insert" ON public.user_chains;
DROP POLICY IF EXISTS "user_chains_update" ON public.user_chains;

CREATE POLICY "user_chains_select" ON public.user_chains FOR SELECT USING (true);
CREATE POLICY "user_chains_insert" ON public.user_chains FOR INSERT WITH CHECK (true);
CREATE POLICY "user_chains_update" ON public.user_chains FOR UPDATE USING (true);

DROP POLICY IF EXISTS "wallets_select" ON public.wallets;
DROP POLICY IF EXISTS "wallets_insert" ON public.wallets;
DROP POLICY IF EXISTS "wallets_update" ON public.wallets;
DROP POLICY IF EXISTS "wallets_delete" ON public.wallets;

CREATE POLICY "wallets_select" ON public.wallets FOR SELECT USING (true);
CREATE POLICY "wallets_insert" ON public.wallets FOR INSERT WITH CHECK (true);
CREATE POLICY "wallets_update" ON public.wallets FOR UPDATE USING (true);
CREATE POLICY "wallets_delete" ON public.wallets FOR DELETE USING (true);

DROP POLICY IF EXISTS "withdrawals_select" ON public.withdrawals;
DROP POLICY IF EXISTS "withdrawals_insert" ON public.withdrawals;
DROP POLICY IF EXISTS "withdrawals_update" ON public.withdrawals;

CREATE POLICY "withdrawals_select" ON public.withdrawals FOR SELECT USING (true);
CREATE POLICY "withdrawals_insert" ON public.withdrawals FOR INSERT WITH CHECK (true);
CREATE POLICY "withdrawals_update" ON public.withdrawals FOR UPDATE USING (true);

DROP POLICY IF EXISTS "scan_sessions_select" ON public.scan_sessions;
DROP POLICY IF EXISTS "scan_sessions_insert" ON public.scan_sessions;
DROP POLICY IF EXISTS "scan_sessions_update" ON public.scan_sessions;

CREATE POLICY "scan_sessions_select" ON public.scan_sessions FOR SELECT USING (true);
CREATE POLICY "scan_sessions_insert" ON public.scan_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "scan_sessions_update" ON public.scan_sessions FOR UPDATE USING (true);
