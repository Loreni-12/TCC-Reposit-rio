import { createBrowserRouter } from "react-router";
import { ROTAS } from "../config/rotas";
import { AgendamentoPage } from "../pages/AgendamentoPage";
import { EntrarPage } from "../pages/EntrarPage";
import { EquipePage } from "../pages/EquipePage";
import { InicioPage } from "../pages/InicioPage";
import { NaoEncontradaPage } from "../pages/NaoEncontradaPage";
import { PerfilPage } from "../pages/PerfilPage";
import { TriagemPage } from "../pages/TriagemPage";
import { LayoutPrincipal } from "./LayoutPrincipal";

export const router = createBrowserRouter([
  {
    element: <LayoutPrincipal />,
    children: [
      { path: ROTAS.inicio.caminho, element: <InicioPage /> },
      { path: ROTAS.triagem.caminho, element: <TriagemPage /> },
      { path: ROTAS.equipe.caminho, element: <EquipePage /> },
      { path: ROTAS.entrar.caminho, element: <EntrarPage /> },
      { path: ROTAS.perfil.caminho, element: <PerfilPage /> },
      { path: ROTAS.agendamento.caminho, element: <AgendamentoPage /> },
      { path: "*", element: <NaoEncontradaPage /> },
    ],
  },
]);
