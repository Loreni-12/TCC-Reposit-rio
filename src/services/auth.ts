import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import type { UsuarioAuth } from "../types/usuario";

// Versão real do Quadro 1 da monografia (cadastrar/entrar), mais login com Google.

function paraUsuario(user: User): UsuarioAuth {
  return { uid: user.uid, email: user.email, nome: user.displayName };
}

export async function cadastrar(email: string, senha: string, nome: string): Promise<UsuarioAuth> {
  const credencial = await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(credencial.user, { displayName: nome });
  return { ...paraUsuario(credencial.user), nome };
}

export async function entrar(email: string, senha: string): Promise<UsuarioAuth> {
  const credencial = await signInWithEmailAndPassword(auth, email, senha);
  return paraUsuario(credencial.user);
}

export async function entrarComGoogle(): Promise<UsuarioAuth> {
  const credencial = await signInWithPopup(auth, new GoogleAuthProvider());
  return paraUsuario(credencial.user);
}

export function sair(): Promise<void> {
  return signOut(auth);
}

export function redefinirSenha(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

/** Observa login/logout. Devolve a função para cancelar a observação. */
export function observarUsuario(aoMudar: (usuario: UsuarioAuth | null) => void): () => void {
  return onAuthStateChanged(auth, (user) => aoMudar(user ? paraUsuario(user) : null));
}
