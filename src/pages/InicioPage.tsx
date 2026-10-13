import { useEffect } from "react";
import { useLocation } from "react-router";
import { FaixaTriagem } from "../components/inicio/FaixaTriagem";
import { SecaoAbertura } from "../components/inicio/SecaoAbertura";
import { SecaoAgendamento } from "../components/inicio/SecaoAgendamento";
import { SecaoEquipe } from "../components/inicio/SecaoEquipe";
import { SecaoInformacoes } from "../components/inicio/SecaoInformacoes";
import { useTituloDocumento } from "../components/useTituloDocumento";
import { ROTAS } from "../config/rotas";

/** Página única: o site inteiro em seções; navegação por âncoras (/#equipe etc.). */
export function InicioPage() {
  useTituloDocumento(ROTAS.inicio.titulo);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <SecaoAbertura />
      <SecaoInformacoes />
      <FaixaTriagem />
      <SecaoAgendamento />
      <SecaoEquipe />
    </>
  );
}
