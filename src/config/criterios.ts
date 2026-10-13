import type { ChaveFonte } from "./fontes";

/*
 * Critérios da pré-triagem (classes CriterioDoacao e Orientacao da monografia).
 *
 * REGRAS (CLAUDE.md §6):
 * - Somente critérios presentes em fonte oficial; `trechoFonte` traz a frase LITERAL da fonte.
 * - `revisadoPelaEquipe: false` = transcrito, ainda não conferido pela equipe (A VERIFICAR).
 * - Ao mudar qualquer critério ou parâmetro, incremente VERSAO_CRITERIOS.
 *
 * Fora desta versão (não constam nas fontes lidas em 2026-10-12): bebida alcoólica,
 * HIV/HTLV/Chagas, pós-parto sem amamentação, vacinas, cirurgias.
 */
export const VERSAO_CRITERIOS = "2026-10-12.1";

export const PARAMETROS = {
  idadeMinima: 16,
  idadeMaxima: 69,
  // A fonte diz "primeira doação tenha sido feita até 60 anos" e, em outro trecho,
  // "antes dos 60 anos". Adotado "até 60 anos completos". A VERIFICAR pela equipe.
  idadeMaximaPrimeiraDoacao: 60,
  idadeMaioridade: 18,
  pesoMinimoKg: 50,
  horasSonoMinimas: 6,
  mesesEntreDoacoes: { masculino: 2, feminino: 3 },
  doacoesPorAno: { masculino: 4, feminino: 3 },
  diasAposGripe: 7,
  mesesAposTatuagem: 12,
  mesesAposCuraMalaria: 12,
  mesesAmamentacao: 12,
} as const;

export type TipoCriterio = "definitivo" | "temporario" | "orientacao";

export type CodigoCriterio =
  | "IDADE_MINIMA"
  | "IDADE_MAXIMA"
  | "PRIMEIRA_DOACAO_APOS_60"
  | "MENOR_DE_18"
  | "PESO_MINIMO"
  | "SONO"
  | "INTERVALO_ENTRE_DOACOES"
  | "LIMITE_ANUAL_DOACOES"
  | "GRIPE_RESFRIADO"
  | "TATUAGEM"
  | "MALARIA"
  | "GRAVIDEZ"
  | "AMAMENTACAO"
  | "HEPATITE_APOS_11_ANOS"
  | "ALIMENTACAO";

export interface Criterio {
  tipo: TipoCriterio;
  titulo: string;
  orientacao: string;
  trechoFonte: string;
  fonte: ChaveFonte;
  revisadoPelaEquipe: boolean;
}

