import { CircleUser, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { MENU_PRINCIPAL } from "../../config/rotas";
import { useConta } from "../../features/auth/contexto";

function primeiroNome(nome: string | null | undefined): string {
  return nome?.trim().split(/\s+/)[0] ?? "";
}

function AreaConta({ aoAgir }: { aoAgir: () => void }) {
  const { usuario, perfil, carregando, abrirModal, sair } = useConta();
  const botao =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors";

  if (usuario && perfil) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">
          Olá, <strong>{primeiroNome(perfil.nome)}</strong>
        </span>
        <button
          type="button"
          onClick={() => {
            aoAgir();
            void sair();
          }}
          className={`${botao} border border-vermelho/40 text-vermelho hover:bg-rosa-claro`}
        >
          <LogOut aria-hidden className="size-4" /> Sair
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={carregando && usuario !== null}
      onClick={() => {
        aoAgir();
        abrirModal("entrar");
      }}
      className={`${botao} bg-vermelho text-branco hover:bg-vermelho-escuro`}
    >
      <CircleUser aria-hidden className="size-4" />
      {usuario ? "Completar cadastro" : "Entrar"}
    </button>
  );
}

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fechar = () => setMenuAberto(false);

  return (
    <header className="sticky top-0 z-20 border-b border-rosa/70 bg-branco">
      <nav aria-label="Principal" className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:px-12">
        <Link to="/" onClick={fechar} className="flex items-center gap-2">
          <img src={logo} alt="" width={64} height={54} className="h-12 w-auto" />
          <span className="text-lg font-semibold text-vermelho">Doe + Vida</span>
        </Link>

        <button
          type="button"
          className="rounded-full p-2 hover:bg-rosa-claro lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>

        <div
          id="menu-principal"
          className={`${menuAberto ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 rounded-b-3xl border-b border-rosa bg-branco px-5 pb-6 pt-2 lg:static lg:flex lg:flex-row lg:items-center lg:gap-8 lg:rounded-none lg:border-0 lg:p-0`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:gap-1">
            {MENU_PRINCIPAL.map((item) => (
              <li key={item.rotulo}>
                <NavLink
                  to={item.destino}
                  onClick={fechar}
                  className={({ isActive }) =>
                    `block rounded-full px-4 py-2 text-sm transition-colors hover:bg-rosa-claro hover:text-vermelho ${
                      isActive && !item.destino.hash ? "bg-rosa-claro font-semibold text-vermelho" : ""
                    }`
                  }
                >
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
          <AreaConta aoAgir={fechar} />
        </div>
      </nav>
    </header>
  );
}
