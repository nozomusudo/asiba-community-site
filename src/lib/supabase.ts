// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

let supabase;

if (typeof window !== 'undefined') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing env variables for Supabase')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }