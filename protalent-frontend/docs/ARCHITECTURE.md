# Arquitetura

## Estrutura

src/

components/
layouts/
pages/
router/
assets/

---

# Regras

components

Componentes reutilizáveis.

Exemplos:

- Header
- Footer
- Buttons

---

pages

Páginas completas.

Exemplos:

- Home
- Curriculos
- Login

---

layouts

Templates de currículo.

Exemplos:

- StandardLayout
- ProfileLayout
- ModernLayout

---

# Dados do currículo

Estrutura padrão:

{
  resumo: string,
  experiencia: string,
  educacao: string,
  habilidades: string[]
}

Todos os layouts devem consumir a mesma estrutura.