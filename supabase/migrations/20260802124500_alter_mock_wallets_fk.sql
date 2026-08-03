-- Drop foreign key constraint on mock_wallets since user_id is TEXT (a custom UUID string) rather than a real references auth.users UUID
ALTER TABLE public.mock_wallets DROP CONSTRAINT IF EXISTS mock_wallets_found_by_user_id_fkey;
ALTER TABLE public.mock_wallets ALTER COLUMN found_by_user_id TYPE TEXT;

NOTIFY pgrst, 'reload schema';
