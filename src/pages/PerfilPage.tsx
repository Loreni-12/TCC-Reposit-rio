import { TituloPagina } from "../components/TituloPagina";
import { Botao } from "../components/ui/Botao";
import { Cartao } from "../components/ui/Cartao";
import { Conteiner } from "../components/ui/Conteiner";
import { ROTAS } from "../config/rotas";
import { useConta } from "../features/auth/contexto";
import { formatarDataBr, lerDataIso } from "../features/triagem/datas";

// Área logada. Histórico de pré-triagens e planejamento de doações entram nas próximas etapas.
export function PerfilPage() {
  const { usuario, perfil, carregando, abrirModal } = useConta();
  const nascimento = perfil ? lerDataIso(perfil.dataNascimento) : null;

  return (
    <div className="bg-rosa-claro">
      <Conteiner className="max-w-3xl py-12">
        <TituloPagina>{ROTAS.perfil.titulo}</TituloPagina>
        {carregando ? (
          <p role="status">Carregando...</p>
        ) : usuario && perfil ? (
          <Cartao>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-cinza">Nome</dt>
                <dd className="font-semibold">{perfil.nome}</dd>
              </div>
              <div>
                <dt className="text-sm text-cinza">E-mail</dt>
                <dd className="font-semibold">{perfil.email}</dd>
              </div>
              <div>
                <dt className="text-sm text-cinza">Data de nascimento</dt>
                <dd className="font-semibold">{nascimento ? formatarDataBr(nascimento) : "-"}</dd>
              </div>
              <div>
                <dt className="text-sm text-cinza">Telefone</dt>
                <dd className="font-semibold">{perfil.telefone ?? "Não informado"}</dd>
              </div>
            </dl>
          </Cartao>
        ) : (
          <Cartao className="text-center">
            <p className="mb-4">Entre na sua conta para ver seu perfil.</p>
            <Botao onClick={() => abrirModal("entrar")}>Entrar</Botao>
          </Cartao>
        )}
      </Conteiner>
    </div>
  );
}
