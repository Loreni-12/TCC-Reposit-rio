import { useEffect, type ReactNode } from "react";

interface TituloPaginaProps {
  children: string;
  subtitulo?: ReactNode;
}

/** Título principal da página; também atualiza o título da aba. */
export function TituloPagina({ children, subtitulo }: TituloPaginaProps) {
  useEffect(() => {
    document.title = `${children} | Doe + Vida`;
  }, [children]);

  return (
    <header className="mb-8">
      <h1 className="text-3xl text-vermelho sm:text-4xl">{children}</h1>
      {subtitulo && <p className="mt-3 max-w-2xl text-cinza">{subtitulo}</p>}
    </header>
  );
}
