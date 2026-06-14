import { getSupabase } from "../lib/supabase"
import { HttpError } from "../lib/http-error"
import type { Skill } from "../types"

const TABLE = "skills"

export const skillsRepo = {
  async listByProfile(profileId: string): Promise<Skill[]> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: true })
    if (error) throw new HttpError(400, error.message)
    return (data ?? []) as Skill[]
  },

  async create(data: Partial<Skill>): Promise<Skill> {
    const { data: row, error } = await getSupabase().from(TABLE).insert(data).select().single()
    if (error) {
      // 23505 = unique_violation (profile_id, name)
      if (error.code === "23505") {
        throw new HttpError(409, "Essa competência já foi adicionada.")
      }
      throw new HttpError(400, error.message)
    }
    return row as Skill
  },

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id)
    if (error) throw new HttpError(400, error.message)
  },
}
