import { ArrowRight } from "lucide-react";
import { ROTAS } from "../../config/rotas";
import { LinkBotao } from "../ui/Botao";
import { Conteiner } from "../ui/Conteiner";

const PASSOS = [
  { titulo: "Responda", texto: "Perguntas simples sobre você e sua saúde." },
  { titulo: "Veja o resultado", texto: "Saiba se provavelmente pode doar e o que fazer." },
  { titulo: "Agende", texto: "Marque seu horário direto com o HEMOSC." },
];

export function FaixaTriagem() {
  return (
    <section aria-labelledby="titulo-faixa-triagem" className="bg-branco pb-16">
      <Conteiner>
        <div className="grid gap-10 rounded-[2.5rem] bg-vermelho px-7 py-10 text-branco sm:px-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 id="titulo-faixa-triagem" className="text-3xl">
              Faça a pré-triagem antes de ir ao hemocentro
            </h2>
            <p className="mt-3 text-branco/90">Leva poucos minutos e não precisa de cadastro.</p>
            <LinkBotao para={ROTAS.triagem.caminho} variante="claro" className="mt-6">
              Começar agora <ArrowRight aria-hidden className="size-4" />
            </LinkBotao>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {PASSOS.map((passo, i) => (
              <li key={passo.titulo} className="rounded-3xl bg-branco/10 p-5">
                <span className="grid size-9 place-items-center rounded-full bg-branco font-semibold text-vermelho">{i + 1}</span>
                <p className="mt-3 font-semibold">{passo.titulo}</p>
                <p className="mt-1 text-sm text-branco/90">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </Conteiner>
    </section>
  );
}
