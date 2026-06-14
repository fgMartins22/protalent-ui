import { getSupabase } from "../lib/supabase"
import { HttpError } from "../lib/http-error"
import type { Education } from "../types"

const TABLE = "educations"

export const educationsRepo = {
  async listByProfile(profileId: string): Promise<Education[]> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: true })
    if (error) throw new HttpError(400, error.message)
    return (data ?? []) as Education[]
  },

  async create(data: Partial<Education>): Promise<Education> {
    const { data: row, error } = await getSupabase().from(TABLE).insert(data).select().single()
    if (error) throw new HttpError(400, error.message)
    return row as Education
  },

  async update(id: string, data: Partial<Education>): Promise<Education> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()
    if (error || !row) throw new HttpError(404, "Formação não encontrada")
    return row as Education
  },

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id)
    if (error) throw new HttpError(400, error.message)
  },
}
