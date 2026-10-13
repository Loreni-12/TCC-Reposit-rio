// Dados da equipe extraídos do Termo de Abertura do Projeto (monografia, Anexo A, item 9).
export interface Integrante {
  nome: string;
  funcao: string;
}

export const EQUIPE: Integrante[] = [
  { nome: "Ana Paula Pachuczki Ottequir", funcao: "Front-end" },
  { nome: "Eduardo Loreni Kfassniak", funcao: "Back-end" },
  { nome: "Milena Vitória Mognon", funcao: "Full-stack" },
  { nome: "Thaís Fernanda Cruz", funcao: "Front-end" },
];

export const PROFESSORES = [
  { nome: "Luis Renato", papel: "Orientador" },
  { nome: "Oscar Stefen Junior", papel: "Projeto de Software" },
  { nome: "Emanuel Spanhol", papel: "Desenvolvimento de Sistemas Web 4" },
];

export const INSTITUICAO = {
  escola: "CEDUP Hermann Hering",
  curso: "Curso Técnico em Desenvolvimento de Sistemas",
  turma: "3º ano, turma 302",
  cidade: "Blumenau/SC",
  ano: 2026,
};

/** Iniciais para o avatar (primeiro e último nome). */
export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1]?.[0] ?? "") : "";
  return (primeira + ultima).toUpperCase();
}
