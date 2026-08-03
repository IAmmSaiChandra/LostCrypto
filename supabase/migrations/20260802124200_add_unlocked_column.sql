ALTER TABLE public.wallets ADD COLUMN IF NOT EXISTS unlocked BOOLEAN DEFAULT FALSE;
NOTIFY pgrst, 'reload schema';
