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
    // Normaliza a URL do projeto: remove sufixos de API e barras finais,
    // pois o supabase-js já adiciona /rest/v1, /auth/v1 etc.
    // Ex.: "https://xxx.supabase.co/rest/v1/" -> "https://xxx.supabase.co"
    const url = env.SUPABASE_URL!
      .trim()
      .replace(/\/(rest|auth|storage)\/v1\/?$/i, "")
      .replace(/\/+$/, "")
    client = createClient(url, env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }

  return client
}

/**
 * Teste leve de conectividade com o Supabase.
 * Usa a API admin de auth (válida com a service role) e NÃO depende de
 * nenhuma tabela existir — é apenas uma sonda de conexão/credenciais.
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean
  message?: string
}> {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 })
    if (error) return { connected: false, message: error.message }
    return { connected: true }
  } catch (err) {
    return {
      connected: false,
      message: err instanceof Error ? err.message : String(err),
    }
  }
}

/**
 * Verifica acesso real ao banco (PostgREST/PostgreSQL) executando uma consulta.
 * Como ainda não há tabelas, consultamos uma tabela inexistente: se o banco
 * responder "tabela não encontrada", a conexão está OK (o DB respondeu).
 * Apenas erros de conexão/credencial são tratados como falha.
 */
export async function checkSupabaseDatabase(): Promise<{
  database: boolean
  message?: string
}> {
  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from("__protalent_healthcheck__")
      .select("id")
      .limit(1)

    if (!error) return { database: true }

    const tableMissing =
      error.code === "PGRST205" ||
      error.code === "42P01" ||
      /does not exist|could not find the table/i.test(error.message)

    if (tableMissing) return { database: true }

    return { database: false, message: error.message }
  } catch (err) {
    return {
      database: false,
      message: err instanceof Error ? err.message : String(err),
    }
  }
}
