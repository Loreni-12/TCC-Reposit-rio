# Progresso do projeto

> Atualize ao fim de cada tarefa/etapa (ver CLAUDE.md §8). Entradas mais recentes no topo.

## Pendências abertas

- [x] Decisões C1–C5 tomadas (ver `docs/monografia/rastreabilidade.md` §4).
- [ ] Salvar o PDF da monografia em `docs/monografia/` (recebido só pelo chat).
- [ ] Equipe ajustar o texto da monografia (`rastreabilidade.md` §5).
- [x] Identidade visual definida (CLAUDE.md §12).
- [ ] **Equipe revisar os critérios** em `src/config/criterios.ts` (comparar `trechoFonte` com a fonte; marcar `revisadoPelaEquipe: true`). Ponto de dúvida: primeira doação "até 60 anos" ou "antes dos 60".
- [ ] Equipe conferir manualmente a página de requisitos do HEMOSC e dizer se algum critério deve entrar.
- [ ] Testar a pré-triagem num celular de verdade (as capturas automáticas não chegam a 390 px).
- [ ] Criar remoto no GitHub e fazer o primeiro push (somente com confirmação).
- [ ] Projeto antigo `doemaisvidadb` não é mais usado — decidir se mantém ou exclui (pelo console; nada foi alterado nele).

## 2026-10-12 — Identidade visual, layout global e pré-triagem

**Feito**
- Paleta (rosa pastel ~70%, branco ~30%, vermelho para destaque), Poppins auto-hospedada, ícones lucide, logo recortado + favicon. Referências em `docs/design/`.
- Navbar branca e sólida, com menu hambúrguer no celular. Rodapé com aviso de site não oficial, fontes e créditos. Link "pular para o conteúdo".
- Início com apresentação e atalhos para o HEMOSC (links conferidos).
- Pré-triagem completa: 15 critérios (13 impedimentos + 2 orientações) com trecho literal da FAQ do MS, validação, resultado em 3 níveis, orientações e data para refazer. Nada é salvo.
- Dependências novas: `@fontsource/poppins` (fonte sem requisição ao Google) e `lucide-react` (ícones).

**Verificação:** lint ✔ · typecheck ✔ · build ✔ · test 37/37 ✔ · capturas em 1280px e 600px conferidas.

**Próximo passo:** autenticação (login/cadastro) → salvar o resultado no perfil.

## 2026-10-12 — Etapa 1: monografia recebida (concluída)

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
