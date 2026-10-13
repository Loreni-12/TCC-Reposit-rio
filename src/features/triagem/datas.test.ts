import { describe, expect, it } from "vitest";
import { idadeEmAnos, lerDataIso, somarMeses } from "./datas";

describe("datas", () => {
  it("lerDataIso aceita datas válidas e recusa inexistentes", () => {
    expect(lerDataIso("2024-02-29")).toEqual(new Date(2024, 1, 29));
    expect(lerDataIso("2023-02-29")).toBeNull();
    expect(lerDataIso("29/02/2024")).toBeNull();
  });

  it("somarMeses usa o último dia quando o mês é mais curto", () => {
    expect(somarMeses(new Date(2026, 0, 31), 1)).toEqual(new Date(2026, 1, 28));
    expect(somarMeses(new Date(2024, 0, 31), 1)).toEqual(new Date(2024, 1, 29));
    expect(somarMeses(new Date(2026, 10, 15), 3)).toEqual(new Date(2027, 1, 15));
  });

  it("idadeEmAnos considera se o aniversário já passou", () => {
    const hoje = new Date(2026, 9, 12);
    expect(idadeEmAnos(new Date(2010, 9, 12), hoje)).toBe(16);
    expect(idadeEmAnos(new Date(2010, 9, 13), hoje)).toBe(15);
  });
});
