import { z } from "zod"
import { profilesRepo } from "../repositories/profiles.repo"

const optionalText = z.string().trim().optional()

const createSchema = z.object({
  first_name: z.string().trim().min(1, "Nome é obrigatório"),
  last_name: z.string().trim().min(1, "Sobrenome é obrigatório"),
  email: z.string().trim().email("E-mail inválido"),
  title: optionalText,
  city: optionalText,
  state: optionalText,
  phone: optionalText,
  linkedin: optionalText,
  github: optionalText,
  portfolio: optionalText,
  avatar_url: z.string().nullable().optional(),
})

// Atualização: todos opcionais.
const updateSchema = createSchema.partial()

export const profilesService = {
  create(input: unknown) {
    const data = createSchema.parse(input)
    return profilesRepo.create(data)
  },

  getById(id: string) {
    return profilesRepo.getById(id)
  },

  update(id: string, input: unknown) {
    const data = updateSchema.parse(input)
    return profilesRepo.update(id, data)
  },

  remove(id: string) {
    return profilesRepo.remove(id)
  },
}
