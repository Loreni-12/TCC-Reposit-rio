import type { HTMLAttributes } from "react";

/** Superfície branca padrão sobre o fundo rosa. */
export function Cartao({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-xl border border-rosa bg-branco p-5 sm:p-6 ${className}`} {...props} />;
}
