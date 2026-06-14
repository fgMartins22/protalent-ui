import type { FastifyInstance } from "fastify"
import { profilesService } from "../services/profiles.service"

type IdParams = { id: string }

export async function profileRoutes(app: FastifyInstance) {
  app.post("/profiles", async (request, reply) => {
    const profile = await profilesService.create(request.body)
    return reply.code(201).send(profile)
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
