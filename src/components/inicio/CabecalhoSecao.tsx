interface Props {
  sobretitulo: string;
  titulo: string;
  descricao?: string;
}

export function CabecalhoSecao({ sobretitulo, titulo, descricao }: Props) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-vermelho">{sobretitulo}</p>
      <h2 className="text-3xl sm:text-4xl">{titulo}</h2>
      {descricao && <p className="mt-3 text-cinza">{descricao}</p>}
    </header>
  );
}
