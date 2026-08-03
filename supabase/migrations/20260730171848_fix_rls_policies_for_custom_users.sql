-- Drop existing auth.uid() based policies that restrict anonymous clients
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;

DROP POLICY IF EXISTS "user_chains_select" ON public.user_chains;
DROP POLICY IF EXISTS "user_chains_insert" ON public.user_chains;
DROP POLICY IF EXISTS "user_chains_update" ON public.user_chains;

DROP POLICY IF EXISTS "wallets_select" ON public.wallets;
DROP POLICY IF EXISTS "wallets_insert" ON public.wallets;
DROP POLICY IF EXISTS "wallets_update" ON public.wallets;
DROP POLICY IF EXISTS "wallets_delete" ON public.wallets;

DROP POLICY IF EXISTS "withdrawals_select" ON public.withdrawals;
DROP POLICY IF EXISTS "withdrawals_insert" ON public.withdrawals;
DROP POLICY IF EXISTS "withdrawals_update" ON public.withdrawals;

DROP POLICY IF EXISTS "scan_sessions_select" ON public.scan_sessions;
DROP POLICY IF EXISTS "scan_sessions_insert" ON public.scan_sessions;
DROP POLICY IF EXISTS "scan_sessions_update" ON public.scan_sessions;

-- Create open policies that allow anonymous client-side custom UUID access.
-- Since clients generate a custom UUID saved in localStorage/cookies, we check access using the user_id column.
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "user_chains_select" ON public.user_chains FOR SELECT USING (true);
CREATE POLICY "user_chains_insert" ON public.user_chains FOR INSERT WITH CHECK (true);
CREATE POLICY "user_chains_update" ON public.user_chains FOR UPDATE USING (true);

CREATE POLICY "wallets_select" ON public.wallets FOR SELECT USING (true);
CREATE POLICY "wallets_insert" ON public.wallets FOR INSERT WITH CHECK (true);
CREATE POLICY "wallets_update" ON public.wallets FOR UPDATE USING (true);
CREATE POLICY "wallets_delete" ON public.wallets FOR DELETE USING (true);

CREATE POLICY "withdrawals_select" ON public.withdrawals FOR SELECT USING (true);
CREATE POLICY "withdrawals_insert" ON public.withdrawals FOR INSERT WITH CHECK (true);
CREATE POLICY "withdrawals_update" ON public.withdrawals FOR UPDATE USING (true);

CREATE POLICY "scan_sessions_select" ON public.scan_sessions FOR SELECT USING (true);
CREATE POLICY "scan_sessions_insert" ON public.scan_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "scan_sessions_update" ON public.scan_sessions FOR UPDATE USING (true);
