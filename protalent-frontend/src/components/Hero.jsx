import { useState } from "react"

export default function Hero() {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

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
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Currículos profissionais que abrem portas
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Criamos currículos personalizados, estratégicos e otimizados com tecnologia
          e inteligência artificial para destacar você no mercado.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition cursor-pointer">
            Começar agora
          </button>

          <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition cursor-pointer">
            Ver serviços
          </button>
        </div>

      </div>
    </section>
  )
}
