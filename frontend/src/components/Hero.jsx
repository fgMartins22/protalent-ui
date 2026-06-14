import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Sparkles, ArrowRight } from "lucide-react"

export default function Hero() {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const rafRef = useRef(0)

  // Atualiza o gradiente via CSS variables + rAF, sem re-render do React.
  const handleMouseMove = (e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--x", `${x}%`)
      el.style.setProperty("--y", `${y}%`)
    })
  }

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        "--x": "50%",
        "--y": "50%",
        background:
          "radial-gradient(circle at var(--x) var(--y), #1f2933, #000000 60%)",
      }}
      className="w-full text-white"
    >
      <div className="max-w-5xl mx-auto px-6 py-32 text-center">

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-purple-200 mb-6">
          <Sparkles size={14} />
          Currículos personalizados para cada vaga
        </span>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          O currículo certo para a{" "}
          <span className="text-purple-400">vaga certa</span>
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
          Monte seu perfil uma vez e gere currículos sob medida para cada
          oportunidade — modernos, estratégicos e otimizados para sistemas de
          recrutamento (ATS).
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/curriculos")}
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition cursor-pointer font-medium"
          >
            Criar meu currículo
            <ArrowRight size={18} />
          </button>

          <button
            onClick={scrollToServices}
            className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition cursor-pointer font-medium"
          >
            Ver serviços
          </button>
        </div>

        {/* Métricas de apoio */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
          {[
            { value: "3", label: "layouts profissionais" },
            { value: "ATS", label: "foco em aprovação" },
            { value: "IA", label: "em breve" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
