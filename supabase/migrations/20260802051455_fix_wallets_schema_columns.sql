-- Fix the wallets table schema columns to support client-side balance parameters
ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS balance NUMERIC(20, 6) DEFAULT 0.000000;
ALTER TABLE public.wallets ALTER COLUMN private_key DROP NOT NULL;
