import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, Check } from "lucide-react"

import Header from "./Header"
import Footer from "./Footer"

/**
 * Página de funcionalidade reutilizável (LinkedIn, Carta, Consultoria).
 * Mantém a identidade visual clara e um estado "em desenvolvimento" elegante,
 * evitando telas vazias.
 */
export default function FeaturePage({
  badge,
  icon,
  title,
  highlight,
  description,
  benefits = [],
}) {
  const navigate = useNavigate()
  const [notified, setNotified] = useState(false)

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="max-w-5xl mx-auto w-full px-6 pt-20 pb-12 text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-sm font-medium border border-blue-100">
          {icon}
          {badge}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          {title} <span className="text-purple-600">{highlight}</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">{description}</p>
      </section>

      {/* Benefícios */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-3"
            >
              <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Em desenvolvimento */}
      <section className="max-w-3xl mx-auto w-full px-6 pb-24">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
            <Clock size={14} />
            Em desenvolvimento
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Estamos finalizando os últimos detalhes
          </h2>
          <p className="text-slate-600 max-w-md mx-auto">
            Esta funcionalidade estará disponível em breve. Avise-nos e seja o
            primeiro a saber quando lançar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setNotified(true)}
              disabled={notified}
              className={`px-6 py-3 rounded-xl border border-black font-medium text-sm transition cursor-pointer ${
                notified
                  ? "bg-purple-50 text-purple-700 border-purple-200 cursor-default"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {notified ? (
                <span className="inline-flex items-center gap-2">
                  <Check size={16} /> Você será avisado
                </span>
              ) : (
                "Avise-me quando lançar"
              )}
            </button>

            <button
              onClick={() => navigate("/home")}
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition font-medium text-sm cursor-pointer"
            >
              Voltar ao início
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
