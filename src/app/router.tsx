import { createBrowserRouter } from "react-router";
import { ROTAS } from "../config/rotas";
import { AgendamentoPage } from "../pages/AgendamentoPage";
import { EntrarPage } from "../pages/EntrarPage";
import { EquipePage } from "../pages/EquipePage";
import { InicioPage } from "../pages/InicioPage";
import { NaoEncontradaPage } from "../pages/NaoEncontradaPage";
import { PerfilPage } from "../pages/PerfilPage";
import { TriagemPage } from "../pages/TriagemPage";

// O layout global (navbar e rodapé) entra na próxima etapa como rota-pai.
export const router = createBrowserRouter([
  { path: ROTAS.inicio.caminho, element: <InicioPage /> },
  { path: ROTAS.triagem.caminho, element: <TriagemPage /> },
  { path: ROTAS.equipe.caminho, element: <EquipePage /> },
  { path: ROTAS.entrar.caminho, element: <EntrarPage /> },
  { path: ROTAS.perfil.caminho, element: <PerfilPage /> },
  { path: ROTAS.agendamento.caminho, element: <AgendamentoPage /> },
  { path: "*", element: <NaoEncontradaPage /> },
]);
