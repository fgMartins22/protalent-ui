// Camada simples de acesso à API do backend.
// Toda comunicação com o Supabase passa pelo backend (nunca direto do frontend).

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3333"

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const msg = data?.error || data?.message || `Erro ${res.status}`
    throw new Error(typeof msg === "string" ? msg : "Erro na requisição")
  }

  return data
}

const json = (body) => JSON.stringify(body)

// ---- Profiles ----
export const getProfile = (id) => request(`/profiles/${id}`)
export const createProfile = (body) => request(`/profiles`, { method: "POST", body: json(body) })
export const updateProfile = (id, body) => request(`/profiles/${id}`, { method: "PUT", body: json(body) })

// ---- Experiences ----
export const listExperiences = (profileId) => request(`/profiles/${profileId}/experiences`)
export const createExperience = (profileId, body) =>
  request(`/profiles/${profileId}/experiences`, { method: "POST", body: json(body) })
export const updateExperience = (id, body) => request(`/experiences/${id}`, { method: "PUT", body: json(body) })
export const deleteExperience = (id) => request(`/experiences/${id}`, { method: "DELETE" })

// ---- Educations ----
export const listEducations = (profileId) => request(`/profiles/${profileId}/educations`)
export const createEducation = (profileId, body) =>
  request(`/profiles/${profileId}/educations`, { method: "POST", body: json(body) })
export const updateEducation = (id, body) => request(`/educations/${id}`, { method: "PUT", body: json(body) })
export const deleteEducation = (id) => request(`/educations/${id}`, { method: "DELETE" })

// ---- Skills ----
export const listSkills = (profileId) => request(`/profiles/${profileId}/skills`)
export const createSkill = (profileId, name) =>
  request(`/profiles/${profileId}/skills`, { method: "POST", body: json({ name }) })
export const deleteSkill = (id) => request(`/skills/${id}`, { method: "DELETE" })

// ---- Resumes ----
export const listResumes = (profileId) => request(`/profiles/${profileId}/resumes`)
export const createResume = (profileId, body) =>
  request(`/profiles/${profileId}/resumes`, { method: "POST", body: json(body) })
export const getResume = (id) => request(`/resumes/${id}`)
export const updateResume = (id, body) => request(`/resumes/${id}`, { method: "PUT", body: json(body) })
export const deleteResume = (id) => request(`/resumes/${id}`, { method: "DELETE" })

// ---- Profile id local (substituído por Auth futuramente) ----
const PROFILE_ID_KEY = "protalent_profile_id"
export const getStoredProfileId = () => localStorage.getItem(PROFILE_ID_KEY)
export const setStoredProfileId = (id) => localStorage.setItem(PROFILE_ID_KEY, id)
export const clearStoredProfileId = () => localStorage.removeItem(PROFILE_ID_KEY)
