import { useState } from "react";
import { FormularioTriagemCampos } from "../components/triagem/FormularioTriagemCampos";
import { ResultadoTriagemCartao } from "../components/triagem/ResultadoTriagemCartao";
import { TituloPagina } from "../components/TituloPagina";
import { Aviso } from "../components/ui/Aviso";
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
  }

  function aoRefazer() {
    setValores(FORMULARIO_VAZIO);
    setResultado(null);
  }

  return (
    <>
      <TituloPagina subtitulo="Responda algumas perguntas para saber se você provavelmente pode doar sangue antes de ir ao hemocentro.">
        {ROTAS.triagem.titulo}
      </TituloPagina>

      <div className="mb-6 space-y-3">
        <Aviso>
          <strong>Esta pré-triagem não é oficial</strong> e não substitui a triagem feita por profissionais no hemocentro.
          Suas respostas ficam apenas no seu navegador e não são salvas.
        </Aviso>
        <p className="text-xs text-cinza">
          Critérios baseados em: <LinkExterno href={fonte.url}>{`${fonte.orgao}, ${fonte.titulo}`}</LinkExterno>{" "}
          (atualizada em {dataBr(fonte.atualizadaEm)}, consultada em {dataBr(fonte.acessoEm)}).
          {criteriosEmRevisao && " Critérios em revisão pela equipe."}
        </p>
      </div>

      {resultado ? (
        <ResultadoTriagemCartao resultado={resultado} aoRefazer={aoRefazer} />
      ) : (
        <FormularioTriagemCampos valores={valores} erros={erros} aoMudar={aoMudar} aoEnviar={aoEnviar} />
      )}
    </>
  );
}
