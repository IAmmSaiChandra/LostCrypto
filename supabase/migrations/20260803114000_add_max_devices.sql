ALTER TABLE public.activation_keys ADD COLUMN IF NOT EXISTS max_devices INTEGER DEFAULT 1;

NOTIFY pgrst, 'reload schema';
