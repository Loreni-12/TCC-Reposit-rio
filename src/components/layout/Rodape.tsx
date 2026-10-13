import { Heart } from "lucide-react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { INSTITUICAO } from "../../config/equipe";
import { LINKS_OFICIAIS } from "../../config/links";
import { SECOES } from "../../config/rotas";
import { LinkExterno } from "../ui/LinkExterno";
import { Onda } from "../ui/Onda";

const FONTES_RODAPE = [LINKS_OFICIAIS.faqMinisterioSaude, LINKS_OFICIAIS.hemoscRequisitos, LINKS_OFICIAIS.hemoscOndeDoar];

/** `corAcima`: cor da seção logo acima do rodapé, para a onda emendar. */
export function Rodape({ corAcima = "text-branco" }: { corAcima?: string }) {
  return (
    <footer className="bg-rosa text-sm">
      <Onda className={corAcima} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-10 pt-6 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr] lg:px-12">
        <section aria-labelledby="rodape-aviso">
          <div className="mb-4 flex items-center gap-3">
            <img src={logo} alt="" width={64} height={54} className="h-12 w-auto rounded-xl bg-branco p-1" />
            <h2 id="rodape-aviso" className="text-base">
              Site não oficial
            </h2>
          </div>
          <p className="max-w-sm">
            O Doe + Vida é um projeto escolar e não tem vínculo com o HEMOSC nem com o Ministério da Saúde. A pré-triagem é
            só uma orientação e não substitui a triagem feita no hemocentro.
          </p>
        </section>

        <section aria-labelledby="rodape-fontes">
          <h2 id="rodape-fontes" className="mb-3 text-base">
            Fontes oficiais
          </h2>
          <ul className="space-y-2">
            {FONTES_RODAPE.map((link) => (
              <li key={link.url}>
                <LinkExterno href={link.url}>{link.rotulo}</LinkExterno>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rodape-creditos">
          <h2 id="rodape-creditos" className="mb-3 text-base">
            Créditos
          </h2>
          <p>
            Trabalho de Conclusão de Curso, {INSTITUICAO.curso}, {INSTITUICAO.escola}, {INSTITUICAO.cidade}, {INSTITUICAO.ano}.
          </p>
          <Link to={{ pathname: "/", hash: `#${SECOES.equipe.id}` }} className="mt-2 inline-block underline underline-offset-2 hover:text-vermelho">
            Conheça a equipe
          </Link>
        </section>
      </div>
      <div className="border-t border-preto/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-xs sm:flex-row sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} Doe + Vida. Todos os direitos reservados. É proibida a reprodução total ou parcial do
            conteúdo e do código sem autorização dos autores.
          </p>
          <p className="flex shrink-0 items-center gap-1.5">
            Feito com <Heart aria-hidden className="size-3.5 fill-vermelho text-vermelho" /> em {INSTITUICAO.cidade}
          </p>
        </div>
      </div>
    </footer>
  );
}
