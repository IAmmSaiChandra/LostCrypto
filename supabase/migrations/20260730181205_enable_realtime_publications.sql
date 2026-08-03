-- Enable realtime subscriptions for the wallets and scan_sessions tables
-- by adding them to the supabase_realtime publication.
alter publication supabase_realtime add table public.wallets;
alter publication supabase_realtime add table public.scan_sessions;
