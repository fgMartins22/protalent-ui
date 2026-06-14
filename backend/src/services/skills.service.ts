import { z } from "zod"
import { skillsRepo } from "../repositories/skills.repo"

const schema = z.object({
  name: z.string().trim().min(1, "Nome da competência é obrigatório"),
})

export const skillsService = {
  listByProfile(profileId: string) {
    return skillsRepo.listByProfile(profileId)
  },

  create(profileId: string, input: unknown) {
    const data = schema.parse(input)
    return skillsRepo.create({ name: data.name, profile_id: profileId })
  },

  remove(id: string) {
    return skillsRepo.remove(id)
  },
}
