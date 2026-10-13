import { Hospital, ClipboardCheck, MapPin } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { TituloPagina } from "../components/TituloPagina";
import { LinkBotao } from "../components/ui/Botao";
import { Cartao } from "../components/ui/Cartao";
import { LinkExterno } from "../components/ui/LinkExterno";
import { LINKS_OFICIAIS } from "../config/links";
import { ROTAS } from "../config/rotas";

// Conteúdo informativo (UC1) entra na etapa "página de informações", sempre com fonte.
export function InicioPage() {
  return (
    <>
      <section className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <div>
          <TituloPagina subtitulo="Descubra se você provavelmente pode doar sangue, entenda os requisitos e encontre os canais oficiais do HEMOSC para agendar sua doação.">
            {ROTAS.inicio.titulo}
          </TituloPagina>
          <div className="flex flex-wrap gap-3">
            <LinkBotao para={ROTAS.triagem.caminho}>Fazer pré-triagem</LinkBotao>
            <LinkBotao para={LINKS_OFICIAIS.hemoscRequisitos.url} variante="secundario">
              Requisitos oficiais
            </LinkBotao>
          </div>
        </div>
        <img src={logo} alt="Logo do Doe + Vida: bolsa de sangue ligada a um coração" className="mx-auto w-full max-w-xs rounded-xl bg-branco p-4" />
      </section>

      <section aria-label="Atalhos" className="mt-12 grid gap-4 sm:grid-cols-3">
        <Cartao>
          <ClipboardCheck aria-hidden className="mb-3 size-7 text-vermelho" />
          <h2 className="text-lg">Pré-triagem</h2>
          <p className="mt-1 text-sm text-cinza">Responda perguntas baseadas nos critérios do Ministério da Saúde.</p>
          <Link to={ROTAS.triagem.caminho} className="mt-3 inline-block text-sm font-semibold text-vermelho underline underline-offset-2">
            Começar
          </Link>
        </Cartao>
        <Cartao>
          <MapPin aria-hidden className="mb-3 size-7 text-vermelho" />
          <h2 className="text-lg">Onde doar</h2>
          <p className="mt-1 text-sm text-cinza">Endereços e horários das unidades do HEMOSC.</p>
          <LinkExterno href={LINKS_OFICIAIS.hemoscOndeDoar.url} className="mt-3 inline-block text-sm font-semibold text-vermelho">
            Ver no site do HEMOSC
          </LinkExterno>
        </Cartao>
        <Cartao>
          <Hospital aria-hidden className="mb-3 size-7 text-vermelho" />
          <h2 className="text-lg">Agendamento</h2>
          <p className="mt-1 text-sm text-cinza">O horário é marcado diretamente com o hemocentro.</p>
          <LinkExterno href={LINKS_OFICIAIS.hemoscAgendamento.url} className="mt-3 inline-block text-sm font-semibold text-vermelho">
            Agendar no HEMOSC
          </LinkExterno>
        </Cartao>
      </section>
    </>
  );
}
