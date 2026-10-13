import type { ReactNode } from "react";

/** Link para site externo: nova aba, sem repassar a origem, com aviso para leitores de tela. */
export function LinkExterno({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 hover:text-vermelho ${className}`}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
