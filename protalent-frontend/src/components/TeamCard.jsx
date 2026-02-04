import { useState } from "react"
import { Linkedin } from "lucide-react"

function calculateAge(birthDate) {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export default function TeamCard({
  name,
  nickname,
  surname,
  role,
  avatar,
  linkedin,
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }

  const birthDate =
    name === "Filipe"
      ? "2000-06-08"
      : name === "Eduardo"
        ? "2000-09-11"
        : null

  const age = birthDate ? calculateAge(birthDate) : null

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        "--x": `${pos.x}%`,
        "--y": `${pos.y}%`,
      }}
      className="relative group rounded-2xl mx-auto max-w-[300px]"
    >
      {/* Glow */}
      <div
        className="
          absolute -inset-1 rounded-2xl
          opacity-0 group-hover:opacity-100
          transition
          blur-xl
          animate-pulseSlow
          z-0
        "
        style={{
          background: `
            radial-gradient(
              420px circle at var(--x) var(--y),
              rgba(99,102,241,0.6),
              rgba(168,85,247,0.45),
              transparent 70%
            )
          `,
        }}
      />

      {/* Card */}
      <div
        className="
          relative z-10
          bg-black border border-gray-800
          rounded-2xl
          px-10 pt-12 pb-10
          text-center
          min-h-[440px]
          flex flex-col items-center
        "
      >
        {/* Avatar */}
        <div className="relative w-32 h-32 mb-8 transition-transform duration-300 group-hover:scale-110">
          <div
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-br from-blue-500 to-purple-600
              opacity-0 group-hover:opacity-100
              blur-lg transition
            "
          />
          <img
            src={avatar}
            alt={name}
            className="
              relative z-10 w-32 h-32
              rounded-full object-cover
              border border-gray-700
            "
          />
        </div>

        {/* Nome */}
        <h5 className="text-xl font-semibold leading-tight whitespace-nowrap">
          {name}{" "}
          {nickname && (
            <span className="text-purple-400">“{nickname}” </span>
          )}
          {surname}
        </h5>



        {/* Cargo */}
        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
          {role}
        </p>

        {/* Idade — MAIS EVIDENTE */}
        {age && (
          <p
            className="
              mt-3
              text-sm font-medium tracking-widest
              text-purple-400
              opacity-0 scale-95
              group-hover:opacity-100 group-hover:scale-100
              transition duration-300
            "
          >
            — {age} ANOS
          </p>
        )}

        <div className="flex-1" />

        {/* LinkedIn */}
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          className="
            inline-flex items-center gap-2
            text-gray-500 hover:text-purple-500
            transition
            group-hover:-translate-y-1
            mt-8
          "
        >
          <Linkedin size={18} />
          LinkedIn
        </a>
      </div>
    </div>
  )
}
