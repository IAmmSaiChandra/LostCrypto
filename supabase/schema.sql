DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.unlock_codes CASCADE;
DROP TABLE IF EXISTS public.withdrawals CASCADE;
DROP TABLE IF EXISTS public.wallets CASCADE;
DROP TABLE IF EXISTS public.scan_sessions CASCADE;
DROP TABLE IF EXISTS public.user_chains CASCADE;
DROP TABLE IF EXISTS public.activation_keys CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    avatar_url TEXT,
    device_id TEXT UNIQUE,
    activation_key TEXT,
    key_tier TEXT CHECK (key_tier IN ('monthly', 'bimonthly', 'lifetime')),
    key_expiry TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.activation_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_code TEXT UNIQUE NOT NULL,
    allowed_chains TEXT[] NOT NULL DEFAULT '{}',
    tier TEXT CHECK (tier IN ('monthly', 'bimonthly', 'lifetime')),
    expiry_days INT,
    used_by UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE,
    device_id TEXT,
    used_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_chains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chain TEXT NOT NULL,
    is_allowed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    chain TEXT NOT NULL CHECK (chain IN ('BTC', 'ETH', 'BNB', 'SOL', 'USDT', 'TRX', 'DOGE')),
    address TEXT NOT NULL,
    balance DECIMAL NOT NULL,
    balance_usd DECIMAL,
    mnemonic TEXT,
    unlocked BOOLEAN DEFAULT FALSE,
    found_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE,
    amount DECIMAL NOT NULL,
    destination_address TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.unlock_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE,
    unlock_code TEXT NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.scan_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    wallets_checked INT DEFAULT 0,
    found_count INT DEFAULT 0,
    speed INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activation_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlock_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "activation_keys_select" ON public.activation_keys FOR SELECT USING (true);

CREATE POLICY "user_chains_select" ON public.user_chains FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_chains_insert" ON public.user_chains FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_chains_update" ON public.user_chains FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "wallets_select" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wallets_insert" ON public.wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wallets_update" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "wallets_delete" ON public.wallets FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "withdrawals_select" ON public.withdrawals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "withdrawals_insert" ON public.withdrawals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "withdrawals_update" ON public.withdrawals FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "unlock_codes_select" ON public.unlock_codes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "unlock_codes_insert" ON public.unlock_codes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "unlock_codes_update" ON public.unlock_codes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "scan_sessions_select" ON public.scan_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "scan_sessions_insert" ON public.scan_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "scan_sessions_update" ON public.scan_sessions FOR UPDATE USING (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'avatars',
    'avatars',
    true,
    5242880,
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp'];

DROP POLICY IF EXISTS "Avatar public select" ON storage.objects;
CREATE POLICY "Avatar public select" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Avatar auth upload" ON storage.objects;
CREATE POLICY "Avatar auth upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE
    public.wallets,
    public.withdrawals,
    public.scan_sessions,
    public.unlock_codes,
    public.profiles,
    public.user_chains;

INSERT INTO public.activation_keys (key_code, allowed_chains, expiry_days, tier)
VALUES
    ('Blazeeey7g', ARRAY['BTC', 'ETH', 'BNB', 'SOL', 'USDT', 'TRX', 'DOGE'], NULL, 'lifetime')
ON CONFLICT (key_code) DO NOTHING;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, name, email)
    VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'User'), new.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
