export default function CurriculoCreate({ onBack }) {
  return (
    <div className="max-w-3xl">
      <div className="space-y-6">

        <input
          type="text"
          placeholder="Nome do currículo"
          className="
            w-full p-4 rounded-xl
            bg-white border border-gray-800
            focus:border-blue-500 outline-none
          "
        />

        <textarea
          placeholder="Resumo profissional"
          rows={4}
          className="
            w-full p-4 rounded-xl
            bg-white border border-gray-800
            focus:border-blue-500 outline-none
          "
        />

        <button
          className="
            px-6 py-3 rounded-xl
            bg-black text-white
            hover:bg-white hover:text-black 
            border hover:border-black
            transition font-medium 
            cursor-pointer
          "
        >
          Salvar currículo
        </button>

      </div>
    </div>
  )
}
