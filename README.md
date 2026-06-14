# ProTalent

Plataforma para criação e gerenciamento de currículos profissionais.
Monorepo simples com **frontend** e **backend** separados.

## Estrutura
```
protalent/
├── frontend/        # React + Vite + Tailwind (aplicação web)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/         # Node.js + TypeScript + Fastify (API — base inicial)
│   ├── src/
│   ├── db/
│   ├── docs/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── docs/            # Documentação do projeto (produto, arquitetura, decisões)
├── .gitignore
└── README.md
```

> Frontend e backend são pacotes independentes (cada um com seu `package.json`).
> Não há ferramenta de workspace — mantém simples e fácil de evoluir.

## Tecnologias
- **Frontend:** React, Vite, TailwindCSS, React Router, Framer Motion, Lucide.
- **Backend:** Node.js, TypeScript, Fastify, Zod. (base inicial, sem lógica real)
- **Futuro:** Supabase (PostgreSQL, Auth, Storage) e Vindi (pagamentos).

## Como rodar o frontend
```bash
cd frontend
npm install
npm run dev      # ambiente de desenvolvimento (Vite)
npm run build    # build de produção
```

## Como rodar o backend
```bash
cd backend
npm install
copy .env.example .env   # (bash: cp .env.example .env)
npm run dev      # http://localhost:3333 (tsx watch)
npm run build    # compila para dist/
npm start        # roda dist/server.js
```

## Documentação
- Visão de arquitetura: [`docs/architecture.md`](docs/architecture.md)
- Produto, decisões e UI: demais arquivos em [`docs/`](docs/)
- Banco e pagamentos (backend): [`backend/docs/`](backend/docs/)
