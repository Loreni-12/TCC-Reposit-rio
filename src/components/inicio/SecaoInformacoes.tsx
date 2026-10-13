import { Bed, CalendarClock, Cake, Scale, Utensils, type LucideIcon } from "lucide-react";
import { FONTES } from "../../config/fontes";
import {
  FONTE_INFORMACOES,
  IMPEDIMENTOS_DEFINITIVOS,
  IMPEDIMENTOS_TEMPORARIOS,
  INTERVALOS,
  REQUISITOS_BASICOS,
} from "../../config/informacoes";
import { SECOES } from "../../config/rotas";
import { Cartao } from "../ui/Cartao";
import { Conteiner } from "../ui/Conteiner";
import { LinkExterno } from "../ui/LinkExterno";
import { Onda } from "../ui/Onda";
import { CabecalhoSecao } from "./CabecalhoSecao";

const ICONES_REQUISITOS: LucideIcon[] = [Cake, Scale, Bed, Utensils];

export function SecaoInformacoes() {
  const fonte = FONTES[FONTE_INFORMACOES];

  return (
    <section id={SECOES.informacoes.id} className="bg-branco">
      <Onda className="text-rosa-claro" />
      <Conteiner className="py-14">
        <CabecalhoSecao
          sobretitulo={SECOES.informacoes.rotulo}
          titulo="Requisitos para doar sangue"
          descricao="O básico para saber se você pode doar. A confirmação final é sempre feita na triagem do hemocentro."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {REQUISITOS_BASICOS.map((item, i) => {
              const Icone = ICONES_REQUISITOS[i] ?? Cake;
              return (
                <Cartao key={item.titulo} tom="rosa">
                  <span className="mb-4 grid size-11 place-items-center rounded-full bg-branco text-vermelho">
                    <Icone aria-hidden className="size-5" />
                  </span>
                  <h3 className="text-lg">{item.titulo}</h3>
                  <p className="mt-1 text-sm text-cinza">{item.texto}</p>
                </Cartao>
              );
            })}
          </div>

          <Cartao tom="vermelho" className="flex flex-col">
            <CalendarClock aria-hidden className="mb-4 size-8" />
            <h3 className="text-xl">Intervalo entre doações</h3>
            <div className="mt-6 flex flex-1 flex-col justify-center gap-6">
              {INTERVALOS.map((item) => (
                <div key={item.titulo}>
                  <p className="text-4xl font-semibold">{item.destaque}</p>
                  <p className="mt-1 text-sm">
                    <strong>{item.titulo}:</strong> {item.texto}
                  </p>
                </div>
              ))}
            </div>
          </Cartao>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div>
            <h3 className="text-2xl">Impedimentos temporários</h3>
            <p className="mt-2 text-cinza">Algumas situações pedem só um tempo de espera antes de doar.</p>
            {IMPEDIMENTOS_DEFINITIVOS.map((item) => (
              <p key={item.titulo} className="mt-5 rounded-2xl border border-rosa px-4 py-3 text-sm">
                <strong className="text-vermelho">Impedimento definitivo:</strong> {item.titulo.toLowerCase()}. {item.texto}
              </p>
            ))}
          </div>
          <ul className="grid grid-cols-2 gap-3 xl:grid-cols-3">
            {IMPEDIMENTOS_TEMPORARIOS.map((item) => (
              <li key={item.titulo} className="rounded-3xl bg-rosa-claro/60 p-4 sm:p-5">
                <p className="text-sm font-semibold text-vermelho">{item.destaque}</p>
                <p className="mt-1 font-semibold">{item.titulo}</p>
                <p className="text-sm text-cinza">{item.texto}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs text-cinza">
          Fonte: <LinkExterno href={fonte.url}>{`${fonte.orgao}, ${fonte.titulo}`}</LinkExterno>.
        </p>
      </Conteiner>
    </section>
  );
}
