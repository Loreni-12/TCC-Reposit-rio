# Progresso do projeto

> Atualize ao fim de cada tarefa/etapa (ver CLAUDE.md §8). Entradas mais recentes no topo.

## Pendências abertas

- [x] Decisões C1–C5 tomadas (ver `docs/monografia/rastreabilidade.md` §4).
- [ ] Salvar o PDF da monografia em `docs/monografia/` (recebido só pelo chat).
- [ ] Equipe ajustar o texto da monografia (`rastreabilidade.md` §5).
- [ ] Definir identidade visual (CLAUDE.md §12). O protótipo da Figura 3 serve de referência.
- [ ] Criar remoto no GitHub e fazer o primeiro push (somente com confirmação).
- [ ] Projeto antigo `doemaisvidadb` não é mais usado — decidir se mantém ou exclui (pelo console; nada foi alterado nele).

## 2026-10-12 — Etapa 1: monografia recebida (em andamento)

**Feito**
- Firestore criado pela equipe em `southamerica-east1`, em modo de produção. Auth com e-mail/senha e Google ativos.
- Autor do Git corrigido para Eduardo Loreni Kfassniak (config global).
- Monografia transcrita em `docs/monografia/modelo-monografia.md` (diagramas em Mermaid, dicionário de dados, quadros de código).
- Rastreabilidade em `docs/monografia/rastreabilidade.md`: casos de uso e classes ligados a arquivos, 5 conflitos (C1–C5) e lista de afirmações do texto que não batem com o sistema.

**Decisões:** C1 planejar + link oficial · C2 só resultado · C3 critérios em arquivo · C4 comprovante + lembrete .ics · C5 manter telefone (opcional) e dataNascimento.

**Próximo passo:** implementar o layout global e as features na ordem do roteiro.

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
