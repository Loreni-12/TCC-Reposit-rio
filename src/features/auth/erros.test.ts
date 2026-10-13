import { describe, expect, it } from "vitest";
import { mensagemDeErro } from "./erros";

describe("mensagemDeErro", () => {
  it("traduz códigos conhecidos", () => {
    expect(mensagemDeErro({ code: "auth/invalid-credential" })).toBe("E-mail ou senha incorretos.");
  });

  it("mostra o código quando não conhece", () => {
    expect(mensagemDeErro({ code: "auth/algo-novo" })).toBe("Algo deu errado (auth/algo-novo).");
  });

  it("tem mensagem genérica para erros sem código", () => {
    expect(mensagemDeErro(new Error("x"))).toBe("Algo deu errado. Tente de novo.");
  });
});
