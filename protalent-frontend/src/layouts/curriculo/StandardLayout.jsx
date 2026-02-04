export default function StandardLayout({ data, editing, onChange }) {
  return (
    <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8">

      {/* Cabeçalho */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-slate-800">
          Nome do Profissional
        </h2>
        <p className="text-slate-500">
          Desenvolvedor Front-end • São Paulo - SP
        </p>
      </div>

      {/* Resumo */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-700">
          Resumo Profissional
        </h3>

        {editing ? (
          <textarea
            value={data.resumo}
            onChange={e => onChange("resumo", e.target.value)}
            className="w-full min-h-[96px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-slate-600 leading-relaxed">
            {data.resumo}
          </p>
        )}
      </section>

      {/* Experiência */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Experiência Profissional
        </h3>

        <div className="space-y-4 border-l border-slate-200 pl-4">
          <div>
            <p className="font-medium text-slate-800">
              Empresa X — Desenvolvedor Front-end
            </p>
            <p className="text-sm text-slate-500">
              Jan 2022 • Atual
            </p>

            {editing ? (
              <textarea
                value={data.experiencia}
                onChange={e => onChange("experiencia", e.target.value)}
                className="mt-2 w-full min-h-[80px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-sm text-slate-600 mt-1">
                {data.experiencia}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Formação */}
      <section className="space-y-4 ">
        <h3 className="text-lg font-semibold text-slate-700">
          Formação
        </h3>

        <div className="border-l border-slate-200 pl-4">

          <p className="font-medium text-slate-800 ">
            Análise e Desenvolvimento de Sistemas
          </p>

          <p className="text-sm text-slate-500">
            Universidade XYZ • 2021
          </p>

          {editing ? (
            <input
              value={data.educacao}
              onChange={e => onChange("educacao", e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <>
              <p className="font-medium text-slate-800">
                {data.educacao}
              </p>
            </>
          )}
        </div>
      </section>

      {/* Habilidades */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">
          Habilidades
        </h3>

        <div className="flex flex-wrap gap-2">
          {data.habilidades.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        {editing && (
          <input
            placeholder="Digite uma habilidade e pressione Enter"
            className="mt-2 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyDown={e => {
              if (e.key === "Enter" && e.target.value.trim()) {
                onChange("habilidades", [
                  ...data.habilidades,
                  e.target.value.trim(),
                ])
                e.target.value = ""
              }
            }}
          />
        )}
      </section>

    </section>
  )
}
