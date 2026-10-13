import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { MENU_PRINCIPAL, ROTAS } from "../../config/rotas";

const classeLink = ({ isActive }: { isActive: boolean }) =>
  `block border-b-2 py-2 text-sm transition-colors ${
    isActive ? "border-vermelho font-semibold text-vermelho" : "border-transparent hover:text-vermelho"
  }`;

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fechar = () => setMenuAberto(false);

  return (
    <header className="sticky top-0 z-10 border-b border-rosa bg-branco">
      <nav aria-label="Principal" className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2">
        <Link to={ROTAS.inicio.caminho} onClick={fechar} className="flex items-center gap-2">
          <img src={logo} alt="" width={64} height={54} className="h-12 w-auto" />
          <span className="text-lg font-semibold text-vermelho">Doe + Vida</span>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>

        <div
          id="menu-principal"
          className={`${menuAberto ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-rosa bg-branco px-4 pb-4 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:gap-8">
            {MENU_PRINCIPAL.map((chave) => (
              <li key={chave}>
                <NavLink to={ROTAS[chave].caminho} end onClick={fechar} className={classeLink}>
                  {ROTAS[chave].rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link
            to={ROTAS.entrar.caminho}
            onClick={fechar}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-vermelho px-4 py-2 text-sm font-semibold text-vermelho hover:bg-rosa-claro md:mt-0"
          >
            <CircleUser aria-hidden className="size-4" />
            {ROTAS.entrar.rotulo}
          </Link>
        </div>
      </nav>
    </header>
  );
}
