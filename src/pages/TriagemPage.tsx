import { ClipboardList, Lock, MessageCircleHeart } from "lucide-react";
import { useState } from "react";
import { FormularioTriagemCampos } from "../components/triagem/FormularioTriagemCampos";
import { ResultadoTriagemCartao } from "../components/triagem/ResultadoTriagemCartao";
import { TituloPagina } from "../components/TituloPagina";
import { Aviso } from "../components/ui/Aviso";
import { Conteiner } from "../components/ui/Conteiner";
import { LinkExterno } from "../components/ui/LinkExterno";
import { CRITERIOS } from "../config/criterios";
import { FONTES } from "../config/fontes";
import { ROTAS } from "../config/rotas";
import { formatarDataBr, lerDataIso } from "../features/triagem/datas";
import {
  FORMULARIO_VAZIO,
  validarFormulario,
  type ErrosFormulario,
  type FormularioTriagem,
} from "../features/triagem/validarFormulario";
import { verificarAptidao } from "../features/triagem/verificarAptidao";
import type { ResultadoTriagem } from "../types/triagem";

const fonte = FONTES.faqMinisterioSaude;
const criteriosEmRevisao = Object.values(CRITERIOS).some((c) => !c.revisadoPelaEquipe);

const COMO_FUNCIONA = [
  { icone: ClipboardList, texto: "Responda às perguntas. Algumas só aparecem quando fazem sentido para você." },
  { icone: MessageCircleHeart, texto: "Veja o resultado, o motivo de cada impedimento e quando pode tentar de novo." },
  { icone: Lock, texto: "Suas respostas ficam só no seu navegador e não são salvas." },
];

function dataBr(iso: string): string {
  const data = lerDataIso(iso);
  return data ? formatarDataBr(data) : iso;
}

export function TriagemPage() {
  const [valores, setValores] = useState<FormularioTriagem>(FORMULARIO_VAZIO);
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [resultado, setResultado] = useState<ResultadoTriagem | null>(null);

  function aoMudar<K extends keyof FormularioTriagem>(campo: K, valor: FormularioTriagem[K]) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErros((atuais) => {
      const restantes = { ...atuais };
      delete restantes[campo];
      return restantes;
    });
  }

  function aoEnviar() {
    const validacao = validarFormulario(valores);
    if (!validacao.valido) {
      setErros(validacao.erros);
      return;
    }
    setErros({});
    setResultado(verificarAptidao(validacao.respostas));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function aoRefazer() {
    setValores(FORMULARIO_VAZIO);
    setResultado(null);
  }

  return (
    <div className="bg-rosa-claro">
      <Conteiner className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:py-14">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TituloPagina subtitulo="Responda algumas perguntas e descubra se você provavelmente pode doar sangue antes de ir ao hemocentro.">
            {ROTAS.triagem.titulo}
          </TituloPagina>

          <Aviso>
            <strong>Esta pré-triagem não é oficial</strong> e não substitui a triagem feita por profissionais no hemocentro.
          </Aviso>

          <ol className="space-y-4">
            {COMO_FUNCIONA.map(({ icone: Icone, texto }) => (
              <li key={texto} className="flex gap-3 text-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-branco text-vermelho">
                  <Icone aria-hidden className="size-4" />
                </span>
                <span className="pt-2">{texto}</span>
              </li>
            ))}
          </ol>

          <p className="text-xs text-cinza">
            Critérios baseados em: <LinkExterno href={fonte.url}>{`${fonte.orgao}, ${fonte.titulo}`}</LinkExterno>{" "}
            (atualizada em {dataBr(fonte.atualizadaEm)}, consultada em {dataBr(fonte.acessoEm)}).
            {criteriosEmRevisao && " Critérios em revisão pela equipe."}
          </p>
        </aside>

        <div>
          {resultado ? (
            <ResultadoTriagemCartao resultado={resultado} aoRefazer={aoRefazer} />
          ) : (
            <FormularioTriagemCampos valores={valores} erros={erros} aoMudar={aoMudar} aoEnviar={aoEnviar} />
          )}
        </div>
      </Conteiner>
    </div>
  );
}
