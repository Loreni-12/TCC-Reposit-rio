import { describe, expect, it } from "vitest";
import { VERSAO_CRITERIOS } from "../../config/criterios";
import type { RespostasTriagem } from "../../types/triagem";
import { verificarAptidao } from "./verificarAptidao";

const HOJE = new Date(2026, 9, 12); // 12/10/2026
const d = (ano: number, mes: number, dia: number) => new Date(ano, mes - 1, dia);

function respostas(parcial: Partial<RespostasTriagem> = {}): RespostasTriagem {
  return {
    dataNascimento: d(1995, 5, 20),
    sexo: "feminino",
    pesoKg: 62,
    ultimaDoacao: null,
    dormiu6Horas: true,
    gripe: { situacao: "nao" },
    dataTatuagem: null,
    dataCuraMalaria: null,
    gravida: false,
    amamentando: null,
    hepatiteApos11Anos: false,
    ...parcial,
  };
}

describe("verificarAptidao", () => {
  it("considera apto quem atende a todos os critérios", () => {
    const r = verificarAptidao(respostas(), HOJE);
    expect(r.resultado).toBe("apto");
    expect(r.motivos).toEqual([]);
    expect(r.reavaliarAPartirDe).toBeNull();
    expect(r.orientacoes).toContain("ALIMENTACAO");
    expect(r.versaoCriterios).toBe(VERSAO_CRITERIOS);
  });

  describe("idade", () => {
    it("menor de 16: temporário até completar 16", () => {
      const r = verificarAptidao(respostas({ dataNascimento: d(2011, 3, 1) }), HOJE);
      expect(r.resultado).toBe("inapto_temporario");
      expect(r.motivos).toEqual(["IDADE_MINIMA"]);
      expect(r.reavaliarAPartirDe).toEqual(d(2027, 3, 1));
    });

    it("16 ou 17 anos: apto com orientação de consentimento", () => {
      const r = verificarAptidao(respostas({ dataNascimento: d(2010, 1, 1) }), HOJE);
      expect(r.resultado).toBe("apto");
      expect(r.orientacoes).toContain("MENOR_DE_18");
    });

    it("70 anos ou mais: inapto", () => {
      const r = verificarAptidao(respostas({ dataNascimento: d(1956, 1, 1) }), HOJE);
      expect(r.resultado).toBe("inapto");
      expect(r.motivos).toEqual(["IDADE_MAXIMA"]);
    });

    it("69 anos que já doou: apto", () => {
      const ultimaDoacao = { data: d(2025, 1, 10), doacoesUltimos12Meses: 0 };
      const r = verificarAptidao(respostas({ dataNascimento: d(1957, 1, 1), ultimaDoacao }), HOJE);
      expect(r.resultado).toBe("apto");
    });

    it("acima de 60 sem doação anterior: inapto", () => {
      const r = verificarAptidao(respostas({ dataNascimento: d(1964, 1, 1) }), HOJE);
      expect(r.motivos).toEqual(["PRIMEIRA_DOACAO_APOS_60"]);
      expect(r.resultado).toBe("inapto");
    });

    it("60 anos completos sem doação anterior: ainda pode fazer a primeira", () => {
      const r = verificarAptidao(respostas({ dataNascimento: d(1966, 1, 1) }), HOJE);
      expect(r.resultado).toBe("apto");
    });
  });

  it("peso abaixo de 50 kg: temporário sem data", () => {
    const r = verificarAptidao(respostas({ pesoKg: 49.9 }), HOJE);
    expect(r.motivos).toEqual(["PESO_MINIMO"]);
    expect(r.reavaliarAPartirDe).toBeNull();
  });

  it("dormiu menos de 6 horas: temporário", () => {
    expect(verificarAptidao(respostas({ dormiu6Horas: false }), HOJE).motivos).toEqual(["SONO"]);
  });

  describe("intervalo entre doações", () => {
    it("mulher: 3 meses após a última doação", () => {
      const ultimaDoacao = { data: d(2026, 8, 1), doacoesUltimos12Meses: 1 };
      const r = verificarAptidao(respostas({ ultimaDoacao }), HOJE);
      expect(r.motivos).toEqual(["INTERVALO_ENTRE_DOACOES"]);
      expect(r.reavaliarAPartirDe).toEqual(d(2026, 11, 1));
    });

    it("homem: 2 meses após a última doação", () => {
      const ultimaDoacao = { data: d(2026, 9, 1), doacoesUltimos12Meses: 1 };
      const r = verificarAptidao(respostas({ sexo: "masculino", ultimaDoacao }), HOJE);
      expect(r.reavaliarAPartirDe).toEqual(d(2026, 11, 1));
    });

    it("intervalo já cumprido: apto", () => {
      const ultimaDoacao = { data: d(2026, 7, 12), doacoesUltimos12Meses: 1 };
      expect(verificarAptidao(respostas({ ultimaDoacao }), HOJE).resultado).toBe("apto");
    });

    it("atingiu o limite anual (mulher: 3)", () => {
      const ultimaDoacao = { data: d(2026, 1, 1), doacoesUltimos12Meses: 3 };
      const r = verificarAptidao(respostas({ ultimaDoacao }), HOJE);
      expect(r.motivos).toEqual(["LIMITE_ANUAL_DOACOES"]);
      expect(r.reavaliarAPartirDe).toBeNull();
    });

    it("homem com 3 doações no ano ainda pode doar (limite 4)", () => {
      const ultimaDoacao = { data: d(2026, 1, 1), doacoesUltimos12Meses: 3 };
      expect(verificarAptidao(respostas({ sexo: "masculino", ultimaDoacao }), HOJE).resultado).toBe("apto");
    });
  });

  describe("gripe ou resfriado", () => {
    it("com sintomas: temporário sem data", () => {
      const r = verificarAptidao(respostas({ gripe: { situacao: "com_sintomas" } }), HOJE);
      expect(r.motivos).toEqual(["GRIPE_RESFRIADO"]);
      expect(r.reavaliarAPartirDe).toBeNull();
    });

    it("sintomas terminaram há menos de 7 dias: 7 dias após o fim", () => {
      const r = verificarAptidao(respostas({ gripe: { situacao: "sintomas_terminaram", fim: d(2026, 10, 10) } }), HOJE);
      expect(r.reavaliarAPartirDe).toEqual(d(2026, 10, 17));
    });

    it("sintomas terminaram há 7 dias: apto", () => {
      const r = verificarAptidao(respostas({ gripe: { situacao: "sintomas_terminaram", fim: d(2026, 10, 5) } }), HOJE);
      expect(r.resultado).toBe("apto");
    });
  });

  it("tatuagem: 12 meses após a data", () => {
    const r = verificarAptidao(respostas({ dataTatuagem: d(2026, 3, 15) }), HOJE);
    expect(r.motivos).toEqual(["TATUAGEM"]);
    expect(r.reavaliarAPartirDe).toEqual(d(2027, 3, 15));
  });

  it("malária: 12 meses após a cura", () => {
    const r = verificarAptidao(respostas({ dataCuraMalaria: d(2026, 1, 31) }), HOJE);
    expect(r.reavaliarAPartirDe).toEqual(d(2027, 1, 31));
  });

  it("gravidez: temporário sem data", () => {
    const r = verificarAptidao(respostas({ gravida: true }), HOJE);
    expect(r.motivos).toEqual(["GRAVIDEZ"]);
    expect(r.reavaliarAPartirDe).toBeNull();
  });

  it("amamentação: até o bebê completar 1 ano", () => {
    const r = verificarAptidao(respostas({ amamentando: { dataNascimentoBebe: d(2026, 2, 1) } }), HOJE);
    expect(r.reavaliarAPartirDe).toEqual(d(2027, 2, 1));
  });

  it("hepatite após os 11 anos: inapto, mesmo com outros motivos temporários", () => {
    const r = verificarAptidao(respostas({ hepatiteApos11Anos: true, dormiu6Horas: false }), HOJE);
    expect(r.resultado).toBe("inapto");
    expect(r.motivos).toEqual(["SONO", "HEPATITE_APOS_11_ANOS"]);
    expect(r.reavaliarAPartirDe).toBeNull();
  });

  it("vários temporários com data: reavaliar a partir da maior", () => {
    const r = verificarAptidao(
      respostas({ dataTatuagem: d(2026, 3, 15), gripe: { situacao: "sintomas_terminaram", fim: d(2026, 10, 10) } }),
      HOJE,
    );
    expect(r.motivos).toEqual(["GRIPE_RESFRIADO", "TATUAGEM"]);
    expect(r.reavaliarAPartirDe).toEqual(d(2027, 3, 15));
  });

  it("um temporário sem data impede calcular a reavaliação", () => {
    const r = verificarAptidao(respostas({ dataTatuagem: d(2026, 3, 15), gravida: true }), HOJE);
    expect(r.reavaliarAPartirDe).toBeNull();
  });
});
