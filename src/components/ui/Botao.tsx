import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type Variante = "primario" | "secundario";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors";
const VARIANTES: Record<Variante, string> = {
  primario: "bg-vermelho text-branco hover:bg-vermelho-escuro",
  secundario: "border border-vermelho bg-branco text-vermelho hover:bg-rosa-claro",
};

function classesBotao(variante: Variante = "primario"): string {
  return `${BASE} ${VARIANTES[variante]}`;
}

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
}

export function Botao({ variante = "primario", className = "", type = "button", ...props }: BotaoProps) {
  return <button type={type} className={`${classesBotao(variante)} ${className}`} {...props} />;
}

interface LinkBotaoProps {
  para: string;
  variante?: Variante;
  children: ReactNode;
}

/** Link com aparência de botão. URLs externas abrem em nova aba. */
export function LinkBotao({ para, variante = "primario", children }: LinkBotaoProps) {
  if (/^https?:\/\//.test(para)) {
    return (
      <a href={para} target="_blank" rel="noopener noreferrer" className={classesBotao(variante)}>
        {children}
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link to={para} className={classesBotao(variante)}>
      {children}
    </Link>
  );
}
