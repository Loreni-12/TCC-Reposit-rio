import { createContext, useContext } from "react";
import type { DadosCadastro, PerfilUsuario, UsuarioAuth } from "../../types/usuario";

export type ModoModalConta = "entrar" | "cadastrar";

export interface EstadoConta {
  usuario: UsuarioAuth | null;
  perfil: PerfilUsuario | null;
  /** true enquanto o Firebase ainda não respondeu quem está logado ou o perfil está carregando. */
  carregando: boolean;
  modalAberto: boolean;
  modoModal: ModoModalConta;
  abrirModal: (modo?: ModoModalConta) => void;
  fecharModal: () => void;
  entrar: (email: string, senha: string) => Promise<void>;
  entrarComGoogle: () => Promise<void>;
  cadastrar: (email: string, senha: string, dados: DadosCadastro) => Promise<void>;
  completarCadastro: (dados: DadosCadastro) => Promise<void>;
  redefinirSenha: (email: string) => Promise<void>;
  sair: () => Promise<void>;
}

export const ContextoConta = createContext<EstadoConta | null>(null);

export function useConta(): EstadoConta {
  const contexto = useContext(ContextoConta);
  if (!contexto) throw new Error("useConta precisa estar dentro de <ProvedorConta>.");
  return contexto;
}
