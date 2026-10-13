import { Link } from "react-router";
import { LINKS_OFICIAIS } from "../../config/links";
import { ROTAS } from "../../config/rotas";
import { LinkExterno } from "../ui/LinkExterno";

const FONTES_RODAPE = [LINKS_OFICIAIS.faqMinisterioSaude, LINKS_OFICIAIS.hemoscRequisitos, LINKS_OFICIAIS.hemoscOndeDoar];

export function Rodape() {
  return (
    <footer className="border-t border-rosa bg-branco text-sm">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-3">
        <section aria-labelledby="rodape-aviso">
          <h2 id="rodape-aviso" className="mb-2 text-base text-vermelho">
            Site não oficial
          </h2>
          <p className="text-cinza">
            O Doe + Vida é um projeto escolar e não tem vínculo com o HEMOSC nem com o Ministério da Saúde. A
            pré-triagem é só uma orientação e não substitui a triagem feita no hemocentro.
          </p>
        </section>

        <section aria-labelledby="rodape-fontes">
          <h2 id="rodape-fontes" className="mb-2 text-base text-vermelho">
            Fontes oficiais
          </h2>
          <ul className="space-y-1">
            {FONTES_RODAPE.map((link) => (
              <li key={link.url}>
                <LinkExterno href={link.url}>{link.rotulo}</LinkExterno>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="rodape-creditos">
          <h2 id="rodape-creditos" className="mb-2 text-base text-vermelho">
            Créditos
          </h2>
          <p className="text-cinza">
            Trabalho de Conclusão de Curso, Desenvolvimento de Sistemas, CEDUP Hermann Hering, Blumenau/SC, 2026.
          </p>
          <Link to={ROTAS.equipe.caminho} className="mt-1 inline-block underline underline-offset-2 hover:text-vermelho">
            Conheça a equipe
          </Link>
        </section>
      </div>
    </footer>
  );
}
