import type { FastifyInstance } from "fastify"
import { educationsService } from "../services/educations.service"

type IdParams = { id: string }
type ProfileParams = { profileId: string }

export async function educationRoutes(app: FastifyInstance) {
  app.get("/profiles/:profileId/educations", async (request) => {
    const { profileId } = request.params as ProfileParams
    return educationsService.listByProfile(profileId)
  })

  app.post("/profiles/:profileId/educations", async (request, reply) => {
    const { profileId } = request.params as ProfileParams
    const created = await educationsService.create(profileId, request.body)
    return reply.code(201).send(created)
  })

  app.put("/educations/:id", async (request) => {
    const { id } = request.params as IdParams
    return educationsService.update(id, request.body)
  })

  app.delete("/educations/:id", async (request, reply) => {
    const { id } = request.params as IdParams
    await educationsService.remove(id)
    return reply.code(204).send()
  })
}
