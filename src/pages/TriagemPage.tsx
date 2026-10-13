import { TituloPagina } from "../components/TituloPagina";
import { ROTAS } from "../config/rotas";

export function TriagemPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <TituloPagina>{ROTAS.triagem.titulo}</TituloPagina>
    </main>
  );
}
