import { GraduationCap } from "lucide-react";
import { EQUIPE, INSTITUICAO, PROFESSORES, iniciais } from "../../config/equipe";
import { SECOES } from "../../config/rotas";
import { Cartao } from "../ui/Cartao";
import { Conteiner } from "../ui/Conteiner";
import { Onda } from "../ui/Onda";
import { CabecalhoSecao } from "./CabecalhoSecao";

export function SecaoEquipe() {
  return (
    <section id={SECOES.equipe.id} className="bg-branco">
      <Onda className="text-rosa-claro" />
      <Conteiner className="py-14">
        <CabecalhoSecao
          sobretitulo={SECOES.equipe.rotulo}
          titulo="Quem fez o Doe + Vida"
          descricao={`O Doe + Vida nasceu como Trabalho de Conclusão de Curso no ${INSTITUICAO.escola}, em ${INSTITUICAO.cidade}, para facilitar o acesso à informação sobre doação de sangue e incentivar novos doadores.`}
        />

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {EQUIPE.map((pessoa) => (
            <li key={pessoa.nome}>
              <Cartao tom="rosa" espacamento="p-4 sm:p-6" className="flex h-full flex-col items-center text-center">
                <span aria-hidden className="grid size-16 place-items-center rounded-full bg-branco text-xl font-semibold text-vermelho sm:size-20 sm:text-2xl">
                  {iniciais(pessoa.nome)}
                </span>
                <p className="mt-4 text-sm font-semibold sm:text-base">{pessoa.nome}</p>
                <p className="mt-2 rounded-full bg-branco px-3 py-1 text-xs font-semibold text-vermelho">{pessoa.funcao}</p>
              </Cartao>
            </li>
          ))}
        </ul>

        <Cartao tom="rosa" className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-branco text-vermelho">
            <GraduationCap aria-hidden className="size-6" />
          </span>
          <div className="text-sm">
            <p className="font-semibold">
              {INSTITUICAO.curso} · {INSTITUICAO.turma} · {INSTITUICAO.ano}
            </p>
            <p className="mt-1 text-cinza">
              {PROFESSORES.map((p, i) => (
                <span key={p.nome}>
                  {i > 0 && " · "}
                  Prof. {p.nome} ({p.papel})
                </span>
              ))}
            </p>
          </div>
        </Cartao>
      </Conteiner>
    </section>
  );
}
