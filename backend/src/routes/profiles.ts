import type { FastifyInstance } from "fastify"

/**
 * Rotas de perfil (STUBS).
 * Lógica real (auth + Supabase) será implementada nas próximas fases.
 */
export async function profileRoutes(app: FastifyInstance) {
  // GET /profiles/me — retorna o perfil do usuário autenticado
  app.get("/me", async () => ({
    stub: true,
    route: "GET /profiles/me",
    data: null,
  }))

  // PUT /profiles/me — atualiza o perfil do usuário autenticado
  app.put("/me", async (request) => ({
    stub: true,
    route: "PUT /profiles/me",
    received: request.body ?? null,
  }))
}
