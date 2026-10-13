// Fonte única dos caminhos e títulos das páginas.
// Usada pelo roteador e, futuramente, pela navbar.
export const ROTAS = {
  inicio: { caminho: "/", titulo: "Informações sobre doação de sangue" },
  triagem: { caminho: "/triagem", titulo: "Triagem" },
  equipe: { caminho: "/equipe", titulo: "Sobre a equipe" },
  entrar: { caminho: "/entrar", titulo: "Entrar ou cadastrar" },
  perfil: { caminho: "/perfil", titulo: "Meu perfil" },
  agendamento: { caminho: "/agendamento", titulo: "Agendar doação" },
} as const;

export type ChaveRota = keyof typeof ROTAS;
