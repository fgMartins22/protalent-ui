import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Simulando um "serviço externo" de bandeiras
// Você poderia importar isso de um JSON ou API
const BRAND_CONFIG = {
  visa: { label: "VISA", color: "text-blue-400", pattern: /^4/ },
  mastercard: { label: "MASTER", isCircles: true, pattern: /^(5[1-5]|2[2-7])/ },
  amex: { label: "AMEX", color: "text-cyan-400", pattern: /^3[47]/ },
  elo: { label: "ELO", color: "text-yellow-500", pattern: /^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362|6363)/ },
  hipercard: { label: "HIPER", color: "text-red-500", pattern: /^(3841|6062|6370|6372|6375)/ },
  discover: { label: "DISCOVER", color: "text-orange-500", pattern: /^6(?:011|5)/ },
  diners: { label: "DINERS", color: "text-slate-300", pattern: /^3(?:0[0-5]|[68])/ },
  jcb: { label: "JCB", color: "text-purple-400", pattern: /^(?:2131|1800|35)/ },
};

export default function Buy() {
  const [cardData, setCardData] = useState({
    number: "", name: "", expiry: "", cvc: "", type: "default"
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const applyMask = (name, value) => {
    if (name === "number") return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").substring(0, 19);
    if (name === "expiry") return value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/").substring(0, 5);
    if (name === "cvc") return value.replace(/\D/g, "").substring(0, 4);
    return value;
  };

  const detectCardType = (number) => {
    const cleanNum = number.replace(/\s/g, "");
    const found = Object.entries(BRAND_CONFIG).find(([_, config]) => config.pattern.test(cleanNum));
    return found ? found[0] : "default";
  };

  const handleChange = (e, realName) => {
    const maskedValue = applyMask(realName, e.target.value);
    setCardData(prev => {
      const newData = { ...prev, [realName]: maskedValue };
      if (realName === "number") newData.type = detectCardType(maskedValue);
      return newData;
    });
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-10">
        
        {/* CARTÃO */}
        <div 
          className="w-[400px] h-[250px] [perspective:1000px] cursor-pointer group"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            
            {/* FRENTE */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl p-8 [backface-visibility:hidden] shadow-2xl flex flex-col justify-between border border-white/10 overflow-hidden">
              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-5 group-hover:animate-shine" />
              
              <div className="flex justify-between items-start">
                
                <div className="relative w-12 h-10 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 rounded-lg overflow-hidden border border-yellow-600/50 shadow-inner">
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-yellow-700/30" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-700/30" />
                  <div className="absolute top-2 left-0 w-full h-[1px] bg-yellow-700/30" />
                  <div className="absolute top-8 left-0 w-full h-[1px] bg-yellow-700/30" />
                </div>

                {/* RENDERIZAÇÃO DINÂMICA DA BANDEIRA */}
                <div className="h-10 flex items-center">
                  {cardData.type === "mastercard" ? (
                    <div className="flex -space-x-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 opacity-90" />
                      <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-90" />
                    </div>
                  ) : BRAND_CONFIG[cardData.type] ? (
                    <span className={`text-2xl font-black italic uppercase tracking-tighter ${BRAND_CONFIG[cardData.type].color}`}>
                      {BRAND_CONFIG[cardData.type].label}
                    </span>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-dashed animate-pulse" />
                  )}
                </div>
              </div>

              <div className="text-[22px] tracking-[0.15em] font-mono">{cardData.number || "0000 0000 0000 0000"}</div>

              <div className="flex justify-between items-end">
                <div className="flex-1 mr-4 overflow-hidden text-left">
                  <p className="text-[10px] opacity-50 uppercase mb-1">Card Holder</p>
                  <p className="text-sm font-bold tracking-widest truncate">{cardData.name.toUpperCase() || "NOME DO CLIENTE"}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] opacity-50 uppercase mb-1">Expires</p>
                  <p className="text-sm font-bold tracking-widest">{cardData.expiry || "MM/AA"}</p>
                </div>
              </div>
            </div>

            {/* VERSO */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl flex flex-col py-8 border border-white/10">
              <div className="w-full h-12 bg-black/90 mt-2" />
              <div className="px-10 mt-8">
                <div className="w-full bg-white h-10 rounded flex items-center justify-end px-4 shadow-inner">
                  <span className="text-black font-mono font-bold italic tracking-[0.2em]">{cardData.cvc || "***"}</span>
                </div>
                <p className="text-[10px] uppercase mt-2 text-right opacity-60 font-bold">Security Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* INPUTS (SEM TAG FORM PARA EVITAR TOOLTIP) */}
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="grid gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Serial de Entrada</label>
              <input 
                type="text"
                value={cardData.number}
                onChange={(e) => handleChange(e, 'number')}
                onFocus={() => setIsFlipped(false)}
                autoComplete="new-password"
                className="border-2 border-slate-100 p-3 rounded-xl focus:border-black outline-none transition-all font-mono"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            {/* ... outros inputs seguem a mesma lógica ... */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Identificação Titular</label>
              <input 
                type="text"
                value={cardData.name}
                onChange={(e) => handleChange(e, 'name')}
                onFocus={() => setIsFlipped(false)}
                autoComplete="new-password"
                className="border-2 border-slate-100 p-3 rounded-xl focus:border-black outline-none"
                placeholder="Ex.: FILIPE G MARTINS"
              />
            </div>
            <div className="flex gap-4">
               <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Validade</label>
                <input 
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleChange(e, 'expiry')}
                  onFocus={() => setIsFlipped(false)}
                  autoComplete="new-password"
                  placeholder="MM/AA"
                  className="border-2 border-slate-100 p-3 rounded-xl focus:border-black outline-none"
                />
              </div>
              <div className="flex flex-col gap-1 w-32">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Chave</label>
                <input 
                  type="text"
                  value={cardData.cvc}
                  onChange={(e) => handleChange(e, 'cvc')}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  autoComplete="new-password"
                  className="border-2 border-slate-100 p-3 rounded-xl focus:border-black outline-none"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}