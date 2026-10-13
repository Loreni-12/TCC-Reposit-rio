import type { HTMLAttributes } from "react";

/** Largura máxima e margens laterais padrão do site. */
export function Conteiner({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`} {...props} />;
}
