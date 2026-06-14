import type { FastifyInstance } from "fastify"
import {
  isSupabaseConfigured,
  checkSupabaseConnection,
  checkSupabaseDatabase,
} from "../lib/supabase"

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    service: "protalent-api",
    supabase: isSupabaseConfigured() ? "configured" : "not_configured",
  }))

  // Testa a conexão real com o Supabase (sem depender de tabelas).
  app.get("/health/supabase", async (_request, reply) => {
    const result = await checkSupabaseConnection()

    if (result.connected) {
      return { status: "ok", service: "supabase", connected: true }
    }

    return reply.code(503).send({
      status: "error",
      service: "supabase",
      connected: false,
      message: result.message ?? "unknown error",
    })
  })

  // Testa acesso real ao banco executando uma consulta simples.
  app.get("/health/database", async (_request, reply) => {
    const result = await checkSupabaseDatabase()

    if (result.database) {
      return { status: "ok", database: true }
    }

    return reply.code(503).send({
      status: "error",
      database: false,
      message: result.message ?? "unknown error",
    })
  })
}
