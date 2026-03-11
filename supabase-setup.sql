-- Rulează acest SQL în Supabase: SQL Editor → New query → lipisești → Run

-- Tabel pentru comenzi
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  company TEXT NOT NULL,
  cif TEXT,
  contact TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  county TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL
);

-- Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Șterge politicile existente (dacă există)
DROP POLICY IF EXISTS "Allow anon insert orders" ON orders;
DROP POLICY IF EXISTS "Allow authenticated select orders" ON orders;
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
DROP POLICY IF EXISTS "Allow public select orders" ON orders;

-- Oricine poate insera comenzi (checkout fără cont)
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Doar utilizatorii autentificați pot citi (admin)
CREATE POLICY "Allow public select orders" ON orders
  FOR SELECT TO authenticated USING (true);

-- ========== FORMULAR CONTACT ==========

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert contact" ON contact_messages;
DROP POLICY IF EXISTS "Allow public select contact" ON contact_messages;

CREATE POLICY "Allow public insert contact" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select contact" ON contact_messages
  FOR SELECT TO authenticated USING (true);
