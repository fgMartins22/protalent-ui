import { createClient } from "@supabase/supabase-js"

// Client do Supabase no frontend — usa APENAS a anon/publishable key.
// A service role nunca é exposta aqui; operações sensíveis vão pelo backend.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // Aviso em dev; o app ainda carrega, mas o auth não funcionará sem as chaves.
  console.warn(
    "Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no frontend/.env"
  )
}

export const supabase = createClient(url ?? "", anonKey ?? "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
