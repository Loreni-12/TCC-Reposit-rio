import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type To } from "react-router";

type Variante = "primario" | "secundario" | "claro";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";
const VARIANTES: Record<Variante, string> = {
  primario: "bg-vermelho text-branco hover:bg-vermelho-escuro",
  secundario: "border border-vermelho/40 bg-branco text-vermelho hover:border-vermelho hover:bg-rosa-claro",
  claro: "bg-branco text-vermelho hover:bg-rosa-claro",
};

function classesBotao(variante: Variante, extra = ""): string {
  return `${BASE} ${VARIANTES[variante]} ${extra}`;
}

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

export function Botao({ variante = "primario", className = "", type = "button", ...props }: BotaoProps) {
  return <button type={type} className={classesBotao(variante, className)} {...props} />;
}

interface LinkBotaoProps {
  para: To;
  variante?: Variante;
  className?: string;
  children: ReactNode;
}

/** Link com aparência de botão. URLs externas abrem em nova aba. */
export function LinkBotao({ para, variante = "primario", className = "", children }: LinkBotaoProps) {
  if (typeof para === "string" && /^https?:\/\//.test(para)) {
    return (
      <a href={para} target="_blank" rel="noopener noreferrer" className={classesBotao(variante, className)}>
        {children}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link to={para} className={classesBotao(variante, className)}>
      {children}
    </Link>
  );
}
