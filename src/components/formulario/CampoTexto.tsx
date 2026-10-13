import { useId, type InputHTMLAttributes } from "react";

interface CampoTextoProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  rotulo: string;
  dica?: string;
  erro?: string;
  aoMudar: (valor: string) => void;
}

/** Input com label, dica e mensagem de erro ligadas por aria-describedby. */
export function CampoTexto({ rotulo, dica, erro, aoMudar, className = "", ...props }: CampoTextoProps) {
  const id = useId();
  const idDica = `${id}-dica`;
  const idErro = `${id}-erro`;
  const descricao = [dica && idDica, erro && idErro].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block font-semibold">
        {rotulo}
      </label>
      {dica && (
        <p id={idDica} className="mt-0.5 text-sm text-cinza">
          {dica}
        </p>
      )}
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricao}
        onChange={(e) => aoMudar(e.target.value)}
        className={`mt-2 w-full max-w-xs rounded-lg border bg-branco px-3 py-2 ${erro ? "border-vermelho" : "border-rosa"}`}
        {...props}
      />
      {erro && (
        <p id={idErro} className="mt-1 text-sm font-semibold text-vermelho">
          {erro}
        </p>
      )}
    </div>
  );
}
