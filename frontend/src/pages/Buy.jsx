import { useCallback, useState } from "react"
import {
  CreditCard,
  QrCode,
  Barcode,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  LayoutTemplate,
  FileDown,
  Linkedin,
  UserCheck,
  Zap,
} from "lucide-react"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Toast from "../components/Toast"

/* Bandeiras (detecção por prefixo). Ordem importa: específicos antes de genéricos. */
const CARD_BRANDS = [
  { id: "visa", label: "VISA", className: "text-blue-400", test: (n) => /^4/.test(n) },
  { id: "amex", label: "AMEX", className: "text-cyan-300", test: (n) => /^3[47]/.test(n) },
  { id: "diners", label: "DINERS", className: "text-slate-200", test: (n) => /^3(?:0[0-5]|[68])/.test(n) },
  { id: "hipercard", label: "HIPERCARD", className: "text-red-400", test: (n) => /^(3841|6062|6370|6372|6375)/.test(n) },
  { id: "elo", label: "ELO", className: "text-yellow-300", test: (n) => /^(4011|4312|4389|4514|4576|5041|5066|5067|5090|6277|6362|6363|6500)/.test(n) },
  { id: "discover", label: "DISCOVER", className: "text-orange-400", test: (n) => /^6(?:011|5)/.test(n) },
  { id: "aura", label: "AURA", className: "text-purple-300", test: (n) => /^50/.test(n) },
  { id: "mastercard", label: "MASTER", isCircles: true, test: (n) => /^(5[1-5]|2[2-7])/.test(n) },
]

function detectBrand(number) {
  const clean = number.replace(/\D/g, "")
  if (!clean) return null
  return CARD_BRANDS.find((b) => b.test(clean)) ?? null
}

/* QR Code falso (matriz determinística) */
const QR_SIZE = 21
const QR_MATRIX = Array.from({ length: QR_SIZE }, (_, i) =>
  Array.from({ length: QR_SIZE }, (_, j) => (i * 3 + j * 7 + i * j * 5) % 4 === 0)
)

/* Código de barras falso (larguras determinísticas) */
const BARCODE = Array.from({ length: 64 }, (_, i) =>
  (i * 7 + 3) % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1
)

const PIX_KEY = "protalent-premium@pix.fake.br"

/* Cartão: recorrência mensal OU pagamentos únicos (anual à vista / 1 mês). */
const CARD_PLANS = [
  { id: "mensal", label: "Recorrência mensal", price: 29, recurring: true, hint: "Cobrança mensal automática, sem fidelidade." },
  { id: "anual", label: "Anual à vista", price: 290, recurring: false, hint: "Pagamento único anual, sem recorrência." },
  { id: "unico", label: "Somente 1 mês", price: 29, recurring: false, hint: "Pagamento único, sem recorrência." },
]

/* PIX e Boleto: sempre avulsos (sem recorrência). */
const DURATIONS = [
  { id: 1, label: "1 mês", price: 29 },
  { id: 3, label: "3 meses", price: 84 },
  { id: 6, label: "6 meses", price: 162 },
  { id: 12, label: "12 meses", price: 290 },
]

function getSelection(method, cardPlanId, durationId) {
  if (method === "card") {
    const p = CARD_PLANS.find((x) => x.id === cardPlanId) ?? CARD_PLANS[0]
    return {
      methodLabel: "Cartão de crédito",
      planLabel: p.label,
      price: p.price,
      recurring: p.recurring,
      activation: p.recurring
        ? "Renovação automática mensal. Cancele quando quiser."
        : "Pagamento único, sem renovação.",
    }
  }
  const d = DURATIONS.find((x) => x.id === durationId) ?? DURATIONS[0]
  if (method === "pix") {
    return {
      methodLabel: "PIX",
      planLabel: d.label,
      price: d.price,
      recurring: false,
      activation: "Ativação após a confirmação do pagamento.",
    }
  }
  return {
    methodLabel: "Boleto",
    planLabel: d.label,
    price: d.price,
    recurring: false,
    activation: "Ativação após a compensação do boleto.",
  }
}

function DurationSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700">Duração</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DURATIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => onChange(d.id)}
            className={`rounded-xl border p-3 text-center transition cursor-pointer ${
              value === d.id ? "border-purple-600 bg-purple-50" : "border-slate-300 hover:bg-slate-50"
            }`}
          >
            <p className={`text-sm font-medium ${value === d.id ? "text-purple-700" : "text-slate-700"}`}>
              {d.label}
            </p>
            <p className="text-xs text-slate-500">R$ {d.price}</p>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400">Pagamento único (avulso), sem recorrência.</p>
    </div>
  )
}

const benefits = [
  { icon: <Sparkles size={20} />, title: "IA para currículos", desc: "Gere descrições sob medida para cada vaga." },
  { icon: <LayoutTemplate size={20} />, title: "Templates premium", desc: "Layouts exclusivos de alto impacto." },
  { icon: <FileDown size={20} />, title: "Download PDF avançado", desc: "Exportação ilimitada em alta qualidade." },
  { icon: <Linkedin size={20} />, title: "Otimização do LinkedIn", desc: "Perfil alinhado para atrair recrutadores." },
  { icon: <UserCheck size={20} />, title: "Consultoria", desc: "Revisão com especialista em recrutamento." },
  { icon: <Zap size={20} />, title: "Recursos futuros", desc: "Acesso antecipado a novidades." },
]

const comparison = [
  { feature: "Criação de currículos", free: "Limitada", premium: "Ilimitada" },
  { feature: "Download em PDF", free: false, premium: true },
  { feature: "Templates premium", free: false, premium: true },
  { feature: "Assistente de IA", free: false, premium: true },
  { feature: "Otimização do LinkedIn", free: false, premium: true },
  { feature: "Consultoria", free: false, premium: true },
]

const PAYMENT_METHODS = [
  { id: "card", label: "Cartão", icon: <CreditCard size={18} /> },
  { id: "pix", label: "PIX", icon: <QrCode size={18} /> },
  { id: "boleto", label: "Boleto", icon: <Barcode size={18} /> },
]

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none text-sm"

