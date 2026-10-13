// Traduz erros do Firebase para português. Não importa o SDK (para não pesar o carregamento inicial):
// basta ler o `code` que todo FirebaseError carrega.
const MENSAGENS: Record<string, string> = {
  "auth/email-already-in-use": "Já existe uma conta com este e-mail. Tente entrar.",
  "auth/invalid-email": "E-mail inválido.",
  "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
  "auth/invalid-credential": "E-mail ou senha incorretos.",
  "auth/user-not-found": "E-mail ou senha incorretos.",
  "auth/wrong-password": "E-mail ou senha incorretos.",
  "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
  "auth/popup-closed-by-user": "A janela do Google foi fechada antes de concluir.",
  "auth/popup-blocked": "O navegador bloqueou a janela do Google. Permita pop-ups e tente de novo.",
  "auth/network-request-failed": "Sem conexão. Verifique sua internet.",
  "permission-denied": "Não foi possível salvar seus dados (permissão negada).",
  unavailable: "Serviço indisponível no momento. Tente de novo.",
};

export function mensagemDeErro(erro: unknown): string {
  if (typeof erro === "object" && erro !== null && "code" in erro && typeof erro.code === "string") {
    // Em desenvolvimento com VITE_USE_EMULATORS=true, "sem conexão" quase sempre é emulador desligado.
    if (erro.code === "auth/network-request-failed" && import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === "true") {
      return "Não foi possível falar com os emuladores. Rode `npm run emulators` ou use VITE_USE_EMULATORS=false.";
    }
    return MENSAGENS[erro.code] ?? `Algo deu errado (${erro.code}).`;
  }
  return "Algo deu errado. Tente de novo.";
}
