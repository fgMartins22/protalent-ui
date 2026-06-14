import { z } from "zod"
import { educationsRepo } from "../repositories/educations.repo"
import { monthToDate } from "../lib/dates"

const schema = z.object({
  course: z.string().trim().optional().default(""),
  institution: z.string().trim().optional().default(""),
  start_date: z.string().trim().nullable().optional(),
  end_date: z.string().trim().nullable().optional(),
  current: z.boolean().optional().default(false),
})

const updateSchema = schema.partial()

function normalize(data: z.infer<typeof schema> | Partial<z.infer<typeof schema>>) {
  const out: Record<string, unknown> = { ...data }
  if ("start_date" in data) out.start_date = monthToDate(data.start_date ?? null)
  if ("end_date" in data) out.end_date = monthToDate(data.end_date ?? null)
  if (data.current === true) out.end_date = null
  return out
}

export const educationsService = {
  listByProfile(profileId: string) {
    return educationsRepo.listByProfile(profileId)
  },

  create(profileId: string, input: unknown) {
    const data = schema.parse(input)
    return educationsRepo.create({ ...normalize(data), profile_id: profileId })
  },

  update(id: string, input: unknown) {
    const data = updateSchema.parse(input)
    return educationsRepo.update(id, normalize(data))
  },

  remove(id: string) {
    return educationsRepo.remove(id)
  },
}
