import { Timestamp, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { db } from "../lib/firebase";
import type { DadosCadastro, PerfilUsuario } from "../types/usuario";

// Coleção users/{uid} (Tabela 1 da monografia). Regras em firestore.rules.

export async function criarPerfil(uid: string, email: string, dados: DadosCadastro): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    nome: dados.nome,
    email,
    dataNascimento: dados.dataNascimento,
    telefone: dados.telefone,
    dataCadastro: serverTimestamp(),
    consentimentoLgpdEm: serverTimestamp(),
  });
}

export async function buscarPerfil(uid: string): Promise<PerfilUsuario | null> {
  const snapshot = await getDoc(doc(db, "users", uid));
  if (!snapshot.exists()) return null;
  const dados = snapshot.data();
  const data = (valor: unknown) => (valor instanceof Timestamp ? valor.toDate() : null);
  return {
    nome: String(dados.nome ?? ""),
    email: String(dados.email ?? ""),
    dataNascimento: String(dados.dataNascimento ?? ""),
    telefone: typeof dados.telefone === "string" ? dados.telefone : null,
    dataCadastro: data(dados.dataCadastro),
    consentimentoLgpdEm: data(dados.consentimentoLgpdEm),
  };
}
