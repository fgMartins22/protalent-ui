import { NavLink, useNavigate } from "react-router-dom"
import { User } from "lucide-react"

const linkClass = ({ isActive }) =>
  `transition hover:text-black ${isActive ? "text-black" : "text-gray-600"}`

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          className="text-xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Pro<span className="text-purple-600">Talent</span>
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 font-medium">
          <NavLink to="/home" className={linkClass}>Início</NavLink>
          <NavLink to="/curriculos" className={linkClass}>Meus Currículos</NavLink>
          <NavLink to="/premium" className={linkClass}>Premium</NavLink>
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/perfil")}
            title="Meu perfil"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <User size={18} />
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            onClick={() => navigate("/curriculos")}
          >
            Começar
          </button>
        </div>

      </div>
    </header>
  )
}
