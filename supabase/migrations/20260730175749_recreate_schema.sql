-- Recreate schema clean without auth.users/auth.uid() dependencies.
-- All user identifiers are TEXT type.

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL,
    name TEXT DEFAULT 'User',
    email TEXT DEFAULT '',
    avatar_url TEXT,
    device_id TEXT,
    activation_key TEXT,
    key_tier TEXT,
    key_expiry TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.activation_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key_code TEXT UNIQUE NOT NULL,
    allowed_chains TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    tier TEXT NOT NULL DEFAULT 'monthly',
    expiry_days INT NOT NULL DEFAULT 30,
    used_by TEXT,
    device_id TEXT,
    used_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.user_chains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    chain TEXT NOT NULL,
    is_allowed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT user_chains_user_chain_key UNIQUE (user_id, chain)
);

CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    address TEXT NOT NULL,
    private_key TEXT NOT NULL,
    chain TEXT NOT NULL,
    balance_usd NUMERIC(20, 2) DEFAULT 0.00,
    mnemonic TEXT,
    found_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.withdrawals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE,
    amount NUMERIC(20, 2) NOT NULL,
    destination_address TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE public.scan_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT UNIQUE NOT NULL,
    wallets_checked INT DEFAULT 0,
    found_count INT DEFAULT 0,
    speed INT DEFAULT 0,
    is_active BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.unlock_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activation_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unlock_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_sessions ENABLE ROW LEVEL SECURITY;

-- Open Custom RLS policies for custom UUID-string user sessions
CREATE POLICY "profiles_policy" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "activation_keys_policy" ON public.activation_keys FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "user_chains_policy" ON public.user_chains FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "wallets_policy" ON public.wallets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "withdrawals_policy" ON public.withdrawals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "unlock_codes_policy" ON public.unlock_codes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "scan_sessions_policy" ON public.scan_sessions FOR ALL USING (true) WITH CHECK (true);

-- Insert seed activation keys
INSERT INTO public.activation_keys (key_code, allowed_chains, tier, expiry_days) VALUES
('Blazeeey7g', ARRAY['BTC', 'ETH', 'BNB', 'SOL', 'USDT', 'TRX', 'DOGE'], 'lifetime', 3650);
