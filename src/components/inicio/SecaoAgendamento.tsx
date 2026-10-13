import { CalendarDays, ClipboardCheck, MapPin, Utensils } from "lucide-react";
import { LINKS_OFICIAIS } from "../../config/links";
import { ROTAS, SECOES } from "../../config/rotas";
import { LinkBotao } from "../ui/Botao";
import { Cartao } from "../ui/Cartao";
import { Conteiner } from "../ui/Conteiner";
import { Onda } from "../ui/Onda";
import { CabecalhoSecao } from "./CabecalhoSecao";

const ETAPAS = [
  { icone: ClipboardCheck, titulo: "Faça a pré-triagem", texto: "Veja se você provavelmente está apto." },
  { icone: CalendarDays, titulo: "Agende no HEMOSC", texto: "Escolha unidade, dia e horário no site oficial." },
  { icone: Utensils, titulo: "No dia da doação", texto: "Vá alimentado, evite gordura nas 3 horas antes e durma pelo menos 6 horas." },
];

export function SecaoAgendamento() {
  return (
    <section id={SECOES.agendamento.id} className="bg-rosa-claro">
      <Onda className="text-branco" invertida />
      <Conteiner className="grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <CabecalhoSecao
            sobretitulo={SECOES.agendamento.rotulo}
            titulo="Agende sua doação com o HEMOSC"
            descricao="O horário é marcado diretamente com o hemocentro. O Doe + Vida não agenda horários: ele leva você até os canais oficiais."
          />
          <div className="-mt-4 flex flex-wrap gap-3">
            <LinkBotao para={LINKS_OFICIAIS.hemoscAgendamento.url}>
              <CalendarDays aria-hidden className="size-4" /> Agendar no HEMOSC
            </LinkBotao>
            <LinkBotao para={LINKS_OFICIAIS.hemoscOndeDoar.url} variante="secundario">
              <MapPin aria-hidden className="size-4" /> Onde doar e horários
            </LinkBotao>
          </div>
        </div>

        <Cartao espacamento="p-2 sm:p-3">
          <ol>
            {ETAPAS.map(({ icone: Icone, titulo, texto }, i) => (
              <li key={titulo} className={`flex gap-4 p-4 sm:p-5 ${i > 0 ? "border-t border-rosa-claro" : ""}`}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rosa-claro text-vermelho">
                  <Icone aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">
                    {i + 1}. {titulo}
                  </p>
                  <p className="text-sm text-cinza">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="px-4 pb-4 sm:px-5">
            <LinkBotao para={ROTAS.triagem.caminho} variante="secundario" className="w-full">
              Começar pela pré-triagem
            </LinkBotao>
          </div>
        </Cartao>
      </Conteiner>
    </section>
  );
}
