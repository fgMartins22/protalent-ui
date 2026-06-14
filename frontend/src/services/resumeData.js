import { getResume, getProfile, listExperiences, listEducations, listSkills } from "./api"

function fmtMonth(d) {
  if (!d) return ""
  const [y, m] = String(d).split("-")
  return m ? `${m}/${y}` : y
}

export function formatPeriod(start, end, current) {
  const s = fmtMonth(start)
  const e = current ? "Atual" : fmtMonth(end)
  if (!s && !e) return ""
  return [s, e].filter(Boolean).join(" — ")
}

/**
 * Junta os dados do PERFIL (pessoa, experiências, formações, competências)
 * com os campos exclusivos do CURRÍCULO (resumo/descrições). Fonte única de
 * verdade para os 3 layouts — nada de placeholders.
 */
export function buildLayoutData(profile, experiences, educations, skills, resume) {
  return {
    person: {
      name: `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim(),
      title: profile.title ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      linkedin: profile.linkedin ?? "",
      github: profile.github ?? "",
      portfolio: profile.portfolio ?? "",
      avatar: profile.avatar_url ?? "",
    },
    experiences: experiences.map((e) => ({
      id: e.id,
      role: e.role ?? "",
      company: e.company ?? "",
      period: formatPeriod(e.start_date, e.end_date, e.current),
    })),
    educations: educations.map((e) => ({
      id: e.id,
      course: e.course ?? "",
      institution: e.institution ?? "",
      period: formatPeriod(e.start_date, e.end_date, e.current),
    })),
    skills: skills.map((s) => s.name),
    resumo: resume.professional_summary ?? "",
    experienciaDescricao: resume.experience_description ?? "",
    educacaoDescricao: resume.education_description ?? "",
  }
}

export async function loadResumeView(id) {
  const resume = await getResume(id)
  const [profile, experiences, educations, skills] = await Promise.all([
    getProfile(resume.profile_id),
    listExperiences(resume.profile_id),
    listEducations(resume.profile_id),
    listSkills(resume.profile_id),
  ])
  return { resume, data: buildLayoutData(profile, experiences, educations, skills, resume) }
}
