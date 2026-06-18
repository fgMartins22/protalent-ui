import { useCallback, useEffect, useRef, useState } from "react"
import {
  Upload, Plus, Trash2, Save, Briefcase, GraduationCap, Wrench, Sparkles, Loader2, User as UserIcon,
} from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Toast from "../components/Toast"
import { useAuth } from "../contexts/AuthContext"
import { supabase } from "../lib/supabase"
import {
  getProfile, updateProfile,
  listExperiences, createExperience, updateExperience, deleteExperience,
  listEducations, createEducation, updateEducation, deleteEducation,
  listSkills, createSkill, deleteSkill,
} from "../services/api"

const AVATAR_BUCKET = "avatars"
const AVATAR_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
const AVATAR_MAX_BYTES = 2 * 1024 * 1024 // 2MB

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 disabled:bg-slate-50"
const labelClass = "text-sm font-medium text-slate-700"
const monthValue = (d) => (d ? String(d).slice(0, 7) : "")

function Field({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} />
    </div>
  )
}

export default function Perfil() {
  const { profile: authProfile, user, refreshProfile } = useAuth()
  const profileId = authProfile?.id ?? null

  const [profile, setProfile] = useState(null)
  const [experiences, setExperiences] = useState([])
  const [educations, setEducations] = useState([])
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState("")

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [toast, setToast] = useState(null)

  const fileRef = useRef(null)
  const closeToast = useCallback(() => setToast(null), [])

  const load = useCallback(async () => {
    if (!profileId) return
    setLoading(true)
    setLoadError(null)
    try {
      const [p, exps, edus, sks] = await Promise.all([
        getProfile(profileId), listExperiences(profileId), listEducations(profileId), listSkills(profileId),
      ])
      setProfile({
        first_name: p.first_name ?? "", last_name: p.last_name ?? "", title: p.title ?? "",
        city: p.city ?? "", state: p.state ?? "", email: p.email ?? "", phone: p.phone ?? "",
        linkedin: p.linkedin ?? "", github: p.github ?? "", portfolio: p.portfolio ?? "", avatar: p.avatar_url ?? "",
      })
      setExperiences(exps.map((e) => ({ ...e, start_date: monthValue(e.start_date), end_date: monthValue(e.end_date) })))
      setEducations(edus.map((e) => ({ ...e, start_date: monthValue(e.start_date), end_date: monthValue(e.end_date) })))
      setSkills(sks)
    } catch (err) {
      setLoadError(err.message || "Falha ao carregar o perfil")
    } finally {
      setLoading(false)
    }
  }, [profileId])

  useEffect(() => { load() }, [load])

  function setField(key, value) {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  async function handleAvatar(e) {
    const file = e.target.files?.[0]
    e.target.value = "" // permite reenviar o mesmo arquivo
    if (!file) return

    if (!AVATAR_TYPES.includes(file.type)) {
      setToast("Formato inválido. Use JPG, PNG ou WEBP.")
      return
    }
    if (file.size > AVATAR_MAX_BYTES) {
      setToast("Imagem muito grande. O limite é 2MB.")
      return
    }
    if (!user?.id) {
      setToast("Sessão inválida. Faça login novamente.")
      return
    }

    setUploadingAvatar(true)
    try {
      const ext = (file.name.split(".").pop() || "png").toLowerCase()
      const path = `${user.id}/avatar-${Date.now()}.${ext}`

      const { error: upErr } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type })
      if (upErr) throw upErr

      const { data: pub } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path)
      const url = pub.publicUrl

      // Persiste a URL no profile (via backend) e atualiza a tela imediatamente.
      await updateProfile(profileId, { avatar_url: url })
      setField("avatar", url)
      await refreshProfile()

      // Best-effort: remove fotos anteriores do usuário (evita acúmulo).
      try {
        const { data: list } = await supabase.storage.from(AVATAR_BUCKET).list(user.id)
        const old = (list || [])
          .map((f) => `${user.id}/${f.name}`)
          .filter((pth) => pth !== path)
        if (old.length) await supabase.storage.from(AVATAR_BUCKET).remove(old)
      } catch { /* ignore cleanup errors */ }

      setToast("Foto de perfil atualizada")
    } catch (err) {
      console.error("Erro ao enviar avatar:", err)
      setToast("Não foi possível enviar a foto. Tente novamente.")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const expPayload = (e) => ({ role: e.role, company: e.company, start_date: e.start_date || null, end_date: e.end_date || null, current: e.current })
  const eduPayload = (e) => ({ course: e.course, institution: e.institution, start_date: e.start_date || null, end_date: e.end_date || null, current: e.current })

  async function handleSave() {
    setSaving(true)
    try {
      await updateProfile(profileId, {
        first_name: profile.first_name, last_name: profile.last_name, title: profile.title,
        city: profile.city, state: profile.state, email: profile.email, phone: profile.phone,
        linkedin: profile.linkedin, github: profile.github, portfolio: profile.portfolio,
      })
      await Promise.all([
        ...experiences.map((e) => updateExperience(e.id, expPayload(e))),
        ...educations.map((e) => updateEducation(e.id, eduPayload(e))),
      ])
      await refreshProfile()
      setToast("Perfil salvo com sucesso")
    } catch (err) {
      setToast(err.message || "Erro ao salvar")
    } finally {
      setSaving(false)
    }
  }

  async function addExperience() {
    try {
      const row = await createExperience(profileId, { role: "", company: "", current: false })
      setExperiences((prev) => [...prev, { ...row, start_date: "", end_date: "" }])
    } catch (err) { setToast(err.message) }
  }
  function updateExperienceLocal(id, key, value) {
    setExperiences((prev) => prev.map((x) => (x.id === id ? { ...x, [key]: value } : x)))
  }
  async function removeExperience(id) {
    try { await deleteExperience(id); setExperiences((prev) => prev.filter((x) => x.id !== id)) } catch (err) { setToast(err.message) }
  }

  async function addEducation() {
    try {
      const row = await createEducation(profileId, { course: "", institution: "", current: false })
      setEducations((prev) => [...prev, { ...row, start_date: "", end_date: "" }])
    } catch (err) { setToast(err.message) }
  }
  function updateEducationLocal(id, key, value) {
    setEducations((prev) => prev.map((x) => (x.id === id ? { ...x, [key]: value } : x)))
  }
  async function removeEducation(id) {
    try { await deleteEducation(id); setEducations((prev) => prev.filter((x) => x.id !== id)) } catch (err) { setToast(err.message) }
  }

  async function addSkill() {
    const name = skillInput.trim()
    if (!name) return
    try {
      const row = await createSkill(profileId, name)
      setSkills((prev) => [...prev, row])
      setSkillInput("")
    } catch (err) { setToast(err.message) }
  }
  async function removeSkill(id) {
    try { await deleteSkill(id); setSkills((prev) => prev.filter((s) => s.id !== id)) } catch (err) { setToast(err.message) }
  }

  const initials = profile ? `${profile.first_name?.[0] ?? ""}${profile.last_name?.[0] ?? ""}`.toUpperCase() : ""

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white">
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-purple-200">
              <Sparkles size={13} /> Seu perfil base
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Meu Perfil Profissional</h1>
              <p className="text-slate-300 max-w-xl">
                Cadastre suas informações principais uma única vez e use esses dados como
                base para criar currículos personalizados para diferentes vagas.
              </p>
            </div>
          </div>
          <button
            onClick={handleSave} disabled={saving || loading || !profile}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Salvando…" : "Salvar perfil"}
          </button>
        </div>
      </section>

      {loading || !profile ? (
        <div className="flex-1 flex items-center justify-center py-32 text-slate-500"><Loader2 size={28} className="animate-spin" /></div>
      ) : loadError ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-32 px-6 text-center">
          <p className="text-slate-700">{loadError}</p>
          <button onClick={load} className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer">Tentar novamente</button>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">

          {/* Informações pessoais */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 text-slate-800">
              <UserIcon size={18} /><h2 className="text-lg font-semibold">Informações pessoais</h2>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xl font-semibold shrink-0">
                {profile.avatar ? <img src={profile.avatar} alt="Foto de perfil" className="w-full h-full object-cover" /> : (initials || "FOTO")}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Foto de perfil</p>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatar} className="hidden" />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm hover:bg-slate-100 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploadingAvatar ? <><Loader2 size={16} className="animate-spin" /> Enviando…</> : <><Upload size={16} /> Alterar foto</>}
                </button>
                <p className="text-xs text-slate-400">JPG, PNG ou WEBP • até 2MB. Use uma imagem profissional.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome" value={profile.first_name} onChange={(e) => setField("first_name", e.target.value)} />
              <Field label="Sobrenome" value={profile.last_name} onChange={(e) => setField("last_name", e.target.value)} />
              <div className="sm:col-span-2"><Field label="Cargo / título profissional" value={profile.title} onChange={(e) => setField("title", e.target.value)} /></div>
              <Field label="Cidade" value={profile.city} onChange={(e) => setField("city", e.target.value)} />
              <Field label="Estado" value={profile.state} onChange={(e) => setField("state", e.target.value)} />
              <Field label="E-mail" type="email" value={profile.email} onChange={(e) => setField("email", e.target.value)} />
              <Field label="Telefone" value={profile.phone} onChange={(e) => setField("phone", e.target.value)} />
              <Field label="LinkedIn" value={profile.linkedin} onChange={(e) => setField("linkedin", e.target.value)} />
              <Field label="GitHub" value={profile.github} onChange={(e) => setField("github", e.target.value)} />
              <div className="sm:col-span-2"><Field label="Portfólio / site" value={profile.portfolio} onChange={(e) => setField("portfolio", e.target.value)} /></div>
            </div>
          </section>

          {/* Experiências */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800"><Briefcase size={18} /><h2 className="text-lg font-semibold">Experiências profissionais</h2></div>
              <button onClick={addExperience} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer"><Plus size={16} /> Adicionar</button>
            </div>
            {experiences.length === 0 && <p className="text-sm text-slate-400">Nenhuma experiência adicionada.</p>}
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border border-slate-200 rounded-lg p-4 space-y-4 bg-slate-50/50">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Cargo" value={exp.role} placeholder="Ex: Desenvolvedor Front-end" onChange={(e) => updateExperienceLocal(exp.id, "role", e.target.value)} />
                    <Field label="Empresa" value={exp.company} placeholder="Ex: Empresa X" onChange={(e) => updateExperienceLocal(exp.id, "company", e.target.value)} />
                    <Field label="Início" type="month" value={exp.start_date} onChange={(e) => updateExperienceLocal(exp.id, "start_date", e.target.value)} />
                    <Field label="Fim" type="month" value={exp.end_date} disabled={exp.current} onChange={(e) => updateExperienceLocal(exp.id, "end_date", e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" checked={exp.current} onChange={(e) => updateExperienceLocal(exp.id, "current", e.target.checked)} className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                      Ainda trabalho aqui
                    </label>
                    <button onClick={() => removeExperience(exp.id)} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition cursor-pointer"><Trash2 size={16} /> Remover</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Educação */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-800"><GraduationCap size={18} /><h2 className="text-lg font-semibold">Educação</h2></div>
              <button onClick={addEducation} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer"><Plus size={16} /> Adicionar</button>
            </div>
            {educations.length === 0 && <p className="text-sm text-slate-400">Nenhuma formação adicionada.</p>}
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="border border-slate-200 rounded-lg p-4 space-y-4 bg-slate-50/50">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Curso" value={edu.course} placeholder="Ex: Análise e Desenvolvimento de Sistemas" onChange={(e) => updateEducationLocal(edu.id, "course", e.target.value)} />
                    <Field label="Instituição" value={edu.institution} placeholder="Ex: Universidade XYZ" onChange={(e) => updateEducationLocal(edu.id, "institution", e.target.value)} />
                    <Field label="Início" type="month" value={edu.start_date} onChange={(e) => updateEducationLocal(edu.id, "start_date", e.target.value)} />
                    <Field label="Fim" type="month" value={edu.end_date} disabled={edu.current} onChange={(e) => updateEducationLocal(edu.id, "end_date", e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" checked={edu.current} onChange={(e) => updateEducationLocal(edu.id, "current", e.target.checked)} className="rounded border-slate-300 text-purple-600 focus:ring-purple-500" />
                      Em andamento
                    </label>
                    <button onClick={() => removeEducation(edu.id)} className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition cursor-pointer"><Trash2 size={16} /> Remover</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Competências */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-2 text-slate-800"><Wrench size={18} /><h2 className="text-lg font-semibold">Competências</h2></div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {skill.name}
                  <button onClick={() => removeSkill(skill.id)} className="text-slate-400 hover:text-red-600 transition cursor-pointer" aria-label={`Remover ${skill.name}`}>×</button>
                </span>
              ))}
            </div>
            <input
              value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
              placeholder="Digite uma competência e pressione Enter" className={inputClass}
            />
          </section>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white border border-black hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 font-medium text-sm cursor-pointer disabled:opacity-60">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Salvando…" : "Salvar perfil"}
            </button>
          </div>
        </div>
      )}

      <Footer />
      <Toast message={toast} onClose={closeToast} />
    </main>
  )
}
