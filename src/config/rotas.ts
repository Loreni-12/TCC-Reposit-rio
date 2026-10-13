// Fonte única dos caminhos, títulos (h1/aba) e rótulos de menu das páginas.
export const ROTAS = {
  inicio: { caminho: "/", titulo: "Informações sobre doação de sangue", rotulo: "Informações" },
  triagem: { caminho: "/triagem", titulo: "Pré-triagem", rotulo: "Triagem" },
  equipe: { caminho: "/equipe", titulo: "Sobre a equipe", rotulo: "Sobre a equipe" },
  entrar: { caminho: "/entrar", titulo: "Entrar ou cadastrar", rotulo: "Entrar" },
  perfil: { caminho: "/perfil", titulo: "Meu perfil", rotulo: "Meu perfil" },
  agendamento: { caminho: "/agendamento", titulo: "Agendar doação", rotulo: "Agendamento" },
} as const;

export type ChaveRota = keyof typeof ROTAS;

/** Links da navbar, na ordem de exibição (o botão "Entrar" é separado). */
export const MENU_PRINCIPAL: ChaveRota[] = ["inicio", "triagem", "equipe"];
