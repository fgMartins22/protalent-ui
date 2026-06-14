import { z } from "zod"
import { resumesRepo } from "../repositories/resumes.repo"

const createSchema = z.object({
  name: z.string().trim().min(1, "Nome do currículo é obrigatório"),
  layout: z.enum(["standard", "profile", "modern"]).optional().default("standard"),
  job_description: z.string().nullable().optional(),
  output_type: z.enum(["text", "bullets"]).optional().default("text"),
  professional_summary: z.string().nullable().optional(),
  experience_description: z.string().nullable().optional(),
  education_description: z.string().nullable().optional(),
  status: z.enum(["draft", "updated", "published"]).optional().default("draft"),
})

const updateSchema = createSchema.partial()

export const resumesService = {
  listByProfile(profileId: string) {
    return resumesRepo.listByProfile(profileId)
  },

  create(profileId: string, input: unknown) {
    const data = createSchema.parse(input)
    return resumesRepo.create({ ...data, profile_id: profileId })
  },

  getById(id: string) {
    return resumesRepo.getById(id)
  },

  update(id: string, input: unknown) {
    const data = updateSchema.parse(input)
    return resumesRepo.update(id, data)
  },

  remove(id: string) {
    return resumesRepo.remove(id)
  },
}
