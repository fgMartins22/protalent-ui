import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          className="text-xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")} 
        >
          ProTalent
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-black">Início</a>
          <a href="#" className="hover:text-black">Serviços</a>
          <a href="#" className="hover:text-black">Sobre</a>
          <a href="#" className="hover:text-black">Contato</a>
        </nav>

        {/* Botão */}
        <button
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
          onClick={() => navigate("/curriculos")} 
        >
          Começar
        </button>

      </div>
    </header>
  )
}
