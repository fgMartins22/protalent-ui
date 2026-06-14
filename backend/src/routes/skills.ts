import type { FastifyInstance } from "fastify"
import { skillsService } from "../services/skills.service"

type IdParams = { id: string }
type ProfileParams = { profileId: string }

export async function skillRoutes(app: FastifyInstance) {
  app.get("/profiles/:profileId/skills", async (request) => {
    const { profileId } = request.params as ProfileParams
    return skillsService.listByProfile(profileId)
  })

  app.post("/profiles/:profileId/skills", async (request, reply) => {
    const { profileId } = request.params as ProfileParams
    const created = await skillsService.create(profileId, request.body)
    return reply.code(201).send(created)
  })

  app.delete("/skills/:id", async (request, reply) => {
    const { id } = request.params as IdParams
    await skillsService.remove(id)
    return reply.code(204).send()
  })
}
