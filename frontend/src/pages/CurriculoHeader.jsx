import { Plus, ArrowLeft, FileText, Sparkles, Download } from "lucide-react"

export default function CurriculosHeader({ mode, setMode }) {
  const isList = mode === "list"

  const title = isList ? "Meus Currículos" : "Criar novo currículo"
  const subtitle = isList
    ? "Gerencie, edite e baixe seus currículos em um só lugar."
    : "Crie um currículo personalizado e direcionado para uma vaga específica."

  const highlights = [
    { icon: <FileText size={15} />, label: "3 layouts profissionais" },
    { icon: <Sparkles size={15} />, label: "Descrições com IA (em breve)" },
    { icon: <Download size={15} />, label: "Exportação em PDF" },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white">
      {/* Glows sutis */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-end justify-between gap-8">

        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-purple-200">
            <Sparkles size={13} />
            Área de currículos
          </span>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-slate-300 max-w-xl">
              {subtitle}
            </p>
          </div>

          {isList && (
            <div className="flex flex-wrap gap-2 pt-1">
              {highlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200"
                >
                  {h.icon}
                  {h.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => setMode(isList ? "create" : "list")}
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-white text-black hover:bg-purple-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg cursor-pointer whitespace-nowrap"
        >
          {isList ? (
            <>
              <Plus size={18} className="transition-transform group-hover:rotate-90 duration-200" />
              Criar novo currículo
            </>
          ) : (
            <>
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5 duration-200" />
              Voltar
            </>
          )}
        </button>

      </div>
    </section>
  )
}
