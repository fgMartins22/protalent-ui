const emptyText = "text-sm text-slate-400 italic"

export default function StandardLayout({ data, editing, onChange, exportMode = false }) {
  const p = data.person
  const local = [p.city, p.state].filter(Boolean).join(" - ")
  const headerLine = [p.title, local].filter(Boolean).join(" • ")
  const contact = [p.email, p.phone].filter(Boolean).join(" • ")

  return (
    <section className={`${exportMode ? "bg-white" : "bg-white border border-slate-200 rounded-xl shadow-sm"} p-8 space-y-8`}>

      {/* Cabeçalho */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-slate-800">{p.name || "Seu nome"}</h2>
        {headerLine && <p className="text-slate-500">{headerLine}</p>}
        {contact && <p className="text-sm text-slate-500">{contact}</p>}
      </div>

      {/* Resumo */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-700">Resumo Profissional</h3>
        {editing ? (
          <textarea
            value={data.resumo}
            onChange={(e) => onChange("resumo", e.target.value)}
            placeholder="Resumo profissional para esta vaga..."
            className="w-full min-h-[96px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : data.resumo ? (
          <p className="text-slate-600 leading-relaxed">{data.resumo}</p>
        ) : (
          <p className={emptyText}>Sem resumo profissional.</p>
        )}
      </section>

      {/* Experiência */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">Experiência Profissional</h3>
        {data.experiences.length === 0 ? (
          <p className={emptyText}>Nenhuma experiência cadastrada no perfil.</p>
        ) : (
          <div className="space-y-4 border-l border-slate-200 pl-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <p className="font-medium text-slate-800">
                  {[exp.role, exp.company].filter(Boolean).join(" — ")}
                </p>
                {exp.period && <p className="text-sm text-slate-500">{exp.period}</p>}
              </div>
            ))}
          </div>
        )}
        {editing ? (
          <textarea
            value={data.experienciaDescricao}
            onChange={(e) => onChange("experienciaDescricao", e.target.value)}
            placeholder="Descreva suas experiências de forma personalizada para a vaga..."
            className="w-full min-h-[80px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          data.experienciaDescricao && (
            <p className="text-sm text-slate-600">{data.experienciaDescricao}</p>
          )
        )}
      </section>

      {/* Formação */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">Formação</h3>
        {data.educations.length === 0 ? (
          <p className={emptyText}>Nenhuma formação cadastrada no perfil.</p>
        ) : (
          <div className="space-y-4 border-l border-slate-200 pl-4">
            {data.educations.map((edu) => (
              <div key={edu.id}>
                <p className="font-medium text-slate-800">
                  {[edu.course, edu.institution].filter(Boolean).join(" — ")}
                </p>
                {edu.period && <p className="text-sm text-slate-500">{edu.period}</p>}
              </div>
            ))}
          </div>
        )}
        {editing ? (
          <textarea
            value={data.educacaoDescricao}
            onChange={(e) => onChange("educacaoDescricao", e.target.value)}
            placeholder="Descrição personalizada da formação (opcional)..."
            className="w-full min-h-[80px] border border-slate-300 rounded-lg p-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          data.educacaoDescricao && (
            <p className="text-sm text-slate-600">{data.educacaoDescricao}</p>
          )
        )}
      </section>

      {/* Habilidades */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">Habilidades</h3>
        {data.skills.length === 0 ? (
          <p className={emptyText}>Nenhuma competência cadastrada no perfil.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-600">
                {skill}
              </span>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
