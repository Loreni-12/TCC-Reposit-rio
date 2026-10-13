import { useId } from "react";

export interface Opcao<T extends string> {
  valor: T;
  rotulo: string;
}

interface CampoOpcoesProps<T extends string> {
  pergunta: string;
  nome: string;
  opcoes: readonly Opcao<T>[];
  valor: T | "";
  aoMudar: (valor: T) => void;
  dica?: string;
  erro?: string;
}

/** Grupo de radio buttons (fieldset + legend) com erro acessível. */
export function CampoOpcoes<T extends string>({ pergunta, nome, opcoes, valor, aoMudar, dica, erro }: CampoOpcoesProps<T>) {
  const id = useId();
  const descricao = [dica && `${id}-dica`, erro && `${id}-erro`].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset aria-describedby={descricao} aria-invalid={erro ? true : undefined}>
      <legend className="font-semibold">{pergunta}</legend>
      {dica && (
        <p id={`${id}-dica`} className="mt-0.5 text-sm text-cinza">
          {dica}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {opcoes.map((opcao) => (
          <label
            key={opcao.valor}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors hover:border-vermelho ${
              valor === opcao.valor ? "border-vermelho bg-rosa-claro" : erro ? "border-vermelho" : "border-rosa"
            }`}
          >
            <input
              type="radio"
              name={`${nome}-${id}`}
              value={opcao.valor}
              checked={valor === opcao.valor}
              onChange={() => aoMudar(opcao.valor)}
              className="accent-vermelho"
            />
            {opcao.rotulo}
          </label>
        ))}
      </div>
      {erro && (
        <p id={`${id}-erro`} className="mt-1 text-sm font-semibold text-vermelho">
          {erro}
        </p>
      )}
    </fieldset>
  );
}
