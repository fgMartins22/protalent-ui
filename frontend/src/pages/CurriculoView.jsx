import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowBigDownDash, Loader2, ArrowLeft } from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Toast from "../components/Toast"

import StandardLayout from "../layouts/curriculo/StandardLayout"
import ProfileLayout from "../layouts/curriculo/ProfileLayout"
import ModernLayout from "../layouts/curriculo/ModernLayout"

import { updateResume } from "../services/api"
import { loadResumeView } from "../services/resumeData"

const LAYOUTS = [
  { id: "standard", label: "Padrão", recommended: true, component: StandardLayout },
  { id: "profile", label: "Básico", component: ProfileLayout },
  { id: "modern", label: "Moderno", component: ModernLayout },
]

export default function CurriculoView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const [activeLayout, setActiveLayout] = useState(LAYOUTS[0])
  const [savedLayout, setSavedLayout] = useState(LAYOUTS[0])
  const [data, setData] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const { resume, data: built } = await loadResumeView(id)
      const layout = LAYOUTS.find((l) => l.id === resume.layout) ?? LAYOUTS[0]
      setActiveLayout(layout)
      setSavedLayout(layout)
      setData(built)
    } catch (err) {
      setLoadError(err.message || "Falha ao carregar o currículo")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { load() }, [load])

  const ActiveLayoutComponent = activeLayout.component
  const hasChanges = activeLayout.id !== savedLayout.id

  function handleChange(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateResume(id, {
        layout: activeLayout.id,
        professional_summary: data.resumo,
        experience_description: data.experienciaDescricao,
        education_description: data.educacaoDescricao,
        status: "updated",
      })
      setSavedLayout(activeLayout)
      setEditing(false)
      setToast("Alterações salvas")
    } catch (err) {
      setToast(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-32 text-slate-500"><Loader2 size={26} className="animate-spin" /></div>
        <Footer />
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-32 px-6 text-center">
          <p className="text-slate-700">{loadError}</p>
          <button onClick={() => navigate("/curriculos")} className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer">
            Voltar aos currículos
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="flex-1 bg-slate-50 flex flex-col min-h-screen">
      <Header />
      <div className="max-w-5xl mx-auto w-full px-4 py-8 space-y-6">
        <button onClick={() => navigate("/curriculos")} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition cursor-pointer">
          <ArrowLeft size={16} /> Voltar
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto">
            {LAYOUTS.map((layout) => (
              <button
                key={layout.id} onClick={() => setActiveLayout(layout)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  activeLayout.id === layout.id ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {layout.label}
                {layout.recommended && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">recomendado</span>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setToast("Download do PDF iniciado (simulado)")} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-black text-black hover:bg-black hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              <ArrowBigDownDash size={18} /> Download PDF
            </button>
            <button onClick={() => setEditing((p) => !p)} className="px-4 py-2 font-medium text-sm rounded-lg border border-black hover:bg-black hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              {editing ? "Cancelar edição" : "Editar"}
            </button>
            <button
              onClick={handleSave} disabled={saving || (!hasChanges && !editing)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                (hasChanges || editing) ? "bg-purple-600 text-white hover:bg-purple-700 hover:-translate-y-0.5 active:translate-y-0" : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Salvando…" : "Salvar alterações"}
            </button>
          </div>
        </div>

        <ActiveLayoutComponent data={data} editing={editing} onChange={handleChange} />
      </div>
      <Footer />
      <Toast message={toast} onClose={closeToast} />
    </main>
  )
}
