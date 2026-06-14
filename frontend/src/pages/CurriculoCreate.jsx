import { useEffect, useState } from "react"
import { Sparkles, Loader2, Check, AlignLeft, List, Lock } from "lucide-react"

import { getProfile, listExperiences, listEducations, listSkills, createResume } from "../services/api"

// Geração simulada (sem IA/API real) usando o perfil real como contexto.
function generateDescription(style, vaga, ctx) {
  const topSkills = (ctx.skills ?? []).slice(0, 4)
  const lastExp = ctx.experiences?.[0]
  const edu = ctx.educations?.[0]
  const foco = vaga.trim() ? vaga.trim().split(/\s+/).slice(0, 8).join(" ").toLowerCase() : "os objetivos da vaga"

  if (style === "bullets") {
    return [
      lastExp && `Atuação como ${lastExp.role} na ${lastExp.company}`,
      topSkills.length && `Domínio de ${topSkills.join(", ")}`,
      edu && `Formação em ${edu.course} (${edu.institution})`,
      `Perfil alinhado a ${foco}`,
      "Foco em entrega de valor, performance e boas práticas",
    ].filter(Boolean).map((l) => `• ${l}`).join("\n")
  }

  return (
    `${ctx.title || "Profissional"} com experiência prática em ${topSkills.join(", ") || "diversas tecnologias"}. ` +
    (lastExp ? `Atuou como ${lastExp.role} na ${lastExp.company}, entregando soluções modernas e orientadas a resultado. ` : "") +
    `Perfil alinhado a ${foco}${edu ? `, com formação em ${edu.course}` : ""}.`
  )
}

export default function CurriculoCreate({ profileId, onBack }) {
  const [nome, setNome] = useState("")
  const [vaga, setVaga] = useState("")
  const [style, setStyle] = useState("texto") // texto | bullets
  const [iaStatus, setIaStatus] = useState("idle") // idle | analyzing | done
  const [descricao, setDescricao] = useState("")
  const [status, setStatus] = useState("idle") // idle | saving | success
  const [ctx, setCtx] = useState({ title: "", skills: [], experiences: [], educations: [] })

  useEffect(() => {
    let active = true
    Promise.all([
      getProfile(profileId),
      listExperiences(profileId),
      listEducations(profileId),
      listSkills(profileId),
    ])
      .then(([p, exps, edus, sks]) => {
        if (!active) return
        setCtx({ title: p.title, skills: sks.map((s) => s.name), experiences: exps, educations: edus })
      })
      .catch(() => {})
    return () => { active = false }
  }, [profileId])

  const hasVaga = vaga.trim().length > 0
  const canSubmit = nome.trim().length > 0 && status === "idle"
  const saving = status === "saving"
  const success = status === "success"
  const disabled = saving || success

  function handleGenerate() {
    if (!hasVaga) return
    setIaStatus("analyzing")
    setTimeout(() => {
      setDescricao(generateDescription(style, vaga, ctx))
      setIaStatus("done")
    }, 1600)
  }

  async function handleCreate() {
    if (!canSubmit) return
    setStatus("saving")
    try {
      await createResume(profileId, {
        name: nome.trim(),
        layout: "standard",
        output_type: style === "bullets" ? "bullets" : "text",
        job_description: vaga.trim() || null,
        professional_summary: descricao.trim() || null,
        status: "draft",
      })
      setStatus("success")
      setTimeout(() => onBack(), 900)
    } catch {
      setStatus("idle")
    }
  }

  const styleOptions = [
    { id: "texto", label: "Texto descritivo", icon: <AlignLeft size={16} /> },
    { id: "bullets", label: "Bullet points", icon: <List size={16} /> },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-7 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nome do currículo</label>
          <input
            type="text" value={nome} onChange={(e) => setNome(e.target.value)} disabled={disabled}
            placeholder="Ex: Front-end React • Vaga XP"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-sm disabled:bg-slate-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            Descrição da vaga
            <span className="text-xs font-normal text-slate-400">(opcional)</span>
          </label>
          <textarea
            rows={5} value={vaga} onChange={(e) => setVaga(e.target.value)} disabled={disabled}
            placeholder="Cole aqui os requisitos e responsabilidades da vaga..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-sm resize-none disabled:bg-slate-50"
          />
          <p className="text-xs text-slate-400">
            Opcional. Cole a vaga para gerar uma descrição sob medida com IA — ou crie o currículo direto a partir do seu perfil.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Estilo da descrição</label>
          <div className="flex flex-wrap gap-3">
            {styleOptions.map((opt) => (
              <button
                key={opt.id} onClick={() => setStyle(opt.id)} disabled={disabled}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition cursor-pointer ${
                  style === opt.id ? "border-purple-600 bg-purple-50 text-purple-700" : "border-slate-300 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.icon}{opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Sparkles size={16} className="text-purple-600" />
              Descrição com IA
              <span className="inline-flex items-center gap-1 text-xs font-normal text-slate-400"><Lock size={12} /> simulação</span>
            </div>
            <button
              onClick={handleGenerate} disabled={disabled || !hasVaga || iaStatus === "analyzing"}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {iaStatus === "analyzing" ? (<><Loader2 size={16} className="animate-spin" />Analisando vaga…</>) : (<><Sparkles size={16} />{iaStatus === "done" ? "Gerar novamente" : "Gerar com IA"}</>)}
            </button>
          </div>

          {iaStatus === "analyzing" && (
            <p className="text-sm text-slate-500">Analisando requisitos da vaga e cruzando com seu perfil…</p>
          )}
          {iaStatus === "done" && (
            <div className="space-y-2">
              <textarea
                rows={7} value={descricao} onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-sm resize-none"
              />
              <p className="text-xs text-slate-400">Texto gerado por simulação. Você pode editar livremente.</p>
            </div>
          )}
          {iaStatus === "idle" && (
            <p className="text-sm text-slate-500">
              {hasVaga ? "Gere uma pré-descrição com base no seu perfil e na vaga." : "Cole a descrição da vaga acima para gerar uma descrição com IA (opcional)."}
            </p>
          )}
        </div>

        {(saving || success) && (
          <div className={`flex items-center gap-3 rounded-xl border p-4 text-sm ${success ? "bg-green-50 border-green-100 text-green-700" : "bg-purple-50 border-purple-100 text-purple-700"}`}>
            {success ? <Check size={18} /> : <Loader2 size={18} className="animate-spin" />}
            <span className="font-medium">
              {success ? "Currículo criado! Voltando para a listagem…" : hasVaga ? "Analisando vaga e preparando currículo…" : "Criando currículo com base no seu perfil…"}
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          {!canSubmit && status === "idle" && (
            <span className="text-xs text-slate-400">Dê um nome ao currículo para continuar</span>
          )}
          <button
            onClick={handleCreate} disabled={!canSubmit}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
              success ? "bg-green-600 text-white" : "bg-slate-900 text-white hover:bg-black"
            } ${!disabled ? "cursor-pointer" : ""}`}
          >
            {saving && (<><Loader2 size={16} className="animate-spin" />Criando…</>)}
            {success && (<><Check size={16} />Currículo criado!</>)}
            {status === "idle" && "Criar currículo"}
          </button>
        </div>
      </div>
    </div>
  )
}
