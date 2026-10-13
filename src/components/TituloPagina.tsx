import type { ReactNode } from "react";
import { useTituloDocumento } from "./useTituloDocumento";

interface TituloPaginaProps {
  children: string;
  subtitulo?: ReactNode;
}

/** Título principal de páginas internas; também atualiza o título da aba. */
export function TituloPagina({ children, subtitulo }: TituloPaginaProps) {
  useTituloDocumento(children);

  return (
    <header className="mb-6">
      <h1 className="text-3xl text-vermelho sm:text-4xl">{children}</h1>
      {subtitulo && <p className="mt-3 text-cinza">{subtitulo}</p>}
    </header>
  );
}
