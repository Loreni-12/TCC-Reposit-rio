// Fontes oficiais usadas no site. Toda informação de saúde exibida deve apontar para uma delas.
// `acessoEm`: data em que a equipe/assistente abriu a página e conferiu o conteúdo.
export interface Fonte {
  titulo: string;
  orgao: string;
  url: string;
  atualizadaEm?: string;
  acessoEm: string;
}

export const FONTES = {
  faqMinisterioSaude: {
    titulo: "Perguntas frequentes sobre doação de sangue",
    orgao: "Ministério da Saúde",
    url: "https://www.gov.br/saude/pt-br/composicao/saes/doacao-de-sangue/faq",
    atualizadaEm: "2023-06-14",
    acessoEm: "2026-10-12",
  },
  hemoscRequisitos: {
    titulo: "Requisitos para doar",
    orgao: "HEMOSC",
    url: "https://www.hemosc.org.br/como-doar.html",
    acessoEm: "2026-10-12",
  },
} as const satisfies Record<string, Fonte>;

export type ChaveFonte = keyof typeof FONTES;
