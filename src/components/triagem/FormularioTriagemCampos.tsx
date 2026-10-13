import { CalendarDays, Droplet, HeartPulse, Stethoscope, UserRound } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { formatarDataIso } from "../../features/triagem/datas";
import type { ErrosFormulario, FormularioTriagem } from "../../features/triagem/validarFormulario";
import { CampoOpcoes, type Opcao } from "../formulario/CampoOpcoes";
import { CampoTexto } from "../formulario/CampoTexto";
import { Botao } from "../ui/Botao";
import { Cartao } from "../ui/Cartao";

const SIM_NAO: readonly Opcao<"sim" | "nao">[] = [
  { valor: "sim", rotulo: "Sim" },
  { valor: "nao", rotulo: "Não" },
];

interface Props {
  valores: FormularioTriagem;
  erros: ErrosFormulario;
  aoMudar: <K extends keyof FormularioTriagem>(campo: K, valor: FormularioTriagem[K]) => void;
  aoEnviar: () => void;
}

function Secao({ titulo, icone, children }: { titulo: string; icone: ReactNode; children: ReactNode }) {
  return (
    <Cartao>
      <h2 className="mb-6 flex items-center gap-3 text-xl">
        <span className="grid size-10 place-items-center rounded-full bg-rosa-claro text-vermelho">{icone}</span>
        {titulo}
      </h2>
      <div className="space-y-6">{children}</div>
    </Cartao>
  );
}

