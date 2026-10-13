// Páginas separadas. O restante do site são seções da página inicial (SECOES).
export const ROTAS = {
  inicio: { caminho: "/", titulo: "Doe + Vida" },
  triagem: { caminho: "/triagem", titulo: "Pré-triagem" },
  perfil: { caminho: "/perfil", titulo: "Meu perfil" },
} as const;

/** Seções da página inicial, acessadas por âncora (ex.: /#equipe). */
export const SECOES = {
  informacoes: { id: "informacoes", rotulo: "Quem pode doar" },
  agendamento: { id: "agendamento", rotulo: "Agendamento" },
  equipe: { id: "equipe", rotulo: "Sobre a equipe" },
} as const;

export type ChaveSecao = keyof typeof SECOES;

export interface ItemMenu {
  rotulo: string;
  destino: { pathname: string; hash?: string };
}

/** Itens da navbar, na ordem de exibição (o botão "Entrar" é separado). */
export const MENU_PRINCIPAL: ItemMenu[] = [
  { rotulo: SECOES.informacoes.rotulo, destino: { pathname: "/", hash: `#${SECOES.informacoes.id}` } },
  { rotulo: "Pré-triagem", destino: { pathname: ROTAS.triagem.caminho } },
  { rotulo: SECOES.agendamento.rotulo, destino: { pathname: "/", hash: `#${SECOES.agendamento.id}` } },
  { rotulo: SECOES.equipe.rotulo, destino: { pathname: "/", hash: `#${SECOES.equipe.id}` } },
];
