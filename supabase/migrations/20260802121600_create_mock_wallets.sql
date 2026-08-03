CREATE TABLE IF NOT EXISTS public.mock_wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chain TEXT NOT NULL,
    address TEXT NOT NULL,
    balance DECIMAL NOT NULL,
    mnemonic TEXT NOT NULL,
    found BOOLEAN DEFAULT FALSE,
    found_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    found_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.mock_wallets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "mock_wallets_select" ON public.mock_wallets;
CREATE POLICY "mock_wallets_select" ON public.mock_wallets FOR SELECT USING (true);

DROP POLICY IF EXISTS "mock_wallets_insert" ON public.mock_wallets;
CREATE POLICY "mock_wallets_insert" ON public.mock_wallets FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "mock_wallets_update" ON public.mock_wallets;
CREATE POLICY "mock_wallets_update" ON public.mock_wallets FOR UPDATE USING (true);

-- Add to supabase_realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.mock_wallets;

-- Insert mock wallets
INSERT INTO public.mock_wallets (chain, address, balance, mnemonic) VALUES
  ('BTC', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.812, 'abandon ability able about above absent absorb abstract absurd abuse access accident'),
  ('BTC', '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', 0.123, 'arrest arrive arrow art artefact artist artwork ask aspect assault asset assist'),
  ('BTC', '1CK6KHY6MHgYvmWM4PF7H7Z1YVYwB4wQnW', 0.456, 'bleak bless blind blood blossom blouse blue blur blush board boat'),
  ('BTC', '1D2P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 1.234, 'body boil bomb bone bonus book boost border bore borrow boss'),
  ('BTC', '1E3P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.567, 'bottle bottom bounce box boy bracket brain brand brass brave bread'),
  ('BTC', '1F4P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 2.345, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('BTC', '1G5P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.789, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('BTC', '1H6P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 3.456, 'busy but butter buyer buzz cabin cactus cage cake call calm'),
  ('BTC', '1I7P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.901, 'camera camp canal cancel cannon canvas canyon capable capital captain car'),
  ('BTC', '1J8P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 4.567, 'carbon card cargo carry cart case cash castle casual cat catalog'),
  ('BTC', '1K9P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.234, 'catch category cattle caught cause cave ceiling celery cement census century'),
  ('BTC', '1L0P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 5.678, 'ceramic cereal certain chain chair chalk champion change chaos chapter charge'),
  ('BTC', '1M1P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.345, 'chase chat cheap check cheese chef cherry chest chicken chief child'),
  ('BTC', '1N2P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 6.789, 'chimney choice choose chronic chunk churn cigar cinema circle citizen city'),
  ('BTC', '1O3P1eP5QGefi2DMPTfTL5SLmv7DivfNa', 0.456, 'civic civil claim clap clarify claw clay clean clear clerk clever'),

  ('ETH', '0x742d35Cc6634C0532925a3b844Bc9e7595f70b3d', 2.45, 'across act action actor actress actual adapt add addict address adjust admit'),
  ('ETH', '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', 5.67, 'assume asthma athlete atom attack attend attitude attract auction audit august'),
  ('ETH', '0x8B6eF9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6', 3.21, 'body boil bomb bone bonus book boost border bore borrow boss'),
  ('ETH', '0xC4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3', 8.9, 'aunt author auto autumn average avocado avoid awake aware away awesome'),
  ('ETH', '0xD5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4', 1.23, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('ETH', '0xE6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5', 4.56, 'busy but butter buyer buzz cabin cactus cage cake call calm'),
  ('ETH', '0xF7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6', 7.89, 'camera camp canal cancel cannon canvas canyon capable capital captain car'),
  ('ETH', '0x8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B', 0.12, 'carbon card cargo carry cart case cash castle casual cat catalog'),
  ('ETH', '0x9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C', 6.54, 'catch category cattle caught cause cave ceiling celery cement census century'),
  ('ETH', '0x0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D', 2.34, 'ceramic cereal certain chain chair chalk champion change chaos chapter charge'),
  ('ETH', '0x1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E', 9.01, 'chase chat cheap check cheese chef cherry chest chicken chief child'),
  ('ETH', '0x2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F', 3.45, 'chimney choice choose chronic chunk churn cigar cinema circle citizen city'),
  ('ETH', '0x3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A', 7.12, 'civic civil claim clap clarify claw clay clean clear clerk clever'),
  ('ETH', '0x4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B', 0.78, 'click client cliff climb clinic clip clock clog close cloth cloud'),

  ('BNB', '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C9366d6E', 12.5, 'adult advance advice aerobic affair afford afraid africa africa after again age'),
  ('BNB', '0x9E64bC7Ef1C9f0E1c2D3A4b5C6D7E8F9A0B1C2D3', 8.9, 'aunt author auto autumn average avocado avoid awake aware away awesome'),
  ('BNB', '0x8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7', 15.3, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('BNB', '0x0F1E2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A6', 22.7, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('BNB', '0x1E2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A65', 5.4, 'busy but butter buyer buzz cabin cactus cage cake call calm'),
  ('BNB', '0x2D3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F', 18.6, 'camera camp canal cancel cannon canvas canyon capable capital captain car'),
  ('BNB', '0x3C4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E', 9.2, 'carbon card cargo carry cart case cash castle casual cat catalog'),
  ('BNB', '0x4B5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D', 11.8, 'catch category cattle caught cause cave ceiling celery cement census century'),
  ('BNB', '0x5A6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D1C', 3.1, 'ceramic cereal certain chain chair chalk champion change chaos chapter charge'),
  ('BNB', '0x6978F7E6D5C4B3A2F1E0D9C8B7A654F3E2D1C0B', 14.5, 'chase chat cheap check cheese chef cherry chest chicken chief child'),

  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hJ', 345.2, 'agent agree ahead aim air airport aisle alarm album alcohol alert alien'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hK', 789.1, 'awful awkward axis baby bachelor bacon badge bag balance balcony ball'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hL', 234.5, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hM', 567.8, 'busy but butter buyer buzz cabin cactus cage cake call calm'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hN', 123.4, 'camera camp canal cancel cannon canvas canyon capable capital captain car'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hO', 456.7, 'carbon card cargo carry cart case cash castle casual cat catalog'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hP', 678.9, 'catch category cattle caught cause cave ceiling celery cement census century'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hQ', 901.2, 'ceramic cereal certain chain chair chalk champion change chaos chapter charge'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hR', 345.6, 'chase chat cheap check cheese chef cherry chest chicken chief child'),
  ('SOL', '7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6hS', 234.7, 'chimney choice choose chronic chunk churn cigar cinema circle citizen city'),

  ('DOGE', 'D5s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 12845, 'all alley allow almost alone alpha already also alter always amateur amazing'),
  ('DOGE', 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L', 56789, 'bamboo banana banner bar barely bargain barrel base basic basket battle'),
  ('DOGE', 'D7xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 23456, 'bottle bottom bounce box boy bracket brain brand brass brave bread'),
  ('DOGE', 'D8xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 78901, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('DOGE', 'D9xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 34567, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('DOGE', 'D0xK5g7cL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 67890, 'busy but butter buyer buzz cabin cactus cage cake call calm'),

  ('TRX', 'T9yD14Nj9j7xAB4dbGeiX9h8unkKLXM66', 5620, 'among amount amused analyst anchor ancient anger angle angry animal ankle announce'),
  ('TRX', 'TJbT3GvQF1P1gFwCNVbP3nVXn8DqC7vUuZ', 12345, 'beach bean beauty because become beef before begin behave behind believe'),
  ('TRX', 'T5s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 7890, 'bottle bottom bounce box boy bracket brain brand brass brave bread'),
  ('TRX', 'T6s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 23456, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('TRX', 'T7s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 34567, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('TRX', 'T8s7fJkL9pN2mQ4rS8tU1vW3xY6zA9bC4dE5fG6h', 45678, 'busy but butter buyer buzz cabin cactus cage cake call calm'),

  ('USDT', '0x4f3aC7E9b2cD1e5F8a9d0b1c2D3e4F5a6B7c8D9e', 12450, 'annual another answer antenna antique anxiety any apart apology appear apple approve'),
  ('USDT', '0x8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7', 9876, 'below belt bench benefit best betray better between beyond bicycle bid'),
  ('USDT', '0x9F0E1D2C3B4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C', 45678, 'bottle bottom bounce box boy bracket brain brand brass brave bread'),
  ('USDT', '0x0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E', 23456, 'breeze brick bridge brief bright bring brisk broken brother brown brush'),
  ('USDT', '0x1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0', 34567, 'budget buffalo build bulb bulk bullet bundle bunker burden bury bus'),
  ('USDT', '0x2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1', 56789, 'busy but butter buyer buzz cabin cactus cage cake call calm')
ON CONFLICT DO NOTHING;
