import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search, FileText, Download, Copy, Trash2, Clock, CheckCircle2, Send, PenLine, Loader2,
} from "lucide-react"

import Toast from "../components/Toast"
import { listResumes, createResume, deleteResume } from "../services/api"
import { loadResumeView } from "../services/resumeData"
import { exportResumePdf } from "../services/exportResume"

const PAGE_SIZE = 5

function formatDate(value) {
  if (!value) return "—"
  const diff = Math.floor((Date.now() - new Date(value).getTime()) / 86400000)
  if (diff <= 0) return "Hoje"
  if (diff === 1) return "Ontem"
  return `há ${diff} dias`
}

function statusBadge(status) {
  const map = {
    draft: "bg-slate-100 text-slate-600",
    updated: "bg-blue-100 text-blue-700",
    published: "bg-green-100 text-green-700",
  }
  const label = { draft: "rascunho", updated: "atualizado", published: "publicado" }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status] ?? map.draft}`}>
      {label[status] ?? status}
    </span>
  )
}

export default function CurriculosList({ profileId }) {
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [toast, setToast] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [exportingId, setExportingId] = useState(null)

  const closeToast = useCallback(() => setToast(null), [])

  const load = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      setItems(await listResumes(profileId))
    } catch (err) {
      setLoadError(err.message || "Falha ao carregar currículos")
    } finally {
      setLoading(false)
    }
  }, [profileId])

  useEffect(() => { load() }, [load])

  function openCurriculo(id) {
    navigate(`/curriculos/${id}`)
  }

  const filtered = useMemo(
    () => items.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  )

  async function handleDuplicate(c) {
    try {
      const copy = await createResume(profileId, {
        name: `${c.name} (cópia)`,
        layout: c.layout,
        output_type: c.output_type,
        job_description: c.job_description,
        professional_summary: c.professional_summary,
        experience_description: c.experience_description,
        education_description: c.education_description,
        status: "draft",
      })
      setItems((prev) => [copy, ...prev])
      setToast("Currículo duplicado")
    } catch (err) { setToast(err.message) }
  }

  async function handleExport(c) {
    if (exportingId) return
    setExportingId(c.id)
    try {
      const { resume, data } = await loadResumeView(c.id)
      await exportResumePdf(resume.layout, data, resume.name)
      setToast("Exportação concluída")
    } catch (err) {
      console.error("Erro ao exportar currículo:", err)
      setToast("Erro ao exportar o PDF")
    } finally {
      setExportingId(null)
    }
  }

  async function confirmDelete() {
    const id = confirmId
    setConfirmId(null)
    try {
      await deleteResume(id)
      setItems((prev) => prev.filter((c) => c.id !== id))
      setToast("Currículo excluído")
    } catch (err) { setToast(err.message) }
  }

  const confirmTarget = items.find((c) => c.id === confirmId)

  const stats = useMemo(() => ({
    total: items.length,
    atualizados: items.filter((c) => c.status === "updated").length,
    publicados: items.filter((c) => c.status === "published").length,
    rascunhos: items.filter((c) => c.status === "draft").length,
  }), [items])

  const recent = items[0] ?? null

  const statCards = [
    { label: "Total", value: stats.total, icon: <FileText size={18} />, color: "text-slate-700 bg-slate-100" },
    { label: "Atualizados", value: stats.atualizados, icon: <PenLine size={18} />, color: "text-blue-700 bg-blue-100" },
    { label: "Publicados", value: stats.publicados, icon: <Send size={18} />, color: "text-green-700 bg-green-100" },
    { label: "Rascunhos", value: stats.rascunhos, icon: <Clock size={18} />, color: "text-slate-600 bg-slate-100" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-500">
        <Loader2 size={26} className="animate-spin" />
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="text-slate-700">{loadError}</p>
        <button onClick={load} className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <section className="w-full space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex items-center gap-3">
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>{card.icon}</span>
            <div>
              <p className="text-2xl font-bold text-slate-900 leading-none">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {recent && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-purple-300">
              <CheckCircle2 size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-300">Editado recentemente</p>
              <p className="font-semibold">{recent.name}</p>
            </div>
          </div>
          <button onClick={() => openCurriculo(recent.id)} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-slate-100 transition cursor-pointer">
            Continuar editando
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-xl font-semibold text-slate-800">
          {items.length === 0 ? "Nenhum currículo ainda" : `Você tem ${items.length} currículos`}
        </h3>
        <div className="relative w-full md:w-80">
          <input
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value) }}
            placeholder="Buscar currículo..."
            className="w-full h-10 pl-4 pr-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
          />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-300">
            <tr>
              <th className="p-4 text-sm font-medium text-slate-600">Currículo</th>
              <th className="p-4 text-sm font-medium text-slate-600">Status</th>
              <th className="p-4 text-sm font-medium text-slate-600">Última edição</th>
              <th className="p-4 text-sm font-medium text-slate-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td colSpan={4} className="p-10 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    <FileText size={36} />
                    <p>Nenhum currículo encontrado</p>
                  </div>
                </td>
              </tr>
            )}
            {paginated.map((c) => (
              <tr key={c.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                <td className="p-4">
                  <button onClick={() => openCurriculo(c.id)} className="font-medium text-purple-600 hover:underline cursor-pointer">
                    {c.name}
                  </button>
                </td>
                <td className="p-4">{statusBadge(c.status)}</td>
                <td className="p-4 text-slate-500 text-sm">{formatDate(c.updated_at)}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleExport(c)} disabled={exportingId === c.id} title="Exportar PDF" className="p-2 rounded-lg hover:bg-blue-100 text-slate-600 hover:text-blue-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      {exportingId === c.id ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                    <button onClick={() => handleDuplicate(c)} title="Duplicar" className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer">
                      <Copy size={18} />
                    </button>
                    <button onClick={() => setConfirmId(c.id)} title="Excluir" className="p-2 rounded-lg hover:bg-red-100 text-slate-600 hover:text-red-600 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length > 0 && (
          <div className="flex justify-between items-center px-4 py-3">
            <p className="text-sm text-slate-500">Página {safePage} de {totalPages}</p>
            <div className="flex gap-1">
              <button disabled={safePage === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 text-sm border hover:bg-slate-50 rounded disabled:opacity-40 cursor-pointer">Prev</button>
              <button disabled={safePage === totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 text-sm border hover:bg-slate-50 rounded disabled:opacity-40 cursor-pointer">Next</button>
            </div>
          </div>
        )}
      </div>

      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 space-y-4">
            <h4 className="text-lg font-semibold text-slate-800">Excluir currículo?</h4>
            <p className="text-sm text-slate-600">
              O currículo <span className="font-medium">{confirmTarget.name}</span> será removido. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setConfirmId(null)} className="px-4 py-2 text-sm rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition cursor-pointer">Cancelar</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer">Excluir</button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast} onClose={closeToast} />
    </section>
  )
}
