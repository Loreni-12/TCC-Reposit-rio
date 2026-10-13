import { Info } from "lucide-react";
import type { ReactNode } from "react";

/** Caixa de aviso discreta (ex.: "triagem não oficial"). */
export function Aviso({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-rosa bg-branco p-4 text-sm">
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-vermelho" />
      <div>{children}</div>
    </div>
  );
}
