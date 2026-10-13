import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

// Projeto "demo-*": o emulador nunca toca em recursos reais.
let ambiente: RulesTestEnvironment;

const EMAIL_ALICE = "alice@exemplo.com";
const alice = () => ambiente.authenticatedContext("alice", { email: EMAIL_ALICE }).firestore();
const bob = () => ambiente.authenticatedContext("bob", { email: "bob@exemplo.com" }).firestore();
const anonimo = () => ambiente.unauthenticatedContext().firestore();

function perfil(extra: Record<string, unknown> = {}) {
  return {
    nome: "Alice Souza",
    email: EMAIL_ALICE,
    dataNascimento: "2000-01-15",
    telefone: "47999991234",
    dataCadastro: serverTimestamp(),
    consentimentoLgpdEm: serverTimestamp(),
    ...extra,
  };
}

beforeAll(async () => {
  ambiente = await initializeTestEnvironment({
    projectId: "demo-doe-mais-vida",
    firestore: { rules: readFileSync("firestore.rules", "utf8") },
  });
});

beforeEach(async () => {
  await ambiente.clearFirestore();
});

afterAll(async () => {
  await ambiente.cleanup();
});

describe("acesso anônimo", () => {
  it("nega leitura e escrita sem login", async () => {
    await assertFails(getDoc(doc(anonimo(), "users/alice")));
    await assertFails(setDoc(doc(anonimo(), "users/alice"), perfil()));
  });

  it("nega coleções não liberadas, mesmo com login", async () => {
    await assertFails(setDoc(doc(alice(), "outra/x"), { a: 1 }));
    await assertFails(setDoc(doc(alice(), "users/alice/triagens/t1"), { resultado: "apto" }));
  });
});

describe("users/{uid}", () => {
  it("o dono cria e lê o próprio perfil", async () => {
    await assertSucceeds(setDoc(doc(alice(), "users/alice"), perfil()));
    await assertSucceeds(getDoc(doc(alice(), "users/alice")));
  });

  it("telefone pode ser nulo", async () => {
    await assertSucceeds(setDoc(doc(alice(), "users/alice"), perfil({ telefone: null })));
  });

  it("outro usuário não lê nem escreve o perfil alheio", async () => {
    await assertSucceeds(setDoc(doc(alice(), "users/alice"), perfil()));
    await assertFails(getDoc(doc(bob(), "users/alice")));
    await assertFails(setDoc(doc(bob(), "users/alice"), perfil()));
  });

  it("recusa campos extras (ex.: respostas da triagem)", async () => {
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ respostas: ["sim"] })));
  });

  it("recusa e-mail diferente do da conta", async () => {
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ email: "outro@exemplo.com" })));
  });

  it("recusa datas de cadastro definidas pelo cliente", async () => {
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ dataCadastro: new Date(2020, 0, 1) })));
  });

  it("recusa formatos inválidos", async () => {
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ dataNascimento: "15/01/2000" })));
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ telefone: "(47) 9999" })));
    await assertFails(setDoc(doc(alice(), "users/alice"), perfil({ nome: "A" })));
  });

  it("permite atualizar dados, mas não as datas de cadastro e consentimento", async () => {
    await assertSucceeds(setDoc(doc(alice(), "users/alice"), perfil()));
    await assertSucceeds(updateDoc(doc(alice(), "users/alice"), { nome: "Alice S." }));
    await assertFails(updateDoc(doc(alice(), "users/alice"), { dataCadastro: serverTimestamp() }));
  });

  it("não permite apagar o perfil (por enquanto)", async () => {
    await assertSucceeds(setDoc(doc(alice(), "users/alice"), perfil()));
    await assertFails(deleteDoc(doc(alice(), "users/alice")));
  });
});
