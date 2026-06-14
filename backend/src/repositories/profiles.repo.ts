import { getSupabase } from "../lib/supabase"
import { HttpError } from "../lib/http-error"
import type { Profile } from "../types"

const TABLE = "profiles"

export const profilesRepo = {
  async create(data: Partial<Profile>): Promise<Profile> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .insert(data)
      .select()
      .single()
    if (error) {
      if (error.code === "23505") {
        throw new HttpError(409, "Já existe um perfil para este usuário.")
      }
      throw new HttpError(400, error.message)
    }
    return row as Profile
  },

  async getByAuthUserId(authUserId: string): Promise<Profile | null> {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle()
    if (error) throw new HttpError(400, error.message)
    return (data as Profile) ?? null
  },

  async getById(id: string): Promise<Profile> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single()
    if (error || !row) throw new HttpError(404, "Perfil não encontrado")
    return row as Profile
  },

  async update(id: string, data: Partial<Profile>): Promise<Profile> {
    const { data: row, error } = await getSupabase()
      .from(TABLE)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()
    if (error || !row) throw new HttpError(404, "Perfil não encontrado")
    return row as Profile
  },

  async remove(id: string): Promise<void> {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id)
    if (error) throw new HttpError(400, error.message)
  },
}
