import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  FileText,
  Download,
  Copy,
  Trash2,
} from "lucide-react"

const PAGE_SIZE = 5

export default function CurriculosList() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const curriculos = [
    { id: 1, nome: "Currículo Front-end", atualizadoEm: new Date(), status: "atualizado" },
    { id: 2, nome: "Currículo Analista Jr", atualizadoEm: new Date(Date.now() - 86400000), status: "publicado" },
    { id: 3, nome: "Currículo Back-end", atualizadoEm: new Date(Date.now() - 3 * 86400000), status: "rascunho" },
    { id: 4, nome: "Currículo Full Stack", atualizadoEm: new Date(Date.now() - 6 * 86400000), status: "atualizado" },
    { id: 5, nome: "Currículo Mobile", atualizadoEm: new Date(Date.now() - 10 * 86400000), status: "publicado" },
    { id: 6, nome: "Currículo Tech Lead", atualizadoEm: new Date(Date.now() - 15 * 86400000), status: "rascunho" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  function openCurriculo(id) {
    navigate(`/curriculos/${id}`)
  }

  const filtered = useMemo(() => {
    return curriculos.filter(c =>
      c.nome.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  function formatDate(date) {
    const diff = Math.floor((Date.now() - date.getTime()) / 86400000)
    if (diff === 0) return "Hoje"
    if (diff === 1) return "Ontem"
    return `há ${diff} dias`
  }

  function statusBadge(status) {
    const map = {
      rascunho: "bg-slate-100 text-slate-600",
      atualizado: "bg-blue-100 text-blue-700",
      publicado: "bg-green-100 text-green-700",
    }

    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${map[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <section className="w-full px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-slate-800">
          Você tem {curriculos.length} currículos
        </h3>

        <div className="relative w-full md:w-80">
          <input
            value={search}
            onChange={(e) => {
              setPage(1)
              setSearch(e.target.value)
            }}
            placeholder="Buscar currículo..."
            className="w-full h-10 pl-4 pr-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Tabela */}
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
            {loading &&
              Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <tr
                  key={`skeleton-${i}`}
                  className="border-b border-slate-200 animate-pulse"
                >
                  <td className="p-4"><div className="h-4 w-48 bg-slate-200 rounded" /></td>
                  <td className="p-4"><div className="h-4 w-20 bg-slate-200 rounded" /></td>
                  <td className="p-4"><div className="h-4 w-24 bg-slate-200 rounded" /></td>
                  <td className="p-4" />
                </tr>
              ))}

            {!loading && paginated.length === 0 && (
              <tr key="empty">
                <td colSpan={4} className="p-10 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    <FileText size={36} />
                    <p>Nenhum currículo encontrado</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map(c => (
                <tr
                  key={c.id}
                  className="border-b border-slate-200 hover:bg-slate-50 transition"
                >
                  <td className="p-4">
                    <button
                      onClick={() => openCurriculo(c.id)}
                      className="font-medium text-purple-600 hover:underline cursor-pointer"
                    >
                      {c.nome}
                    </button>
                  </td>

                  <td className="p-4">{statusBadge(c.status)}</td>

                  <td className="p-4 text-slate-500 text-sm">
                    {formatDate(c.atualizadoEm)}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-blue-100 text-slate-600 hover:text-blue-900 cursor-pointer">
                        <Download size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer">
                        <Copy size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-100 text-slate-600 hover:text-red-600 cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && filtered.length > 0 && (
          <div className="flex justify-between items-center px-4 py-3">
            <p className="text-sm text-slate-500">
              Página {page} de {totalPages}
            </p>

            <div className="flex gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 text-sm border hover:bg-slate-50 rounded disabled:opacity-40 cursor-pointer"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 text-sm border hover:bg-slate-50 rounded disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
