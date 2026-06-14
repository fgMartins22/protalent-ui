import type { FastifyInstance } from "fastify"
import { resumesService } from "../services/resumes.service"

type IdParams = { id: string }
type ProfileParams = { profileId: string }

export async function resumeRoutes(app: FastifyInstance) {
  app.get("/profiles/:profileId/resumes", async (request) => {
    const { profileId } = request.params as ProfileParams
    return resumesService.listByProfile(profileId)
  })

  app.post("/profiles/:profileId/resumes", async (request, reply) => {
    const { profileId } = request.params as ProfileParams
    const created = await resumesService.create(profileId, request.body)
    return reply.code(201).send(created)
  })

  app.get("/resumes/:id", async (request) => {
    const { id } = request.params as IdParams
    return resumesService.getById(id)
  })

  app.put("/resumes/:id", async (request) => {
    const { id } = request.params as IdParams
    return resumesService.update(id, request.body)
  })

  app.delete("/resumes/:id", async (request, reply) => {
    const { id } = request.params as IdParams
    await resumesService.remove(id)
    return reply.code(204).send()
  })
}
