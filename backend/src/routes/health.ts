import type { FastifyInstance } from "fastify"
import { isSupabaseConfigured } from "../lib/supabase"

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({
    status: "ok",
    service: "protalent-api",
    supabase: isSupabaseConfigured() ? "configured" : "not_configured",
  }))
}
