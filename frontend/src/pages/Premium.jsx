import { useNavigate } from "react-router-dom"
import {
  Sparkles,
  FileDown,
  LayoutTemplate,
  UserCheck,
  Check,
  Lock,
} from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"

const features = [
  {
    icon: <FileDown size={22} />,
    title: "Download em PDF",
    description: "Exporte currículos em alta qualidade, prontos para enviar a recrutadores.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Assistente de IA",
    description: "Gere resumos e adapte o currículo para cada vaga automaticamente.",
  },
  {
    icon: <LayoutTemplate size={22} />,
    title: "Templates avançados",
    description: "Acesse layouts exclusivos pensados para se destacar e passar em ATS.",
  },
  {
    icon: <UserCheck size={22} />,
    title: "Consultoria especializada",
    description: "Revisão do seu currículo com um especialista em recrutamento.",
  },
]

const plan = {
  name: "ProTalent Premium",
  price: "R$ 29",
  period: "/mês",
  perks: [
    "Downloads ilimitados em PDF",
    "Assistente de IA para vagas",
    "Todos os templates avançados",
    "1 consultoria por mês",
    "Suporte prioritário",
  ],
}

export default function Premium() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="max-w-5xl mx-auto w-full px-6 pt-20 pb-12 text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium border border-purple-100">
          <Sparkles size={14} />
          Recursos Premium
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Leve seu currículo ao{" "}
          <span className="text-purple-600">próximo nível</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Desbloqueie recursos avançados pensados para acelerar suas
          oportunidades no mercado de trabalho.
        </p>
      </section>

      {/* Recursos bloqueados */}
      <section className="max-w-5xl mx-auto w-full px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-3"
            >
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                <Lock size={12} />
                Bloqueado
              </span>
              <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Plano + CTA */}
      <section className="max-w-3xl mx-auto w-full px-6 pb-24">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden md:grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 flex flex-col justify-center">
            <p className="text-sm text-slate-300">{plan.name}</p>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-slate-300 mb-1">{plan.period}</span>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Cancele quando quiser. Sem fidelidade.
            </p>
          </div>

          <div className="p-8 space-y-5">
            <ul className="space-y-3">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check size={18} className="text-purple-600 shrink-0 mt-0.5" />
                  {perk}
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/buy")}
              className="w-full px-6 py-3 rounded-xl bg-black text-white hover:bg-white hover:text-black border border-black transition font-medium text-sm cursor-pointer"
            >
              Assinar Premium
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
