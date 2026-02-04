import { useState } from "react"

export default function CurriculosHeader({ mode, setMode }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPosition({ x, y })
  }

  // Título e botão dinâmicos
  const title = mode === "list" ? "Meus Currículos" : "Criar novo currículo"
  const buttonText = mode === "list" ? "Criar novo currículo" : "Voltar"

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        background: `
          radial-gradient(
            circle at ${position.x}% ${position.y}%,
            #1f2933,
            #000000 60%
          )
        `,
      }}
      className="w-full text-white transition-[background] duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Título grande e chamativo */}
        <h1 className={`text-4xl md:text-6xl font-bold text-white text-center md:text-left
                         ${mode === "create" ? "drop-shadow-lg" : ""}`}>
          {title}
        </h1>

        {/* Botão com gradiente e animação */}
        <button
          onClick={() => setMode(mode === "list" ? "create" : "list")}
          className={`
            px-6 py-3 rounded-xl
            font-medium shadow-lg
            transition-transform duration-200
            hover:scale-105 cursor-pointer
            ${mode === "list" 
              ? "bg-white text-black hover:opacity-90"
              : "bg-white text-black hover:bg-gray-200"
            }
          `}
        >
          {buttonText}
        </button>

      </div>
    </section>
  )
}
