import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase: lipsește VITE_SUPABASE_URL sau VITE_SUPABASE_ANON_KEY în .env')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
