import type { FastifyInstance } from "fastify"
import { profilesService } from "../services/profiles.service"

type IdParams = { id: string }

export async function profileRoutes(app: FastifyInstance) {
  app.post("/profiles", async (request, reply) => {
    const profile = await profilesService.create(request.body)
    return reply.code(201).send(profile)
  })

  // Busca o perfil vinculado a um usuário do Supabase Auth (ou null).
  app.get("/profiles/by-auth/:authUserId", async (request) => {
    const { authUserId } = request.params as { authUserId: string }
    return profilesService.getByAuthUserId(authUserId)
  })

  app.get("/profiles/:id", async (request) => {
    const { id } = request.params as IdParams
    return profilesService.getById(id)
  })

  app.put("/profiles/:id", async (request) => {
    const { id } = request.params as IdParams
    return profilesService.update(id, request.body)
  })

  app.delete("/profiles/:id", async (request, reply) => {
    const { id } = request.params as IdParams
    await profilesService.remove(id)
    return reply.code(204).send()
  })
}
