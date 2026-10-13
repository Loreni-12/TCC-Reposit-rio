import { ClipboardCheck, Droplet, Hospital, Lock, MapPin, ShieldCheck } from "lucide-react";
import logo from "../../assets/logo.png";
import { LINKS_OFICIAIS } from "../../config/links";
import { ROTAS, SECOES } from "../../config/rotas";
import { LinkBotao } from "../ui/Botao";
import { Conteiner } from "../ui/Conteiner";

const GARANTIAS = [
  { icone: ShieldCheck, texto: "Critérios de fontes oficiais" },
  { icone: Lock, texto: "Suas respostas não são salvas" },
  { icone: Hospital, texto: "Agendamento direto com o HEMOSC" },
];

export function SecaoAbertura() {
  return (
    <section className="overflow-hidden bg-rosa-claro">
      <Conteiner className="grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-branco px-4 py-1.5 text-sm font-semibold text-vermelho">
            <Droplet aria-hidden className="size-4" /> Pré-triagem online, gratuita e sem cadastro
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Doar sangue começa com <span className="text-vermelho">informação</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cinza">
            Descubra se você provavelmente pode doar, entenda os requisitos e chegue ao hemocentro preparado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkBotao para={ROTAS.triagem.caminho}>
              <ClipboardCheck aria-hidden className="size-4" /> Fazer pré-triagem
            </LinkBotao>
            <LinkBotao para={{ pathname: "/", hash: `#${SECOES.informacoes.id}` }} variante="secundario">
              Quem pode doar
            </LinkBotao>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {GARANTIAS.map(({ icone: Icone, texto }) => (
              <li key={texto} className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-branco text-vermelho">
                  <Icone aria-hidden className="size-4" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div aria-hidden className="absolute -inset-6 rounded-full border-2 border-dashed border-rosa" />
          <div className="relative grid aspect-square place-items-center rounded-full bg-branco p-12">
            <img src={logo} alt="Logo do Doe + Vida: bolsa de sangue ligada a um coração" className="w-full" />
          </div>
          <a
            href={LINKS_OFICIAIS.hemoscOndeDoar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -left-2 bottom-8 flex items-center gap-2 rounded-full bg-branco px-4 py-2 text-sm font-semibold hover:text-vermelho sm:-left-6"
          >
            <MapPin aria-hidden className="size-4 text-vermelho" /> Onde doar
            <span className="sr-only"> (abre o site do HEMOSC em nova aba)</span>
          </a>
        </div>
      </Conteiner>
    </section>
  );
}
