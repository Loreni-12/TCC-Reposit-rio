import { TituloPagina } from "../components/TituloPagina";
import { LinkBotao } from "../components/ui/Botao";
import { Conteiner } from "../components/ui/Conteiner";

export function NaoEncontradaPage() {
  return (
    <div className="bg-rosa-claro">
      <Conteiner className="py-20 text-center">
        <TituloPagina subtitulo="O endereço pode ter mudado ou não existir.">Página não encontrada</TituloPagina>
        <LinkBotao para="/">Voltar para o início</LinkBotao>
      </Conteiner>
    </div>
  );
}
