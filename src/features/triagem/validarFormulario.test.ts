import { describe, expect, it } from "vitest";
import { FORMULARIO_VAZIO, validarFormulario, type FormularioTriagem } from "./validarFormulario";

const HOJE = new Date(2026, 9, 12);

const preenchido: FormularioTriagem = {
  ...FORMULARIO_VAZIO,
  dataNascimento: "1995-05-20",
  sexo: "masculino",
  peso: "72,5",
  jaDoou: "nao",
  dormiu6Horas: "sim",
  gripe: "nao",
  tatuagem12Meses: "nao",
  malaria12Meses: "nao",
  hepatiteApos11Anos: "nao",
};

describe("validarFormulario", () => {
  it("formulário vazio aponta as perguntas obrigatórias", () => {
    const r = validarFormulario(FORMULARIO_VAZIO, HOJE);
    expect(r.valido).toBe(false);
    if (r.valido) return;
    expect(Object.keys(r.erros).sort()).toEqual(
      ["dataNascimento", "dormiu6Horas", "gripe", "hepatiteApos11Anos", "jaDoou", "malaria12Meses", "peso", "sexo", "tatuagem12Meses"].sort(),
    );
  });

  it("converte um formulário válido (peso com vírgula)", () => {
    const r = validarFormulario(preenchido, HOJE);
    expect(r.valido).toBe(true);
    if (!r.valido) return;
    expect(r.respostas.pesoKg).toBe(72.5);
    expect(r.respostas.dataNascimento).toEqual(new Date(1995, 4, 20));
    expect(r.respostas.ultimaDoacao).toBeNull();
  });

  it("exige gravidez e amamentação apenas para o sexo feminino", () => {
    const r = validarFormulario({ ...preenchido, sexo: "feminino" }, HOJE);
    expect(r.valido).toBe(false);
    if (r.valido) return;
    expect(Object.keys(r.erros).sort()).toEqual(["amamentando", "gravida"]);
  });

  it("ignora respostas de gravidez se o sexo for masculino", () => {
    const r = validarFormulario({ ...preenchido, gravida: "sim" }, HOJE);
    expect(r.valido && r.respostas.gravida).toBe(false);
  });

  it("exige data e quantidade quando já doou", () => {
    const r = validarFormulario({ ...preenchido, jaDoou: "sim" }, HOJE);
    expect(r.valido).toBe(false);
    if (r.valido) return;
    expect(r.erros.dataUltimaDoacao).toBeDefined();
    expect(r.erros.doacoesUltimos12Meses).toBeDefined();
  });

  it("rejeita datas no futuro", () => {
    const r = validarFormulario({ ...preenchido, dataNascimento: "2030-01-01" }, HOJE);
    expect(!r.valido && r.erros.dataNascimento).toBe("A data não pode estar no futuro.");
  });

  it("rejeita tatuagem com data fora dos últimos 12 meses", () => {
    const r = validarFormulario({ ...preenchido, tatuagem12Meses: "sim", dataTatuagem: "2024-01-01" }, HOJE);
    expect(!r.valido && r.erros.dataTatuagem).toBe("A data deve estar dentro dos últimos 12 meses.");
  });

  it("rejeita peso inválido", () => {
    for (const peso of ["abc", "0", "-3", "500"]) {
      const r = validarFormulario({ ...preenchido, peso }, HOJE);
      expect(r.valido).toBe(false);
    }
  });
});
