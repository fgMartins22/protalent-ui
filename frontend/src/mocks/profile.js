// Mock central do perfil do usuário.
// Representa os dados fixos/reutilizáveis usados como base para gerar currículos.
// Sem persistência real ainda — apenas estado local / ponto único de mock.

export const profileMock = {
  firstName: "Filipe",
  lastName: "Martins",
  title: "Desenvolvedor Front-end",
  city: "São Paulo",
  state: "SP",
  email: "filipe@protalent.dev",
  phone: "(11) 90000-0000",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  portfolio: "https://protalent.dev",
  avatar: "",

  experiences: [
    {
      id: 1,
      role: "Desenvolvedor Front-end",
      company: "Empresa X",
      startDate: "2022-01",
      endDate: "",
      current: true,
    },
    {
      id: 2,
      role: "Estagiário de Desenvolvimento",
      company: "Startup Y",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
    },
  ],

  educations: [
    {
      id: 1,
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "Universidade XYZ",
      startDate: "2019-01",
      endDate: "2021-12",
      current: false,
    },
  ],

  skills: ["React", "TypeScript", "Tailwind", "Git", "Node.js"],
}
