import type { ChaveFonte } from "./fontes";

/*
 * Conteúdo da seção "Quem pode doar" (caso de uso UC1/UC2).
 * Mesma fonte e mesmos números de src/config/criterios.ts. Ao mudar um, mude o outro.
 */
export interface ItemInformacao {
  titulo: string;
  texto: string;
  destaque?: string;
}

export const FONTE_INFORMACOES: ChaveFonte = "faqMinisterioSaude";

export const REQUISITOS_BASICOS: ItemInformacao[] = [
  {
    titulo: "Ter entre 16 e 69 anos",
    texto: "Menores de 18 precisam de consentimento formal do responsável legal. A primeira doação deve ser feita até os 60 anos.",
  },
  { titulo: "Pesar no mínimo 50 kg", texto: "O peso mínimo vale para todas as pessoas doadoras." },
  { titulo: "Estar descansado", texto: "Ter dormido pelo menos 6 horas nas últimas 24 horas." },
  {
    titulo: "Estar alimentado",
    texto: "Não doe em jejum. Evite alimentos gordurosos nas 3 horas que antecedem a doação.",
  },
];

export const INTERVALOS: ItemInformacao[] = [
  { titulo: "Homens", texto: "Podem doar a cada 2 meses, no máximo 4 vezes por ano.", destaque: "2 meses" },
  { titulo: "Mulheres", texto: "Podem doar a cada 3 meses, no máximo 3 vezes por ano.", destaque: "3 meses" },
];

export const IMPEDIMENTOS_TEMPORARIOS: ItemInformacao[] = [
  { titulo: "Gripe ou resfriado", texto: "Após o fim dos sintomas.", destaque: "7 dias" },
  { titulo: "Tatuagem", texto: "Alguns serviços aceitam após 6 meses.", destaque: "12 meses" },
  { titulo: "Malária", texto: "Contados a partir da cura.", destaque: "12 meses" },
  { titulo: "Amamentação", texto: "Até o bebê completar 1 ano.", destaque: "1 ano" },
  { titulo: "Gravidez", texto: "Grávidas não podem doar.", destaque: "Gestação" },
];

export const IMPEDIMENTOS_DEFINITIVOS: ItemInformacao[] = [
  { titulo: "Hepatite após os 11 anos", texto: "É um dos critérios definitivos que impedem a doação." },
];
