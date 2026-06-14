import type { FastifyInstance } from "fastify"

/**
 * Rotas de currículos (STUBS).
 * Lógica real (auth + Supabase) será implementada nas próximas fases.
 */
export async function resumeRoutes(app: FastifyInstance) {
  app.get("/", async () => ({ stub: true, route: "GET /resumes", data: [] }))

  app.post("/", async (request) => ({
    stub: true,
    route: "POST /resumes",
    received: request.body ?? null,
  }))

  app.get("/:id", async (request) => ({
    stub: true,
    route: "GET /resumes/:id",
    params: request.params,
  }))

  app.put("/:id", async (request) => ({
    stub: true,
    route: "PUT /resumes/:id",
    params: request.params,
    received: request.body ?? null,
  }))

  app.delete("/:id", async (request) => ({
    stub: true,
    route: "DELETE /resumes/:id",
    params: request.params,
  }))
}
