// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Pega as variáveis de ambiente do arquivo .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing from .env.local")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)