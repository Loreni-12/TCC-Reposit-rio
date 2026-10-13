import { HeartHandshake, LoaderCircle } from "lucide-react";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { useConta, type ModoModalConta } from "../../features/auth/contexto";
import { mensagemDeErro } from "../../features/auth/erros";
import {
  paraDadosCadastro,
  validarCadastro,
  validarEntrar,
  validarPerfil,
  type Erros,
  type FormularioCadastro,
  type FormularioPerfil,
} from "../../features/auth/validarConta";
import { formatarDataIso } from "../../features/triagem/datas";
import { CampoTexto } from "../formulario/CampoTexto";
import { Botao } from "../ui/Botao";
import { Dialogo } from "../ui/Dialogo";

const PERFIL_VAZIO: FormularioPerfil = { nome: "", dataNascimento: "", telefone: "", consentimento: false };

/** Pop-up de conta (entrar, criar conta, completar cadastro após o Google). */
export function ModalConta() {
  const conta = useConta();
  const precisaCompletar = conta.usuario !== null && conta.perfil === null && !conta.carregando;

  // Fecha sozinho quando a pessoa termina de entrar (logada e com perfil).
  useEffect(() => {
    if (conta.modalAberto && conta.usuario && conta.perfil) conta.fecharModal();
  }, [conta]);

  let conteudo: ReactNode;
  if (conta.usuario && conta.carregando) conteudo = <Carregando />;
  else if (precisaCompletar) conteudo = <FormCompletar />;
  else if (conta.modoModal === "entrar") conteudo = <FormEntrar />;
  else conteudo = <FormCadastrar />;

  return (
    <Dialogo aberto={conta.modalAberto} aoFechar={conta.fecharModal} titulo="Sua conta no Doe + Vida">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-rosa-claro text-vermelho">
          <HeartHandshake aria-hidden className="size-6" />
        </span>
        <div>
          <p className="text-lg font-semibold">{precisaCompletar ? "Falta pouco" : "Sua conta"}</p>
          <p className="text-sm text-cinza">Acompanhe suas pré-triagens e planeje suas doações.</p>
        </div>
      </div>
      {!precisaCompletar && !conta.carregando && <Abas />}
      {conteudo}
    </Dialogo>
  );
}

function Abas() {
  const { modoModal, abrirModal } = useConta();
  const abas: { modo: ModoModalConta; rotulo: string }[] = [
    { modo: "entrar", rotulo: "Entrar" },
    { modo: "cadastrar", rotulo: "Criar conta" },
  ];
  return (
    <div role="tablist" className="mb-6 grid grid-cols-2 rounded-full bg-rosa-claro p-1">
      {abas.map(({ modo, rotulo }) => (
        <button
          key={modo}
          type="button"
          role="tab"
          aria-selected={modoModal === modo}
          onClick={() => abrirModal(modo)}
          className={`rounded-full py-2 text-sm font-semibold transition-colors ${
            modoModal === modo ? "bg-branco text-vermelho" : "text-cinza hover:text-vermelho"
          }`}
        >
          {rotulo}
        </button>
      ))}
    </div>
  );
}

function Carregando() {
  return (
    <p className="flex items-center gap-2 py-8 text-cinza" role="status">
      <LoaderCircle aria-hidden className="size-5 animate-spin text-vermelho" /> Carregando sua conta...
    </p>
  );
}

function ErroGeral({ mensagem }: { mensagem: string | null }) {
  if (!mensagem) return null;
  return (
    <p role="alert" className="rounded-2xl bg-rosa-claro px-4 py-3 text-sm font-semibold text-vermelho">
      {mensagem}
    </p>
  );
}

