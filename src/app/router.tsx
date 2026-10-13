import { createBrowserRouter } from "react-router";
import { ROTAS } from "../config/rotas";
import { InicioPage } from "../pages/InicioPage";
import { NaoEncontradaPage } from "../pages/NaoEncontradaPage";
import { PerfilPage } from "../pages/PerfilPage";
import { TriagemPage } from "../pages/TriagemPage";
import { LayoutPrincipal } from "./LayoutPrincipal";

// Site em página única (seções em InicioPage); só a pré-triagem e o perfil são páginas separadas.
// Entrar/cadastrar é um pop-up (components/conta/ModalConta).
export const router = createBrowserRouter([
  {
    element: <LayoutPrincipal />,
    children: [
      { path: ROTAS.inicio.caminho, element: <InicioPage /> },
      { path: ROTAS.triagem.caminho, element: <TriagemPage /> },
      { path: ROTAS.perfil.caminho, element: <PerfilPage /> },
      { path: "*", element: <NaoEncontradaPage /> },
    ],
  },
]);
