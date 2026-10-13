import {
  assertFails,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, it } from "vitest";

// Projeto "demo-*": o emulador nunca toca em recursos reais.
let ambiente: RulesTestEnvironment;

beforeAll(async () => {
  ambiente = await initializeTestEnvironment({
    projectId: "demo-doe-mais-vida",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

afterAll(async () => {
  await ambiente.cleanup();
});

describe("firestore.rules — negar por padrão", () => {
  it("nega leitura sem autenticação", async () => {
    const db = ambiente.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, "users/qualquer")));
  });

  it("nega escrita sem autenticação", async () => {
    const db = ambiente.unauthenticatedContext().firestore();
    await assertFails(setDoc(doc(db, "users/qualquer"), { nome: "Teste" }));
  });

  it("nega até o próprio dono enquanto o modelo não for liberado", async () => {
    const db = ambiente.authenticatedContext("alice").firestore();
    await assertFails(getDoc(doc(db, "users/alice")));
  });
});
