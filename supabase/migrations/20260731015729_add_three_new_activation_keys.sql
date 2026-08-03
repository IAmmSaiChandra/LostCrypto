-- Insert three new activation keys
INSERT INTO public.activation_keys (key_code, allowed_chains, tier, expiry_days) VALUES
('KEY-SOL-004', ARRAY['SOL'], 'monthly', 30),
('KEY-ETH-BNB-005', ARRAY['ETH', 'BNB'], 'bimonthly', 60),
('KEY-PRO-006', ARRAY['BTC', 'ETH', 'SOL', 'USDT'], 'lifetime', 3650)
ON CONFLICT (key_code) DO NOTHING;