/** Questionário de pré-triagem (classe QuestionarioTriagem). Só UI: validação e regras ficam em features/triagem. */
export function FormularioTriagemCampos({ valores: v, erros, aoMudar, aoEnviar }: Props) {
  const hoje = formatarDataIso(new Date());
  const iconeClasse = "size-5";

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    aoEnviar();
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-6">
      <Secao titulo="Sobre você" icone={<UserRound aria-hidden className={iconeClasse} />}>
        <CampoTexto
          rotulo="Data de nascimento"
          type="date"
          max={hoje}
          value={v.dataNascimento}
          aoMudar={(x) => aoMudar("dataNascimento", x)}
          erro={erros.dataNascimento}
        />
        <CampoOpcoes
          pergunta="Sexo"
          nome="sexo"
          dica="Os critérios oficiais de intervalo entre doações são diferentes para homens e mulheres."
          opcoes={[
            { valor: "feminino", rotulo: "Feminino" },
            { valor: "masculino", rotulo: "Masculino" },
          ]}
          valor={v.sexo}
          aoMudar={(x) => aoMudar("sexo", x)}
          erro={erros.sexo}
        />
        <CampoTexto
          rotulo="Peso (kg)"
          inputMode="decimal"
          autoComplete="off"
          placeholder="Ex.: 62,5"
          value={v.peso}
          aoMudar={(x) => aoMudar("peso", x)}
          erro={erros.peso}
        />
      </Secao>

      <Secao titulo="Doações anteriores" icone={<Droplet aria-hidden className={iconeClasse} />}>
        <CampoOpcoes pergunta="Você já doou sangue?" nome="jaDoou" opcoes={SIM_NAO} valor={v.jaDoou} aoMudar={(x) => aoMudar("jaDoou", x)} erro={erros.jaDoou} />
        {v.jaDoou === "sim" && (
          <>
            <CampoTexto
              rotulo="Data da última doação"
              dica="Se não lembrar o dia exato, use uma data aproximada."
              type="date"
              max={hoje}
              value={v.dataUltimaDoacao}
              aoMudar={(x) => aoMudar("dataUltimaDoacao", x)}
              erro={erros.dataUltimaDoacao}
            />
            <CampoTexto
              rotulo="Quantas vezes você doou nos últimos 12 meses?"
              type="number"
              inputMode="numeric"
              min={0}
              max={12}
              value={v.doacoesUltimos12Meses}
              aoMudar={(x) => aoMudar("doacoesUltimos12Meses", x)}
              erro={erros.doacoesUltimos12Meses}
            />
          </>
        )}
      </Secao>

      <Secao titulo="Como você está" icone={<HeartPulse aria-hidden className={iconeClasse} />}>
        <CampoOpcoes
          pergunta="Você dormiu pelo menos 6 horas nas últimas 24 horas?"
          nome="dormiu6Horas"
          opcoes={SIM_NAO}
          valor={v.dormiu6Horas}
          aoMudar={(x) => aoMudar("dormiu6Horas", x)}
          erro={erros.dormiu6Horas}
        />
        <CampoOpcoes
          pergunta="Você teve gripe ou resfriado recentemente?"
          nome="gripe"
          opcoes={[
            { valor: "nao", rotulo: "Não" },
            { valor: "com_sintomas", rotulo: "Estou com sintomas" },
            { valor: "sintomas_terminaram", rotulo: "Tive, mas os sintomas já passaram" },
          ]}
          valor={v.gripe}
          aoMudar={(x) => aoMudar("gripe", x)}
          erro={erros.gripe}
        />
        {v.gripe === "sintomas_terminaram" && (
          <CampoTexto
            rotulo="Em que dia os sintomas terminaram?"
            type="date"
            max={hoje}
            value={v.dataFimSintomas}
            aoMudar={(x) => aoMudar("dataFimSintomas", x)}
            erro={erros.dataFimSintomas}
          />
        )}
      </Secao>

      <Secao titulo="Últimos 12 meses" icone={<CalendarDays aria-hidden className={iconeClasse} />}>
        <CampoOpcoes
          pergunta="Você fez tatuagem nos últimos 12 meses?"
          nome="tatuagem12Meses"
          opcoes={SIM_NAO}
          valor={v.tatuagem12Meses}
          aoMudar={(x) => aoMudar("tatuagem12Meses", x)}
          erro={erros.tatuagem12Meses}
        />
        {v.tatuagem12Meses === "sim" && (
          <CampoTexto
            rotulo="Data da tatuagem mais recente"
            type="date"
            max={hoje}
            value={v.dataTatuagem}
            aoMudar={(x) => aoMudar("dataTatuagem", x)}
            erro={erros.dataTatuagem}
          />
        )}
        <CampoOpcoes
          pergunta="Você se curou de malária nos últimos 12 meses?"
          nome="malaria12Meses"
          opcoes={SIM_NAO}
          valor={v.malaria12Meses}
          aoMudar={(x) => aoMudar("malaria12Meses", x)}
          erro={erros.malaria12Meses}
        />
        {v.malaria12Meses === "sim" && (
          <CampoTexto
            rotulo="Data da cura"
            type="date"
            max={hoje}
            value={v.dataCuraMalaria}
            aoMudar={(x) => aoMudar("dataCuraMalaria", x)}
            erro={erros.dataCuraMalaria}
          />
        )}
        {v.sexo === "feminino" && (
          <>
            <CampoOpcoes pergunta="Você está grávida?" nome="gravida" opcoes={SIM_NAO} valor={v.gravida} aoMudar={(x) => aoMudar("gravida", x)} erro={erros.gravida} />
            <CampoOpcoes
              pergunta="Você está amamentando?"
              nome="amamentando"
              opcoes={SIM_NAO}
              valor={v.amamentando}
              aoMudar={(x) => aoMudar("amamentando", x)}
              erro={erros.amamentando}
            />
            {v.amamentando === "sim" && (
              <CampoTexto
                rotulo="Data de nascimento do bebê"
                type="date"
                max={hoje}
                value={v.dataNascimentoBebe}
                aoMudar={(x) => aoMudar("dataNascimentoBebe", x)}
                erro={erros.dataNascimentoBebe}
              />
            )}
          </>
        )}
      </Secao>

      <Secao titulo="Histórico de saúde" icone={<Stethoscope aria-hidden className={iconeClasse} />}>
        <CampoOpcoes
          pergunta="Você teve hepatite depois dos 11 anos de idade?"
          nome="hepatiteApos11Anos"
          opcoes={SIM_NAO}
          valor={v.hepatiteApos11Anos}
          aoMudar={(x) => aoMudar("hepatiteApos11Anos", x)}
          erro={erros.hepatiteApos11Anos}
        />
      </Secao>

      {Object.keys(erros).length > 0 && (
        <p role="alert" className="font-semibold text-vermelho">
          Algumas respostas estão faltando ou precisam de correção. Confira os campos marcados.
        </p>
      )}

      <Botao type="submit" className="w-full sm:w-auto">
        Ver resultado
      </Botao>
    </form>
  );
}
