import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { env } from "../config/env"

/**
 * Client Supabase do backend.
 *
 * Regras:
 * - Usa a SERVICE ROLE — exclusivamente no servidor, nunca no frontend.
 * - É criado sob demanda (lazy) para o servidor subir mesmo sem credenciais.
 * - Esta fase apenas prepara a conexão; nenhuma query complexa ainda.
 */
let client: SupabaseClient | null = null

export function isSupabaseConfigured(): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY)
}

export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env"
    )
  }

  if (!client) {
    client = createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  return client
}
