import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { ModalConta } from "../components/conta/ModalConta";
import { Navbar } from "../components/layout/Navbar";
import { Rodape } from "../components/layout/Rodape";

export function LayoutPrincipal() {
  const { pathname } = useLocation();
  // A página inicial termina numa seção branca; as internas, no fundo rosa-claro.
  const corAcimaDoRodape = pathname === "/" ? "text-branco" : "text-rosa-claro";

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:rounded-full focus:bg-branco focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Rodape corAcima={corAcimaDoRodape} />
      <ModalConta />
      <ScrollRestoration />
    </div>
  );
}
