# Configurare Supabase pentru RoofLVL

## 1. Creează proiect Supabase

1. Mergi la [supabase.com](https://supabase.com) și creează un cont (gratuit)
2. **New project** → alege nume, parolă pentru baza de date, regiune
3. Așteaptă până pornește proiectul

## 2. Rulează SQL-ul pentru tabele

1. În Supabase: **SQL Editor** → **New query**
2. Deschide fișierul `supabase-setup.sql` din acest proiect
3. Copiază tot conținutul și lipește în editor
4. Apasă **Run**

(Scriptul creează tabelele `orders` și `contact_messages`, plus politicile RLS.)

## 3. Creează cont admin pentru dashboard

1. În Supabase: **Authentication** → **Users** → **Add user**
2. Adaugă **Email** și **Password** (acestea le folosești pentru `/admin`)
3. Optional: dezactivează "Confirm email" din **Authentication** → **Providers** → **Email** dacă vrei să te conectezi imediat fără confirmare

## 4. Configurare variabile de mediu

1. În Supabase: **Project Settings** (icon roata) → **API**
2. Copiază **Project URL** și **anon public** key
3. Creează fișier `.env` în rădăcina proiectului:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Înlocuiește cu valorile tale

## 5. Pornește aplicația

```bash
npm run dev
```

- **Checkout**: la "Trimite comanda", comenzile se salvează în Supabase
- **Dashboard**: mergi la `http://localhost:5173/admin` și autentifică-te cu contul creat la pasul 3
