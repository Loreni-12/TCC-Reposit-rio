import type { CodigoCriterio } from "../config/criterios";

export type Sexo = "feminino" | "masculino";
export type ResultadoAptidao = "apto" | "inapto_temporario" | "inapto";

/** Classe Resposta da monografia. Existe só na memória do navegador e nunca é salva (LGPD, decisão C2). */
export interface RespostasTriagem {
  dataNascimento: Date;
  sexo: Sexo;
  pesoKg: number;
  ultimaDoacao: { data: Date; doacoesUltimos12Meses: number } | null;
  dormiu6Horas: boolean;
  gripe: { situacao: "nao" } | { situacao: "com_sintomas" } | { situacao: "sintomas_terminaram"; fim: Date };
  dataTatuagem: Date | null;
  dataCuraMalaria: Date | null;
  gravida: boolean;
  amamentando: { dataNascimentoBebe: Date } | null;
  hepatiteApos11Anos: boolean;
}

/** Classes VerificacaoAptidao + ResultadoTriagem da monografia. É o que pode ser salvo. */
export interface ResultadoTriagem {
  resultado: ResultadoAptidao;
  motivos: CodigoCriterio[];
  orientacoes: CodigoCriterio[];
  reavaliarAPartirDe: Date | null;
  versaoCriterios: string;
  dataResposta: Date;
}
