import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "../components/layout/Navbar";
import { Rodape } from "../components/layout/Rodape";

export function LayoutPrincipal() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-branco focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <Outlet />
      </main>
      <Rodape />
      <ScrollRestoration />
    </div>
  );
}
