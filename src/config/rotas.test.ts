import { describe, expect, it } from "vitest";
import { MENU_PRINCIPAL, ROTAS, SECOES } from "./rotas";

describe("rotas e seções", () => {
  it("tem caminhos únicos e absolutos", () => {
    const caminhos = Object.values(ROTAS).map((r) => r.caminho);
    expect(new Set(caminhos).size).toBe(caminhos.length);
    for (const caminho of caminhos) expect(caminho.startsWith("/")).toBe(true);
  });

  it("tem ids de seção únicos", () => {
    const ids = Object.values(SECOES).map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("todo item do menu aponta para uma rota ou seção existente", () => {
    const caminhos = new Set<string>(Object.values(ROTAS).map((r) => r.caminho));
    const ancoras = new Set(Object.values(SECOES).map((s) => `#${s.id}`));
    for (const { destino } of MENU_PRINCIPAL) {
      expect(caminhos.has(destino.pathname)).toBe(true);
      if (destino.hash) expect(ancoras.has(destino.hash)).toBe(true);
    }
  });
});
