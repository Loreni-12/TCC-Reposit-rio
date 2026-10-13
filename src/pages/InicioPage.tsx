import { TituloPagina } from "../components/TituloPagina";
import { ROTAS } from "../config/rotas";

export function InicioPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <TituloPagina>{ROTAS.inicio.titulo}</TituloPagina>
    </main>
  );
}