function BotaoGoogle({ aoErro }: { aoErro: (mensagem: string) => void }) {
  const { entrarComGoogle } = useConta();
  const [ocupado, setOcupado] = useState(false);
  async function clicar() {
    setOcupado(true);
    try {
      await entrarComGoogle();
    } catch (erro) {
      aoErro(mensagemDeErro(erro));
    } finally {
      setOcupado(false);
    }
  }
  return (
    <>
      <Botao variante="secundario" className="w-full" onClick={clicar} disabled={ocupado}>
        Continuar com Google
      </Botao>
      <p className="my-5 flex items-center gap-3 text-xs text-cinza before:h-px before:flex-1 before:bg-rosa after:h-px after:flex-1 after:bg-rosa">
        ou com e-mail
      </p>
    </>
  );
}

function FormEntrar() {
  const { entrar, redefinirSenha } = useConta();
  const [valores, setValores] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState<Erros<typeof valores>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const novos = validarEntrar(valores);
    setErros(novos);
    setErroGeral(null);
    if (Object.keys(novos).length > 0) return;
    setOcupado(true);
    try {
      await entrar(valores.email.trim(), valores.senha);
    } catch (erro) {
      setErroGeral(mensagemDeErro(erro));
    } finally {
      setOcupado(false);
    }
  }

  async function esqueciSenha() {
    setErroGeral(null);
    setAviso(null);
    if (!valores.email.trim()) {
      setErros({ email: "Digite seu e-mail para receber o link de redefinição." });
      return;
    }
    try {
      await redefinirSenha(valores.email.trim());
      setAviso("Se houver uma conta com este e-mail, você receberá um link para criar uma nova senha.");
    } catch (erro) {
      setErroGeral(mensagemDeErro(erro));
    }
  }

  return (
    <>
      <BotaoGoogle aoErro={setErroGeral} />
      <form onSubmit={enviar} noValidate className="space-y-4">
        <CampoTexto larguraTotal rotulo="E-mail" type="email" autoComplete="email" value={valores.email} aoMudar={(email) => setValores((v) => ({ ...v, email }))} erro={erros.email} />
        <CampoTexto larguraTotal rotulo="Senha" type="password" autoComplete="current-password" value={valores.senha} aoMudar={(senha) => setValores((v) => ({ ...v, senha }))} erro={erros.senha} />
        <button type="button" onClick={esqueciSenha} className="text-sm text-vermelho underline underline-offset-2">
          Esqueci minha senha
        </button>
        {aviso && (
          <p role="status" className="text-sm text-cinza">
            {aviso}
          </p>
        )}
        <ErroGeral mensagem={erroGeral} />
        <Botao type="submit" className="w-full" disabled={ocupado}>
          {ocupado ? "Entrando..." : "Entrar"}
        </Botao>
      </form>
    </>
  );
}

function CamposPerfil({
  valores,
  erros,
  aoMudar,
}: {
  valores: FormularioPerfil;
  erros: Erros<FormularioPerfil>;
  aoMudar: (parcial: Partial<FormularioPerfil>) => void;
}) {
  const idConsentimento = useId();
  return (
    <>
      <CampoTexto larguraTotal rotulo="Nome completo" autoComplete="name" value={valores.nome} aoMudar={(nome) => aoMudar({ nome })} erro={erros.nome} />
      <div className="grid gap-4 sm:grid-cols-2">
        <CampoTexto
          larguraTotal
          rotulo="Data de nascimento"
          type="date"
          max={formatarDataIso(new Date())}
          value={valores.dataNascimento}
          aoMudar={(dataNascimento) => aoMudar({ dataNascimento })}
          erro={erros.dataNascimento}
        />
        <CampoTexto
          larguraTotal
          rotulo="Telefone (opcional)"
          type="tel"
          autoComplete="tel"
          placeholder="(47) 99999-9999"
          value={valores.telefone}
          aoMudar={(telefone) => aoMudar({ telefone })}
          erro={erros.telefone}
        />
      </div>
      <details className="rounded-2xl bg-rosa-claro/60 px-4 py-3 text-sm">
        <summary className="cursor-pointer font-semibold">Como usamos seus dados</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-cinza">
          <li>Guardamos nome, e-mail, data de nascimento, telefone (se informado) e as datas do cadastro e do consentimento.</li>
          <li>Esses dados servem apenas para identificar sua conta no Doe + Vida.</li>
          <li>As respostas da pré-triagem nunca são salvas.</li>
          <li>Somente você acessa seus dados. Eles ficam armazenados no Firebase (Google) e não são compartilhados com o HEMOSC nem com terceiros.</li>
        </ul>
      </details>
      <div>
        <label htmlFor={idConsentimento} className="flex items-start gap-3 text-sm">
          <input
            id={idConsentimento}
            type="checkbox"
            checked={valores.consentimento}
            onChange={(e) => aoMudar({ consentimento: e.target.checked })}
            aria-invalid={erros.consentimento ? true : undefined}
            className="mt-0.5 size-4 accent-vermelho"
          />
          Li e concordo com o uso dos meus dados descrito acima (LGPD).
        </label>
        {erros.consentimento && <p className="mt-1 text-sm font-semibold text-vermelho">{erros.consentimento}</p>}
      </div>
    </>
  );
}

