import { useCallback, useRef, useState } from "react"
import {
  Upload,
  Plus,
  Trash2,
  Save,
  Briefcase,
  GraduationCap,
  Wrench,
  Sparkles,
  User as UserIcon,
} from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Toast from "../components/Toast"
import { profileMock } from "../mocks/profile"

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-700 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"

const labelClass = "text-sm font-medium text-slate-700"

function Field({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} />
    </div>
  )
}

export default function Perfil() {
  const [profile, setProfile] = useState(profileMock)
  const [skillInput, setSkillInput] = useState("")
  const [toast, setToast] = useState(null)
  const fileRef = useRef(null)

  const closeToast = useCallback(() => setToast(null), [])

  function setField(key, value) {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  function handleAvatar(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setField("avatar", reader.result)
    reader.readAsDataURL(file)
  }

  // ---- Experiências ----
  function addExperience() {
    setProfile((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Math.max(0, ...prev.experiences.map((x) => x.id)) + 1,
          role: "",
          company: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }))
  }

  function updateExperience(id, key, value) {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.map((x) =>
        x.id === id ? { ...x, [key]: value } : x
      ),
    }))
  }

  function removeExperience(id) {
    setProfile((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((x) => x.id !== id),
    }))
  }

  // ---- Educação ----
  function addEducation() {
    setProfile((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          id: Math.max(0, ...prev.educations.map((x) => x.id)) + 1,
          course: "",
          institution: "",
          startDate: "",
          endDate: "",
          current: false,
        },
      ],
    }))
  }

  function updateEducation(id, key, value) {
    setProfile((prev) => ({
      ...prev,
      educations: prev.educations.map((x) =>
        x.id === id ? { ...x, [key]: value } : x
      ),
    }))
  }

  function removeEducation(id) {
    setProfile((prev) => ({
      ...prev,
      educations: prev.educations.filter((x) => x.id !== id),
    }))
  }

  // ---- Competências ----
  function addSkill() {
    const value = skillInput.trim()
    if (!value || profile.skills.includes(value)) {
      setSkillInput("")
      return
    }
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, value] }))
    setSkillInput("")
  }

  function removeSkill(skill) {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  function handleSave() {
    // Simulação: sem persistência real ainda
    setToast("Perfil salvo com sucesso")
  }

  const initials =
    `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white">
        {/* Glows sutis */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-end justify-between gap-8">

          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-purple-200">
              <Sparkles size={13} />
              Seu perfil base
            </span>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Meu Perfil Profissional
              </h1>
              <p className="text-slate-300 max-w-xl">
                Cadastre suas informações principais uma única vez e use esses
                dados como base para criar currículos personalizados para
                diferentes vagas.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { icon: <UserIcon size={15} />, label: "Dados reutilizáveis" },
                { icon: <Briefcase size={15} />, label: "Experiências e formação" },
                { icon: <Sparkles size={15} />, label: "Base para a IA" },
              ].map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200"
                >
                  {h.icon}
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer whitespace-nowrap"
          >
            <Save size={18} className="transition-transform group-hover:-translate-y-0.5 duration-200" />
            Salvar perfil
          </button>

        </div>
      </section>

      <div className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10 space-y-8">

        {/* Informações pessoais */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 text-slate-800">
            <UserIcon size={18} />
            <h2 className="text-lg font-semibold">Informações pessoais</h2>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xl font-semibold shrink-0">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Foto do perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials || "FOTO"
              )}
            </div>

            <div className="space-y-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm hover:bg-slate-100 transition cursor-pointer"
              >
                <Upload size={16} />
                Enviar foto
              </button>
              <p className="text-xs text-slate-400">PNG ou JPG. Apenas local.</p>
            </div>
          </div>

          {/* Campos */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nome"
              value={profile.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
            />
            <Field
              label="Sobrenome"
              value={profile.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
            />
            <div className="sm:col-span-2">
              <Field
                label="Cargo / título profissional"
                value={profile.title}
                onChange={(e) => setField("title", e.target.value)}
              />
            </div>
            <Field
              label="Cidade"
              value={profile.city}
              onChange={(e) => setField("city", e.target.value)}
            />
            <Field
              label="Estado"
              value={profile.state}
              onChange={(e) => setField("state", e.target.value)}
            />
            <Field
              label="E-mail"
              type="email"
              value={profile.email}
              onChange={(e) => setField("email", e.target.value)}
            />
            <Field
              label="Telefone"
              value={profile.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
            <Field
              label="LinkedIn"
              value={profile.linkedin}
              onChange={(e) => setField("linkedin", e.target.value)}
            />
            <Field
              label="GitHub"
              value={profile.github}
              onChange={(e) => setField("github", e.target.value)}
            />
            <div className="sm:col-span-2">
              <Field
                label="Portfólio / site"
                value={profile.portfolio}
                onChange={(e) => setField("portfolio", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Experiências */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800">
              <Briefcase size={18} />
              <h2 className="text-lg font-semibold">Experiências profissionais</h2>
            </div>
            <button
              onClick={addExperience}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>

          {profile.experiences.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma experiência adicionada.</p>
          )}

          <div className="space-y-4">
            {profile.experiences.map((exp) => (
              <div
                key={exp.id}
                className="border border-slate-200 rounded-lg p-4 space-y-4 bg-slate-50/50"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Cargo"
                    value={exp.role}
                    placeholder="Ex: Desenvolvedor Front-end"
                    onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  />
                  <Field
                    label="Empresa"
                    value={exp.company}
                    placeholder="Ex: Empresa X"
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  />
                  <Field
                    label="Início"
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                  <Field
                    label="Fim"
                    type="month"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    Ainda trabalho aqui
                  </label>

                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educação */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800">
              <GraduationCap size={18} />
              <h2 className="text-lg font-semibold">Educação</h2>
            </div>
            <button
              onClick={addEducation}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>

          {profile.educations.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma formação adicionada.</p>
          )}

          <div className="space-y-4">
            {profile.educations.map((edu) => (
              <div
                key={edu.id}
                className="border border-slate-200 rounded-lg p-4 space-y-4 bg-slate-50/50"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Curso"
                    value={edu.course}
                    placeholder="Ex: Análise e Desenvolvimento de Sistemas"
                    onChange={(e) => updateEducation(edu.id, "course", e.target.value)}
                  />
                  <Field
                    label="Instituição"
                    value={edu.institution}
                    placeholder="Ex: Universidade XYZ"
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  />
                  <Field
                    label="Início"
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  />
                  <Field
                    label="Fim"
                    type="month"
                    value={edu.endDate}
                    disabled={edu.current}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    Em andamento
                  </label>

                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600 transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competências */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 text-slate-800">
            <Wrench size={18} />
            <h2 className="text-lg font-semibold">Competências</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-slate-400 hover:text-red-600 transition cursor-pointer"
                  aria-label={`Remover ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill()
              }
            }}
            placeholder="Digite uma competência e pressione Enter"
            className={inputClass}
          />
        </section>

        {/* Salvar */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white border border-black hover:bg-white hover:text-black transition font-medium text-sm cursor-pointer"
          >
            <Save size={18} />
            Salvar perfil
          </button>
        </div>
      </div>

      <Footer />

      <Toast message={toast} onClose={closeToast} />
    </main>
  )
}
