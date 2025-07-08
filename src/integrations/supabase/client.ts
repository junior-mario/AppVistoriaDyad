import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Erro Crítico: As variáveis de ambiente do Supabase não foram encontradas. " +
    "Certifique-se de que VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão definidas em um arquivo .env na raiz do projeto."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);