export const CRITERIOS: Record<CodigoCriterio, Criterio> = {
  IDADE_MINIMA: {
    tipo: "temporario",
    titulo: "Idade mínima de 16 anos",
    orientacao: "Você poderá doar a partir dos 16 anos, com consentimento formal do responsável legal até os 18.",
    trechoFonte:
      "Ter idade entre 16 e 69 anos, desde que a primeira doação tenha sido feita até 60 anos (menores de 18 anos devem possuir consentimento formal do responsável legal);",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  IDADE_MAXIMA: {
    tipo: "definitivo",
    titulo: "Idade máxima de 69 anos",
    orientacao: "A doação é permitida até os 69 anos. Você pode ajudar incentivando outras pessoas a doar.",
    trechoFonte: "Ter idade entre 16 e 69 anos, desde que a primeira doação tenha sido feita até 60 anos",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  PRIMEIRA_DOACAO_APOS_60: {
    tipo: "definitivo",
    titulo: "Primeira doação até os 60 anos",
    orientacao: "Quem tem entre 60 e 69 anos só pode doar se já tiver doado antes. Você pode ajudar incentivando outras pessoas a doar.",
    trechoFonte: "A primeira doação precisa ter ocorrido até os 60 anos para a pessoa poder doar dos 60 aos 69 anos.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  MENOR_DE_18: {
    tipo: "orientacao",
    titulo: "Menores de 18 anos",
    orientacao: "Leve o consentimento formal do seu responsável legal. Confirme com o hemocentro quais documentos são exigidos.",
    trechoFonte: "menores de 18 anos devem possuir consentimento formal do responsável legal",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  PESO_MINIMO: {
    tipo: "temporario",
    titulo: "Peso mínimo de 50 kg",
    orientacao: "É preciso pesar no mínimo 50 kg para doar.",
    trechoFonte: "Pesar no mínimo 50 kg;",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  SONO: {
    tipo: "temporario",
    titulo: "Descanso",
    orientacao: "Durma pelo menos 6 horas antes de ir ao hemocentro.",
    trechoFonte: "Ter dormido pelo menos 6 horas nas últimas 24 horas;",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  INTERVALO_ENTRE_DOACOES: {
    tipo: "temporario",
    titulo: "Intervalo entre doações",
    orientacao: "Homens podem doar a cada 2 meses e mulheres a cada 3 meses, contados da última doação.",
    trechoFonte:
      "Homens podem doar sangue de 2 em 2 meses, sendo, no máximo, 4 vezes ao ano. Mulheres podem doar sangue 3 em 3 meses, sendo, no máximo, 3 doações anuais.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  LIMITE_ANUAL_DOACOES: {
    tipo: "temporario",
    titulo: "Limite de doações por ano",
    orientacao: "Homens podem doar no máximo 4 vezes e mulheres no máximo 3 vezes em 12 meses.",
    trechoFonte:
      "Homens podem doar sangue de 2 em 2 meses, sendo, no máximo, 4 vezes ao ano. Mulheres podem doar sangue 3 em 3 meses, sendo, no máximo, 3 doações anuais.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  GRIPE_RESFRIADO: {
    tipo: "temporario",
    titulo: "Gripe ou resfriado",
    orientacao: "Aguarde 7 dias depois que os sintomas terminarem.",
    trechoFonte: "Você pode voltar a doar sangue sete dias após terminarem os sintomas de gripe ou resfriado.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  TATUAGEM: {
    tipo: "temporario",
    titulo: "Tatuagem recente",
    orientacao:
      "Aguarde 1 ano depois da tatuagem. Alguns serviços aceitam após 6 meses: confirme com o hemocentro.",
    trechoFonte:
      "As pessoas que fizeram tatuagem precisam esperar um ano para doarem sangue novamente. Porém, em alguns serviços de coleta de sangue, [...] o período de inaptidão é de 6 meses.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  MALARIA: {
    tipo: "temporario",
    titulo: "Malária",
    orientacao: "Aguarde 12 meses depois da cura.",
    trechoFonte: "Quem teve malária pode doar após 12 meses da cura.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  GRAVIDEZ: {
    tipo: "temporario",
    titulo: "Gravidez",
    orientacao: "Durante a gravidez não é possível doar. Depois do parto, faça a pré-triagem novamente.",
    trechoFonte: "Grávidas não podem doar sangue!",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  AMAMENTACAO: {
    tipo: "temporario",
    titulo: "Amamentação",
    orientacao: "Quem amamenta pode voltar a doar quando o bebê completar 1 ano.",
    trechoFonte: "Após um ano de amamentação, você pode voltar a doar sangue.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  HEPATITE_APOS_11_ANOS: {
    tipo: "definitivo",
    titulo: "Hepatite após os 11 anos",
    orientacao: "Ter tido hepatite após os 11 anos impede a doação de forma definitiva. Você pode ajudar incentivando outras pessoas a doar.",
    trechoFonte: "Um dos critérios definitivos que impedem a doação de sangue é ter tido hepatite após os 11 anos de idade.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
  ALIMENTACAO: {
    tipo: "orientacao",
    titulo: "Alimentação",
    orientacao: "Não vá em jejum. Evite alimentos gordurosos nas 3 horas antes da doação.",
    trechoFonte:
      "O doador não deve estar em jejum, pelo contrário, deve estar alimentado e descansado, evitando alimentação gordurosa nas 3 horas que antecedem a doação.",
    fonte: "faqMinisterioSaude",
    revisadoPelaEquipe: false,
  },
};
