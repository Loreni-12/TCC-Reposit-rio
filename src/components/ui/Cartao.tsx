import type { HTMLAttributes } from "react";

type Tom = "branco" | "rosa" | "vermelho";

const TONS: Record<Tom, string> = {
  branco: "bg-branco",
  rosa: "bg-rosa-claro/60",
  vermelho: "bg-vermelho text-branco",
};

interface CartaoProps extends HTMLAttributes<HTMLDivElement> {
  /** "branco" sobre fundo rosa; "rosa" sobre fundo branco; "vermelho" para destaque. */
  tom?: Tom;
  /** Espaçamento interno (classes p-*), separado para não conflitar com className. */
  espacamento?: string;
}

export function Cartao({ tom = "branco", espacamento = "p-6 sm:p-7", className = "", ...props }: CartaoProps) {
  return <div className={`rounded-3xl ${espacamento} ${TONS[tom]} ${className}`} {...props} />;
}
