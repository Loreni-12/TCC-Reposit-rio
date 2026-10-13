# Progresso do projeto

> Atualize ao fim de cada tarefa/etapa (ver CLAUDE.md §8). Entradas mais recentes no topo.

## Pendências abertas

- [ ] **Console Firebase — Firestore:** criar o banco (Firestore Database → Criar banco → edição Standard, modo de produção, local `nam5`). A API não estava ativa no projeto novo, por isso não foi criado pelo CLI.
- [ ] **Console Firebase — Authentication:** Começar → ativar provedores **E-mail/senha** e **Google**.
- [ ] Receber a monografia em `docs/monografia/` e montar a rastreabilidade.
- [ ] Definir identidade visual (CLAUDE.md §12).
- [ ] Criar remoto no GitHub e fazer o primeiro push (somente com confirmação).
- [ ] Projeto antigo `doemaisvidadb` não é mais usado — decidir se mantém ou exclui (pelo console; nada foi alterado nele).

## 2026-10-12 — Etapa 0: preparação do ambiente (concluída)

**Feito**
- Instalados: JDK Temurin 21, Claude Code CLI, Firebase CLI, plugin `firebase@firebase` (marketplace `firebase/agent-skills`: MCP + Agent Skills).
- Criado projeto Firebase `doe-mais-vida` (Spark) e app web "Doe Mais Vida Web"; vinculado em `.firebaserc`; config web em `.env.local` (não versionado).
- Git iniciado (`main`). Estrutura Vite + React + TS + Tailwind v4 + React Router; rotas com título apenas.
- `firebase.json` (Hosting SPA, Firestore, emuladores Auth/Firestore/Hosting/UI), `firestore.rules` negando tudo, índices vazios.
- Testes: 2 de lógica (rotas) + 3 de regras (negação sem login e com login).
- ESLint bloqueia import de Firebase fora de `services/` e `lib/`.
- CLAUDE.md, README.md e este arquivo.

**Verificação:** lint ✔ · typecheck ✔ · build ✔ · test 2/2 ✔ · test:rules 3/3 ✔ · emuladores sobem ✔

**Próximo passo:** receber a monografia (Etapa 1).