function FormCadastrar() {
  const { cadastrar } = useConta();
  const [valores, setValores] = useState<FormularioCadastro>({ ...PERFIL_VAZIO, email: "", senha: "" });
  const [erros, setErros] = useState<Erros<FormularioCadastro>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const mudar = (parcial: Partial<FormularioCadastro>) => setValores((v) => ({ ...v, ...parcial }));

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const novos = validarCadastro(valores);
    setErros(novos);
    setErroGeral(null);
    if (Object.keys(novos).length > 0) return;
    setOcupado(true);
    try {
      await cadastrar(valores.email.trim(), valores.senha, paraDadosCadastro(valores));
    } catch (erro) {
      setErroGeral(mensagemDeErro(erro));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <>
      <BotaoGoogle aoErro={setErroGeral} />
      <form onSubmit={enviar} noValidate className="space-y-4">
        <CampoTexto larguraTotal rotulo="E-mail" type="email" autoComplete="email" value={valores.email} aoMudar={(email) => mudar({ email })} erro={erros.email} />
        <CampoTexto
          larguraTotal
          rotulo="Senha"
          dica="Pelo menos 6 caracteres."
          type="password"
          autoComplete="new-password"
          value={valores.senha}
          aoMudar={(senha) => mudar({ senha })}
          erro={erros.senha}
        />
        <CamposPerfil valores={valores} erros={erros} aoMudar={mudar} />
        <ErroGeral mensagem={erroGeral} />
        <Botao type="submit" className="w-full" disabled={ocupado}>
          {ocupado ? "Criando conta..." : "Criar conta"}
        </Botao>
      </form>
    </>
  );
}

function FormCompletar() {
  const { usuario, completarCadastro, sair } = useConta();
  const [valores, setValores] = useState<FormularioPerfil>({ ...PERFIL_VAZIO, nome: usuario?.nome ?? "" });
  const [erros, setErros] = useState<Erros<FormularioPerfil>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    const novos = validarPerfil(valores);
    setErros(novos);
    setErroGeral(null);
    if (Object.keys(novos).length > 0) return;
    setOcupado(true);
    try {
      await completarCadastro(paraDadosCadastro(valores));
    } catch (erro) {
      setErroGeral(mensagemDeErro(erro));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <p className="text-sm text-cinza">
        Você entrou como <strong className="text-preto">{usuario?.email}</strong>. Complete seu cadastro para continuar.
      </p>
      <CamposPerfil valores={valores} erros={erros} aoMudar={(parcial) => setValores((v) => ({ ...v, ...parcial }))} />
      <ErroGeral mensagem={erroGeral} />
      <Botao type="submit" className="w-full" disabled={ocupado}>
        {ocupado ? "Salvando..." : "Concluir cadastro"}
      </Botao>
      <button type="button" onClick={() => void sair()} className="w-full text-sm text-cinza underline underline-offset-2">
        Não sou eu / sair
      </button>
    </form>
  );
}
