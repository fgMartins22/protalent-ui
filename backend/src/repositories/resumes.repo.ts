import { getSupabase } from "../lib/supabase"
import { HttpError } from "../lib/http-error"
import type { Resume } from "../types"

const TABLE = "resumes"

export const resumesRepo = {
  async listByProfile(profileId: string): Promise<Resume[]> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("profile_id", profileId)
      .order("updated_at", { ascending: false })
    if (error) throw new HttpError(400, error.message)
    return (data ?? []) as Resume[]
  },

  async create(data: Partial<Resume>): Promise<Resume> {
    const { data: row, error } = await getSupabase().from(TABLE).insert(data).select().single()
    if (error) throw new HttpError(400, error.message)
    return row as Resume
  },

  async getById(id: string): Promise<Resume> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single()
    if (error || !row) throw new HttpError(404, "Currículo não encontrado")
    return row as Resume
  },

  async update(id: string, data: Partial<Resume>): Promise<Resume> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()
    if (error || !row) throw new HttpError(404, "Currículo não encontrado")
    return row as Resume
  },

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id)
    if (error) throw new HttpError(400, error.message)
  },
}
