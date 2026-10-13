import type { DadosCadastro } from "../../types/usuario";
import { idadeEmAnos, inicioDoDia, lerDataIso } from "../triagem/datas";

export interface FormularioEntrar {
  email: string;
  senha: string;
}

export interface FormularioPerfil {
  nome: string;
  dataNascimento: string;
  telefone: string;
  consentimento: boolean;
}

export interface FormularioCadastro extends FormularioEntrar, FormularioPerfil {}

export type Erros<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validarEntrar(f: FormularioEntrar): Erros<FormularioEntrar> {
  const erros: Erros<FormularioEntrar> = {};
  if (!EMAIL.test(f.email.trim())) erros.email = "Informe um e-mail válido.";
  if (!f.senha) erros.senha = "Informe sua senha.";
  return erros;
}

/** Valida os dados do perfil (usado no cadastro por e-mail e ao completar o cadastro após o Google). */
export function validarPerfil(f: FormularioPerfil, agora: Date = new Date()): Erros<FormularioPerfil> {
  const erros: Erros<FormularioPerfil> = {};
  const nome = f.nome.trim();
  if (nome.length < 2) erros.nome = "Informe seu nome.";
  else if (nome.length > 100) erros.nome = "Use no máximo 100 caracteres.";

  const nascimento = lerDataIso(f.dataNascimento);
  if (!f.dataNascimento) erros.dataNascimento = "Informe sua data de nascimento.";
  else if (!nascimento) erros.dataNascimento = "Data inválida.";
  else if (nascimento > inicioDoDia(agora)) erros.dataNascimento = "A data não pode estar no futuro.";
  else if (idadeEmAnos(nascimento, agora) > 120) erros.dataNascimento = "Confira o ano de nascimento.";

  const digitos = f.telefone.replace(/\D/g, "");
  if (f.telefone.trim() && (digitos.length < 10 || digitos.length > 11)) {
    erros.telefone = "Informe DDD + número (10 ou 11 dígitos).";
  }

  if (!f.consentimento) erros.consentimento = "É preciso concordar para criar a conta.";
  return erros;
}

export function validarCadastro(f: FormularioCadastro, agora: Date = new Date()): Erros<FormularioCadastro> {
  const erros: Erros<FormularioCadastro> = { ...validarPerfil(f, agora) };
  if (!EMAIL.test(f.email.trim())) erros.email = "Informe um e-mail válido.";
  if (f.senha.length < 6) erros.senha = "A senha precisa ter pelo menos 6 caracteres.";
  return erros;
}

/** Converte o formulário já validado no que vai para o banco. */
export function paraDadosCadastro(f: FormularioPerfil): DadosCadastro {
  const digitos = f.telefone.replace(/\D/g, "");
  return { nome: f.nome.trim(), dataNascimento: f.dataNascimento, telefone: digitos || null };
}
