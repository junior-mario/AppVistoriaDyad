import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'SUA_URL_SUPABASE'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'SUA_CHAVE_ANONIMA'

export const supabase = createClient(supabaseUrl, supabaseKey)