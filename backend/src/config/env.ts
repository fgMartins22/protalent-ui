import "dotenv/config"
import { z } from "zod"

/**
 * Variáveis de ambiente do backend.
 * Chaves de Supabase/Vindi são opcionais nesta fase — o servidor sobe sem elas,
 * permitindo desenvolver a base antes de ter as credenciais reais.
 */
const schema = z.object({
  PORT: z.coerce.number().default(3333),

  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),

  VINDI_API_KEY: z.string().optional(),
  VINDI_WEBHOOK_SECRET: z.string().optional(),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error("Configuração de ambiente inválida:", parsed.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = parsed.data