export default function Buy() {
  const [method, setMethod] = useState("card")
  const [cardPlanId, setCardPlanId] = useState("mensal")
  const [durationId, setDurationId] = useState(1)
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvc: "" })
  const [isFlipped, setIsFlipped] = useState(false)

  const [boleto, setBoleto] = useState({ nome: "", cpf: "", endereco: "" })
  const [copied, setCopied] = useState(false)

  const brand = detectBrand(cardData.number)
  const selection = getSelection(method, cardPlanId, durationId)

  const applyMask = (name, value) => {
    if (name === "number")
      return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").substring(0, 19)
    if (name === "expiry")
      return value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/").substring(0, 5)
    if (name === "cvc") return value.replace(/\D/g, "").substring(0, 4)
    return value
  }

  const handleCard = (field, value) =>
    setCardData((prev) => ({ ...prev, [field]: applyMask(field, value) }))

  const maskCpf = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14)

  function copyPix() {
    navigator.clipboard?.writeText(PIX_KEY)
    setCopied(true)
    setToast("Chave PIX copiada")
    setTimeout(() => setCopied(false), 2500)
  }

  function handlePay() {
    setToast("Pagamento processado (simulado)")
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-black text-white">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-14 text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-purple-200">
            <ShieldCheck size={14} />
            Checkout seguro
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">
            Assine o <span className="text-purple-400">ProTalent Premium</span>
          </h1>
          <p className="text-slate-300">Desbloqueie todos os recursos. Cancele quando quiser.</p>
        </div>
      </section>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[1fr_360px] gap-8">

        {/* Pagamento */}
        <div className="space-y-6">

          {/* Seletor de método */}
          <div className="grid grid-cols-3 gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                  method === m.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* CARTÃO */}
          {method === "card" && (
            <div className="space-y-6">
              {/* Seletor de plano */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-2">
                <p className="text-sm font-medium text-slate-700">Escolha o plano</p>
                {CARD_PLANS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCardPlanId(p.id)}
                    className={`w-full text-left rounded-xl border p-3 transition cursor-pointer ${
                      cardPlanId === p.id ? "border-purple-600 bg-purple-50" : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{p.label}</span>
                          <span
                            className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full ${
                              p.recurring ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {p.recurring ? "Recorrente" : "Pagamento único"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{p.hint}</p>
                      </div>
                      <p className="font-semibold text-slate-900 whitespace-nowrap">
                        R$ {p.price}
                        {p.recurring ? "/mês" : ""}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cartão visual */}
              <div
                className="w-full max-w-[400px] mx-auto h-[230px] [perspective:1000px] cursor-pointer"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* Frente */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl p-7 [backface-visibility:hidden] shadow-2xl flex flex-col justify-between border border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 border border-yellow-600/40" />
                      <div className="h-9 flex items-center">
                        {brand?.isCircles ? (
                          <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-red-600 opacity-90" />
                            <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-90" />
                          </div>
                        ) : brand ? (
                          <span className={`text-xl font-black italic uppercase tracking-tight ${brand.className}`}>
                            {brand.label}
                          </span>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-dashed" />
                        )}
                      </div>
                    </div>
                    <div className="text-[21px] tracking-[0.12em] font-mono">
                      {cardData.number || "0000 0000 0000 0000"}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex-1 mr-4 overflow-hidden">
                        <p className="text-[10px] opacity-50 uppercase mb-1">Titular</p>
                        <p className="text-sm font-bold tracking-widest truncate">
                          {cardData.name.toUpperCase() || "NOME DO CLIENTE"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] opacity-50 uppercase mb-1">Validade</p>
                        <p className="text-sm font-bold tracking-widest">{cardData.expiry || "MM/AA"}</p>
                      </div>
                    </div>
                  </div>
                  {/* Verso */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl flex flex-col py-7 border border-white/10">
                    <div className="w-full h-11 bg-black/90 mt-2" />
                    <div className="px-8 mt-6">
                      <div className="w-full bg-white h-10 rounded flex items-center justify-end px-4">
                        <span className="text-black font-mono font-bold italic tracking-[0.2em]">
                          {cardData.cvc || "***"}
                        </span>
                      </div>
                      <p className="text-[10px] uppercase mt-2 text-right opacity-60 font-bold">CVV</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inputs do cartão */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Número do cartão</label>
                  <input
                    value={cardData.number}
                    onChange={(e) => handleCard("number", e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    inputMode="numeric"
                    placeholder="0000 0000 0000 0000"
                    className={`${inputClass} font-mono`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Nome do titular</label>
                  <input
                    value={cardData.name}
                    onChange={(e) => handleCard("name", e.target.value)}
                    onFocus={() => setIsFlipped(false)}
                    placeholder="Como impresso no cartão"
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Validade</label>
                    <input
                      value={cardData.expiry}
                      onChange={(e) => handleCard("expiry", e.target.value)}
                      onFocus={() => setIsFlipped(false)}
                      inputMode="numeric"
                      placeholder="MM/AA"
                      className={inputClass}
                    />
                  </div>
                  <div className="w-28 space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">CVV</label>
                    <input
                      value={cardData.cvc}
                      onChange={(e) => handleCard("cvc", e.target.value)}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      inputMode="numeric"
                      placeholder="123"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-600">
                  {selection.activation}
                </div>
              </div>
            </div>
          )}

          {/* PIX */}
          {method === "pix" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <DurationSelector value={durationId} onChange={setDurationId} />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
                <div className="flex flex-col items-center gap-4 text-center">
                {/* QR fake */}
                <div className="relative p-3 bg-white border border-slate-200 rounded-xl">
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${QR_SIZE}, 8px)` }}
                  >
                    {QR_MATRIX.flatMap((row, i) =>
                      row.map((on, j) => (
                        <div
                          key={`${i}-${j}`}
                          className={on ? "bg-slate-900" : "bg-white"}
                          style={{ width: 8, height: 8 }}
                        />
                      ))
                    )}
                  </div>
                  {/* Marcadores de canto */}
                  <span className="absolute top-3 left-3 w-12 h-12 border-4 border-slate-900 rounded-md bg-white" />
                  <span className="absolute top-3 right-3 w-12 h-12 border-4 border-slate-900 rounded-md bg-white" />
                  <span className="absolute bottom-3 left-3 w-12 h-12 border-4 border-slate-900 rounded-md bg-white" />
                </div>

                <p className="text-sm text-slate-600 max-w-sm">
                  Escaneie o QR Code no app do seu banco ou copie a chave abaixo.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={PIX_KEY}
                  className={`${inputClass} font-mono text-xs bg-slate-50`}
                />
                <button
                  onClick={copyPix}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm hover:bg-black transition cursor-pointer whitespace-nowrap"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copiado" : "Copiar"}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg p-3">
                <Zap size={16} />
                Ativação após a confirmação do pagamento.
              </div>
              </div>
            </div>
          )}

          {/* BOLETO */}
          {method === "boleto" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <DurationSelector value={durationId} onChange={setDurationId} />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Nome completo</label>
                  <input
                    value={boleto.nome}
                    onChange={(e) => setBoleto((p) => ({ ...p, nome: e.target.value }))}
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">CPF</label>
                    <input
                      value={boleto.cpf}
                      onChange={(e) => setBoleto((p) => ({ ...p, cpf: maskCpf(e.target.value) }))}
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Endereço</label>
                  <input
                    value={boleto.endereco}
                    onChange={(e) => setBoleto((p) => ({ ...p, endereco: e.target.value }))}
                    placeholder="Rua, número, cidade"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Boleto visual */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-dashed border-slate-300">
                  <span className="font-bold text-slate-900">ProTalent</span>
                  <span className="font-mono text-sm text-slate-700">23793.38128 60000.000000 00000.000000 1 00000000000000</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 px-6 py-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Pagador</p>
                    <p className="font-medium text-slate-800">{boleto.nome || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">CPF</p>
                    <p className="font-medium text-slate-800">{boleto.cpf || "—"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-slate-400 uppercase">Endereço</p>
                    <p className="font-medium text-slate-800">{boleto.endereco || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Valor</p>
                    <p className="font-semibold text-slate-900">R$ {selection.price},00</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase">Vencimento</p>
                    <p className="font-medium text-slate-800">3 dias úteis</p>
                  </div>
                </div>
                {/* Código de barras */}
                <div className="flex items-end gap-px px-6 py-4 h-20 bg-white border-t border-slate-200">
                  {BARCODE.map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 h-full"
                      style={{ width: `${w}px`, marginRight: `${i % 2 ? 2 : 1}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resumo do pedido */}
        <aside className="h-fit lg:sticky lg:top-6 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-800">Resumo do pedido</h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Método</span>
              <span className="font-medium text-slate-800">{selection.methodLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Plano</span>
              <span className="font-medium text-slate-800">{selection.planLabel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Cobrança</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  selection.recurring ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                {selection.recurring ? "Recorrente" : "Pagamento único"}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-end justify-between">
            <span className="text-sm text-slate-500">Total</span>
            <p className="text-3xl font-bold text-slate-900">
              R$ {selection.price}
              {selection.recurring && (
                <span className="text-sm font-normal text-slate-400">/mês</span>
              )}
            </p>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
            {selection.activation}
          </div>

          <button
            onClick={handlePay}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black text-white border border-black hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 font-medium text-sm cursor-pointer"
          >
            <ShieldCheck size={18} />
            Finalizar pagamento
          </button>

          <p className="text-xs text-slate-400 text-center">
            Pagamento simulado — sem cobrança real.
          </p>
        </aside>
      </div>

      {/* Benefícios */}
      <section className="w-full bg-white border-t border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              O que você desbloqueia
            </h2>
            <p className="text-slate-600">Tudo o que o Premium oferece para acelerar sua carreira.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
                <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-slate-800">{b.title}</h3>
                <p className="text-sm text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparação Gratuito vs Premium */}
          <div className="mt-14 max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
              <div className="p-4">Recurso</div>
              <div className="p-4 text-center">Gratuito</div>
              <div className="p-4 text-center text-purple-700">Premium</div>
            </div>
            {comparison.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 border-b border-slate-100 last:border-0 text-sm">
                <div className="p-4 text-slate-700">{row.feature}</div>
                <div className="p-4 text-center text-slate-500">
                  {row.free === true ? (
                    <Check size={16} className="inline text-green-600" />
                  ) : row.free === false ? (
                    <span className="text-slate-300">—</span>
                  ) : (
                    row.free
                  )}
                </div>
                <div className="p-4 text-center">
                  {row.premium === true ? (
                    <Check size={16} className="inline text-purple-600" />
                  ) : (
                    <span className="font-medium text-slate-800">{row.premium}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <Toast message={toast} onClose={closeToast} />
    </main>
  )
}
