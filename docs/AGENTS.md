# AGENTS.md

Este projeto utiliza IA para auxiliar no desenvolvimento.

Todas as decisões devem seguir as diretrizes abaixo.

---

# Filosofia

Priorizar:

1. Simplicidade
2. Legibilidade
3. Manutenção
4. Performance

Evitar:

- Overengineering
- Abstrações desnecessárias
- Patterns complexos
- Arquiteturas excessivas

A solução mais simples possível deve ser escolhida sempre que entregar 100% do resultado esperado.

---

# Stack

Frontend:

- React
- Vite
- TailwindCSS
- React Router

Backend (futuro):

- .NET

Banco (futuro):

- SQL Server

---

# Padrões React

Preferir:

- Functional Components
- Hooks nativos
- Props simples
- Estado local quando possível

Evitar:

- Context API sem necessidade
- Custom Hooks prematuros
- Bibliotecas adicionais sem justificativa

---

# Componentização

Criar componentes apenas quando:

- Reutilização real
- Redução de complexidade

Não criar componentes para elementos usados uma única vez.

---

# Tailwind

Priorizar:

- Classes utilitárias
- Layout responsivo
- Design limpo

Evitar:

- CSS customizado sem necessidade
- Arquivos CSS extras

---

# Git

Toda alteração deve:

- Ser pequena
- Ser focada
- Possuir commit descritivo

Exemplos:

feat: adicionar criação de currículo
feat: implementar edição de currículo
fix: corrigir layout responsivo

---

# Antes de alterar código

A IA deve:

1. Entender o objetivo da funcionalidade
2. Procurar reutilização
3. Evitar duplicação
4. Implementar da forma mais simples possível

---

# Regra principal

Se existirem duas soluções:

Escolha sempre a mais simples.