import { z } from "zod"
import { experiencesRepo } from "../repositories/experiences.repo"
import { monthToDate } from "../lib/dates"

const schema = z.object({
  role: z.string().trim().optional().default(""),
  company: z.string().trim().optional().default(""),
  start_date: z.string().trim().nullable().optional(),
  end_date: z.string().trim().nullable().optional(),
  current: z.boolean().optional().default(false),
})

const updateSchema = schema.partial()

function normalize(data: z.infer<typeof schema> | Partial<z.infer<typeof schema>>) {
  const out: Record<string, unknown> = { ...data }
  if ("start_date" in data) out.start_date = monthToDate(data.start_date ?? null)
  if ("end_date" in data) out.end_date = monthToDate(data.end_date ?? null)
  // Regra: se ainda atua, não há data de término.
  if (data.current === true) out.end_date = null
  return out
}

export const experiencesService = {
  listByProfile(profileId: string) {
    return experiencesRepo.listByProfile(profileId)
  },

  create(profileId: string, input: unknown) {
    const data = schema.parse(input)
    return experiencesRepo.create({ ...normalize(data), profile_id: profileId })
  },

  update(id: string, input: unknown) {
    const data = updateSchema.parse(input)
    return experiencesRepo.update(id, normalize(data))
  },

  remove(id: string) {
    return experiencesRepo.remove(id)
  },
}
