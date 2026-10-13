/** Usuário autenticado (independe do SDK do Firebase, para as camadas de cima). */
export interface UsuarioAuth {
  uid: string;
  email: string | null;
  nome: string | null;
}

/** Dados que a pessoa informa no cadastro (classe Usuario / Tabela 1 da monografia). */
export interface DadosCadastro {
  nome: string;
  /** "AAAA-MM-DD" */
  dataNascimento: string;
  telefone: string | null;
}

/** Documento users/{uid} no Firestore. */
export interface PerfilUsuario extends DadosCadastro {
  email: string;
  dataCadastro: Date | null;
  consentimentoLgpdEm: Date | null;
}
