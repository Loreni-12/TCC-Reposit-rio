import type { RespostasTriagem } from "../../types/triagem";
import { idadeEmAnos, inicioDoDia, lerDataIso, somarMeses } from "./datas";

type SimNao = "" | "sim" | "nao";

/** Valores crus dos campos do formulário (strings, como vêm dos inputs). */
export interface FormularioTriagem {
  dataNascimento: string;
  sexo: "" | "feminino" | "masculino";
  peso: string;
  jaDoou: SimNao;
  dataUltimaDoacao: string;
  doacoesUltimos12Meses: string;
  dormiu6Horas: SimNao;
  gripe: "" | "nao" | "com_sintomas" | "sintomas_terminaram";
  dataFimSintomas: string;
  tatuagem12Meses: SimNao;
  dataTatuagem: string;
  malaria12Meses: SimNao;
  dataCuraMalaria: string;
  gravida: SimNao;
  amamentando: SimNao;
  dataNascimentoBebe: string;
  hepatiteApos11Anos: SimNao;
}

export const FORMULARIO_VAZIO: FormularioTriagem = {
  dataNascimento: "",
  sexo: "",
  peso: "",
  jaDoou: "",
  dataUltimaDoacao: "",
  doacoesUltimos12Meses: "",
  dormiu6Horas: "",
  gripe: "",
  dataFimSintomas: "",
  tatuagem12Meses: "",
  dataTatuagem: "",
  malaria12Meses: "",
  dataCuraMalaria: "",
  gravida: "",
  amamentando: "",
  dataNascimentoBebe: "",
  hepatiteApos11Anos: "",
};

export type ErrosFormulario = Partial<Record<keyof FormularioTriagem, string>>;

export type ValidacaoFormulario =
  | { valido: true; respostas: RespostasTriagem }
  | { valido: false; erros: ErrosFormulario };

const OBRIGATORIO = "Responda esta pergunta.";

/** Converte e valida o formulário. Perguntas condicionais só são exigidas quando aparecem. */
export function validarFormulario(f: FormularioTriagem, agora: Date = new Date()): ValidacaoFormulario {
  const hoje = inicioDoDia(agora);
  const erros: ErrosFormulario = {};

  const dataPassada = (campo: keyof FormularioTriagem, valor: string, desde?: Date): Date | null => {
    const data = lerDataIso(valor);
    if (!valor) erros[campo] = "Informe a data.";
    else if (!data) erros[campo] = "Data inválida.";
    else if (data > hoje) erros[campo] = "A data não pode estar no futuro.";
    else if (desde && data < desde) erros[campo] = "A data deve estar dentro dos últimos 12 meses.";
    else return data;
    return null;
  };
  const exigir = (campo: keyof FormularioTriagem) => {
    if (f[campo] === "") erros[campo] = OBRIGATORIO;
  };

  const dataNascimento = dataPassada("dataNascimento", f.dataNascimento);
  if (dataNascimento && idadeEmAnos(dataNascimento, hoje) > 120) erros.dataNascimento = "Confira o ano de nascimento.";

  exigir("sexo");

  const peso = Number(f.peso.replace(",", "."));
  if (!f.peso) erros.peso = "Informe seu peso.";
  else if (!Number.isFinite(peso) || peso <= 0 || peso > 400) erros.peso = "Informe o peso em quilos (ex.: 62,5).";

  exigir("jaDoou");
  let ultimaDoacao: RespostasTriagem["ultimaDoacao"] = null;
  if (f.jaDoou === "sim") {
    const data = dataPassada("dataUltimaDoacao", f.dataUltimaDoacao);
    const quantidade = Number(f.doacoesUltimos12Meses);
    if (f.doacoesUltimos12Meses === "" || !Number.isInteger(quantidade) || quantidade < 0 || quantidade > 12) {
      erros.doacoesUltimos12Meses = "Informe um número inteiro entre 0 e 12.";
    } else if (data) {
      ultimaDoacao = { data, doacoesUltimos12Meses: quantidade };
    }
  }

  exigir("dormiu6Horas");

  exigir("gripe");
  let gripe: RespostasTriagem["gripe"] = { situacao: "nao" };
  if (f.gripe === "com_sintomas") gripe = { situacao: "com_sintomas" };
  if (f.gripe === "sintomas_terminaram") {
    const fim = dataPassada("dataFimSintomas", f.dataFimSintomas);
    if (fim) gripe = { situacao: "sintomas_terminaram", fim };
  }

  const umAnoAtras = somarMeses(hoje, -12);
  exigir("tatuagem12Meses");
  const dataTatuagem = f.tatuagem12Meses === "sim" ? dataPassada("dataTatuagem", f.dataTatuagem, umAnoAtras) : null;

  exigir("malaria12Meses");
  const dataCuraMalaria =
    f.malaria12Meses === "sim" ? dataPassada("dataCuraMalaria", f.dataCuraMalaria, umAnoAtras) : null;

  let amamentando: RespostasTriagem["amamentando"] = null;
  if (f.sexo === "feminino") {
    exigir("gravida");
    exigir("amamentando");
    if (f.amamentando === "sim") {
      const dataNascimentoBebe = dataPassada("dataNascimentoBebe", f.dataNascimentoBebe);
      if (dataNascimentoBebe) amamentando = { dataNascimentoBebe };
    }
  }

  exigir("hepatiteApos11Anos");

  if (Object.keys(erros).length > 0 || !dataNascimento || f.sexo === "") return { valido: false, erros };

  return {
    valido: true,
    respostas: {
      dataNascimento,
      sexo: f.sexo,
      pesoKg: peso,
      ultimaDoacao,
      dormiu6Horas: f.dormiu6Horas === "sim",
      gripe,
      dataTatuagem,
      dataCuraMalaria,
      gravida: f.sexo === "feminino" && f.gravida === "sim",
      amamentando,
      hepatiteApos11Anos: f.hepatiteApos11Anos === "sim",
    },
  };
}
