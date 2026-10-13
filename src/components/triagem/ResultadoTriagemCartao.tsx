import { CircleCheck, CircleAlert, CircleX } from "lucide-react";
import { useEffect, useRef } from "react";
import { CRITERIOS, type CodigoCriterio } from "../../config/criterios";
import { FONTES } from "../../config/fontes";
import { LINKS_OFICIAIS } from "../../config/links";
import { SECOES } from "../../config/rotas";
import { formatarDataBr } from "../../features/triagem/datas";
import type { ResultadoAptidao, ResultadoTriagem } from "../../types/triagem";
import { Botao, LinkBotao } from "../ui/Botao";
import { Cartao } from "../ui/Cartao";
import { LinkExterno } from "../ui/LinkExterno";

const TEXTOS: Record<ResultadoAptidao, { titulo: string; resumo: string; icone: typeof CircleCheck }> = {
  apto: {
    titulo: "Você provavelmente pode doar",
    resumo: "Pelas suas respostas, você atende aos critérios consultados. A confirmação é feita na triagem do hemocentro.",
    icone: CircleCheck,
  },
  inapto_temporario: {
    titulo: "Por enquanto, você provavelmente ainda não pode doar",
    resumo: "Encontramos impedimentos temporários. Veja abaixo o que fazer para ficar apto.",
    icone: CircleAlert,
  },
  inapto: {
    titulo: "Pelos critérios consultados, você provavelmente não pode doar",
    resumo: "Encontramos um impedimento definitivo. Em caso de dúvida, converse com o hemocentro.",
    icone: CircleX,
  },
};

function ItemCriterio({ codigo }: { codigo: CodigoCriterio }) {
  const criterio = CRITERIOS[codigo];
  const fonte = FONTES[criterio.fonte];
  return (
    <li className="rounded-2xl bg-rosa-claro/60 p-4">
      <p className="font-semibold">{criterio.titulo}</p>
      <p className="mt-1">{criterio.orientacao}</p>
      <p className="mt-2 text-xs text-cinza">
        Fonte: <LinkExterno href={fonte.url}>{`${fonte.orgao}, ${fonte.titulo}`}</LinkExterno>
      </p>
    </li>
  );
}

interface Props {
  resultado: ResultadoTriagem;
  aoRefazer: () => void;
}

export function ResultadoTriagemCartao({ resultado, aoRefazer }: Props) {
  const titulo = useRef<HTMLHeadingElement>(null);
  const texto = TEXTOS[resultado.resultado];
  const Icone = texto.icone;

  // Leva o foco ao resultado para leitores de tela e teclado.
  useEffect(() => titulo.current?.focus(), []);

  return (
    <Cartao className="space-y-6">
      <div className="flex gap-3">
        <Icone aria-hidden className="mt-1 size-7 shrink-0 text-vermelho" />
        <div>
          <h2 ref={titulo} tabIndex={-1} className="text-2xl outline-none">
            {texto.titulo}
          </h2>
          <p className="mt-2 text-cinza">{texto.resumo}</p>
          {resultado.reavaliarAPartirDe && (
            <p className="mt-3 font-semibold">
              Você pode refazer a pré-triagem a partir de {formatarDataBr(resultado.reavaliarAPartirDe)}.
            </p>
          )}
        </div>
      </div>

      {resultado.motivos.length > 0 && (
        <section aria-labelledby="titulo-motivos">
          <h3 id="titulo-motivos" className="mb-3 text-lg">
            O que encontramos
          </h3>
          <ul className="space-y-3">
            {resultado.motivos.map((codigo) => (
              <ItemCriterio key={codigo} codigo={codigo} />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="titulo-orientacoes">
        <h3 id="titulo-orientacoes" className="mb-3 text-lg">
          Orientações para o dia da doação
        </h3>
        <ul className="space-y-3">
          {resultado.orientacoes.map((codigo) => (
            <ItemCriterio key={codigo} codigo={codigo} />
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        {resultado.resultado === "apto" ? (
          <>
            <LinkBotao para={LINKS_OFICIAIS.hemoscAgendamento.url}>Agendar no HEMOSC</LinkBotao>
            <LinkBotao para={{ pathname: "/", hash: `#${SECOES.agendamento.id}` }} variante="secundario">
              Como agendar
            </LinkBotao>
          </>
        ) : (
          <LinkBotao para={LINKS_OFICIAIS.hemoscRequisitos.url}>Ver requisitos no HEMOSC</LinkBotao>
        )}
        <Botao variante="secundario" onClick={aoRefazer}>
          Refazer pré-triagem
        </Botao>
      </div>
    </Cartao>
  );
}
