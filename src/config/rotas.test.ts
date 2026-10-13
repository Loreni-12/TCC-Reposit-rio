import { describe, expect, it } from "vitest";
import { ROTAS } from "./rotas";

describe("ROTAS", () => {
  const rotas = Object.values(ROTAS);

  it("tem caminhos únicos e absolutos", () => {
    const caminhos = rotas.map((r) => r.caminho);
    expect(new Set(caminhos).size).toBe(caminhos.length);
    for (const caminho of caminhos) expect(caminho.startsWith("/")).toBe(true);
  });

  it("tem título em todas as rotas", () => {
    for (const rota of rotas) expect(rota.titulo.trim()).not.toBe("");
  });
});
