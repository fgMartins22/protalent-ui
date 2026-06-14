import type { FastifyInstance } from "fastify"
import { experiencesService } from "../services/experiences.service"

type IdParams = { id: string }
type ProfileParams = { profileId: string }

export async function experienceRoutes(app: FastifyInstance) {
  app.get("/profiles/:profileId/experiences", async (request) => {
    const { profileId } = request.params as ProfileParams
    return experiencesService.listByProfile(profileId)
  })

  app.post("/profiles/:profileId/experiences", async (request, reply) => {
    const { profileId } = request.params as ProfileParams
    const created = await experiencesService.create(profileId, request.body)
    return reply.code(201).send(created)
  })

  app.put("/experiences/:id", async (request) => {
    const { id } = request.params as IdParams
    return experiencesService.update(id, request.body)
  })

  app.delete("/experiences/:id", async (request, reply) => {
    const { id } = request.params as IdParams
    await experiencesService.remove(id)
    return reply.code(204).send()
  })
}
