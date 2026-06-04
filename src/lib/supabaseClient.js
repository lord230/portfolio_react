import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://lqbiclyoejvkprybeain.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'sb_publishable_tXbc43N6dTpdjvbHHdr0IQ_f59kR9Mm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
