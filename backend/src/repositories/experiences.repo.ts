import { getSupabase } from "../lib/supabase"
import { HttpError } from "../lib/http-error"
import type { ProfessionalExperience } from "../types"

const TABLE = "professional_experiences"

export const experiencesRepo = {
  async listByProfile(profileId: string): Promise<ProfessionalExperience[]> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: true })
    if (error) throw new HttpError(400, error.message)
    return (data ?? []) as ProfessionalExperience[]
  },

  async create(data: Partial<ProfessionalExperience>): Promise<ProfessionalExperience> {
    const { data: row, error } = await getSupabase().from(TABLE).insert(data).select().single()
    if (error) throw new HttpError(400, error.message)
    return row as ProfessionalExperience
  },

  async update(id: string, data: Partial<ProfessionalExperience>): Promise<ProfessionalExperience> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()
    if (error || !row) throw new HttpError(404, "Experiência não encontrada")
    return row as ProfessionalExperience
  },

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id)
    if (error) throw new HttpError(400, error.message)
  },
}
