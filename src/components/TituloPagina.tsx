interface TituloPaginaProps {
  children: string;
}

export function TituloPagina({ children }: TituloPaginaProps) {
  return <h1 className="text-3xl font-bold text-primaria">{children}</h1>;
}
