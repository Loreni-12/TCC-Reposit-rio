import { describe, expect, it } from "vitest";
import { paraDadosCadastro, validarCadastro, validarEntrar, type FormularioCadastro } from "./validarConta";

const HOJE = new Date(2026, 9, 12);
const valido: FormularioCadastro = {
  nome: "  Maria Souza ",
  email: "maria@exemplo.com",
  senha: "segredo1",
  dataNascimento: "2000-01-15",
  telefone: "(47) 99999-1234",
  consentimento: true,
};

describe("validarConta", () => {
  it("aceita um cadastro válido", () => {
    expect(validarCadastro(valido, HOJE)).toEqual({});
  });

  it("exige consentimento, senha de 6+ caracteres e e-mail válido", () => {
    const erros = validarCadastro({ ...valido, consentimento: false, senha: "123", email: "maria@" }, HOJE);
    expect(Object.keys(erros).sort()).toEqual(["consentimento", "email", "senha"]);
  });

  it("telefone é opcional, mas se informado precisa de 10 ou 11 dígitos", () => {
    expect(validarCadastro({ ...valido, telefone: "" }, HOJE)).toEqual({});
    expect(validarCadastro({ ...valido, telefone: "1234" }, HOJE).telefone).toBeDefined();
  });

  it("recusa data de nascimento no futuro", () => {
    expect(validarCadastro({ ...valido, dataNascimento: "2030-01-01" }, HOJE).dataNascimento).toBeDefined();
  });

  it("validarEntrar exige e-mail e senha", () => {
    expect(Object.keys(validarEntrar({ email: "", senha: "" })).sort()).toEqual(["email", "senha"]);
  });

  it("paraDadosCadastro limpa nome e guarda só os dígitos do telefone", () => {
    expect(paraDadosCadastro(valido)).toEqual({ nome: "Maria Souza", dataNascimento: "2000-01-15", telefone: "47999991234" });
    expect(paraDadosCadastro({ ...valido, telefone: "" }).telefone).toBeNull();
  });
});
