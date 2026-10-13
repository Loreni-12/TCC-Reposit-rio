import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { DadosCadastro, PerfilUsuario, UsuarioAuth } from "../../types/usuario";
import { ContextoConta, type EstadoConta, type ModoModalConta } from "./contexto";

// O SDK do Firebase é pesado: carregado sob demanda, depois da primeira pintura da página.
const carregarServicos = () => Promise.all([import("../../services/auth"), import("../../services/usuarios")]);

/** Mantém o usuário logado, o perfil (users/{uid}) e o estado do pop-up de conta. */
export function ProvedorConta({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioAuth | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState<ModoModalConta>("entrar");
  // Evita que uma busca antiga do perfil sobrescreva uma mais nova (ex.: logo após o cadastro).
  const ultimaBusca = useRef(0);

  useEffect(() => {
    let cancelar: (() => void) | undefined;
    let desmontado = false;
    void carregarServicos().then(([authService, { buscarPerfil }]) => {
      if (desmontado) return;
      cancelar = authService.observarUsuario(async (novo) => {
        const busca = ++ultimaBusca.current;
        setCarregando(true);
        setUsuario(novo);
        try {
          const encontrado = novo ? await buscarPerfil(novo.uid) : null;
          if (busca === ultimaBusca.current) setPerfil(encontrado);
        } catch (erro) {
          // Sem permissão/conexão: segue sem perfil; o pop-up pede para completar o cadastro.
          console.error("Não foi possível carregar o perfil:", erro);
          if (busca === ultimaBusca.current) setPerfil(null);
        } finally {
          if (busca === ultimaBusca.current) setCarregando(false);
        }
      });
    }).catch((erro: unknown) => {
      // Sem conexão ou configuração ausente: o site continua funcionando, só sem conta.
      console.error("Não foi possível carregar o Firebase:", erro);
      if (!desmontado) setCarregando(false);
    });
    return () => {
      desmontado = true;
      cancelar?.();
    };
  }, []);

  const salvarPerfil = useCallback(async (uid: string, email: string, dados: DadosCadastro) => {
    const busca = ++ultimaBusca.current;
    const [, { buscarPerfil, criarPerfil }] = await carregarServicos();
    await criarPerfil(uid, email, dados);
    const salvo = await buscarPerfil(uid);
    if (busca === ultimaBusca.current) {
      setPerfil(salvo);
      setCarregando(false);
    }
  }, []);

  const valor = useMemo<EstadoConta>(
    () => ({
      usuario,
      perfil,
      carregando,
      modalAberto,
      modoModal,
      abrirModal: (modo = "entrar") => {
        setModoModal(modo);
        setModalAberto(true);
      },
      fecharModal: () => setModalAberto(false),
      entrar: async (email, senha) => {
        const [authService] = await carregarServicos();
        await authService.entrar(email, senha);
      },
      entrarComGoogle: async () => {
        const [authService] = await carregarServicos();
        await authService.entrarComGoogle();
      },
      cadastrar: async (email, senha, dados) => {
        const [authService] = await carregarServicos();
        const novo = await authService.cadastrar(email, senha, dados.nome);
        await salvarPerfil(novo.uid, email, dados);
      },
      completarCadastro: async (dados) => {
        if (!usuario?.email) throw new Error("Usuário sem e-mail.");
        await salvarPerfil(usuario.uid, usuario.email, dados);
      },
      redefinirSenha: async (email) => {
        const [authService] = await carregarServicos();
        await authService.redefinirSenha(email);
      },
      sair: async () => {
        const [authService] = await carregarServicos();
        await authService.sair();
      },
    }),
    [usuario, perfil, carregando, modalAberto, modoModal, salvarPerfil],
  );

  return <ContextoConta.Provider value={valor}>{children}</ContextoConta.Provider>;
}
