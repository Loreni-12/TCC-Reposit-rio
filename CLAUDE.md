# CLAUDE.md — Manual de trabalho do Doe + Vida

> Leia este arquivo inteiro no início de cada sessão. Depois leia `docs/PROGRESSO.md` para saber onde paramos.

## 1. Identidade

- **Nome:** Doe + Vida (ID Firebase: `doe-mais-vida`; o "+" não é permitido em IDs).
- **Natureza:** TCC de curso técnico integrado ao ensino médio (Desenvolvimento de Sistemas).
- **O que é:** portal web informativo e motivacional sobre doação de sangue, com triagem online **não oficial** e área do usuário.
- **Idioma:** português do Brasil. **Região de referência:** Blumenau, SC.
- **Páginas planejadas:** Início/Informações · Triagem · Sobre a equipe · Entrar/Cadastro · Perfil (histórico de triagens) · Agendamento (encaminha a canais oficiais do HEMOSC) · layout global (navbar + rodapé).

## 2. Stack (não trocar sem consultar a equipe)

| Camada | Escolha | Motivo |
|---|---|---|
| Build | Vite | gera site estático, compatível com Hosting gratuito |
| UI | React + TypeScript | componentização e tipagem |
| Rotas | React Router | páginas separadas em SPA |
| Estilo | Tailwind CSS v4 | responsividade rápida; tokens em CSS |
| Backend | Firebase JS SDK (Auth + Firestore) | sem servidor próprio |
| Testes | Vitest (lógica) + `@firebase/rules-unit-testing` (regras) | |
| Qualidade | ESLint + `tsc` | |

TypeScript fixado em `~6.0` porque o `typescript-eslint` ainda não suporta o 7.
**Proibido:** Next.js/SSR, Cloud Functions, Cloud Storage, App Hosting, extensões pagas (exigem plano Blaze).

## 3. Arquitetura

Fluxo de dependência obrigatório: **pages → components → features → services → Firebase**.

- Cada camada só conhece a camada abaixo. Isso isola o Firebase (trocar/mocar fica fácil), mantém a lógica testável sem UI e evita que componentes visuais acessem dados.
- **Imposto pelo ESLint:** qualquer import de `firebase/*` ou `lib/firebase` fora de `src/services/` e `src/lib/` é erro.

## 4. Estrutura de pastas

| Pasta | Finalidade |
|---|---|
| `src/app/` | roteador (`router.tsx`), providers, layout global |
| `src/pages/` | uma página por rota; só UI e composição |
| `src/components/` | componentes visuais reutilizáveis (sem Firebase) |
| `src/features/` | lógica por domínio: `triagem/`, `auth/`, `perfil/` (hooks, regras de negócio) — *a criar* |
| `src/services/` | única camada que fala com Firebase — *a criar* |
| `src/lib/firebase.ts` | inicialização do Firebase + emuladores em dev |
| `src/config/` | conteúdo configurável: rotas, links oficiais, critérios da triagem, equipe |
| `src/types/` | tipos compartilhados — *a criar quando houver* |
| `src/styles/` | tokens de design e CSS global |
| `tests/` | testes das Security Rules (rodam no emulador) |
| `public/` | assets estáticos — *a criar quando houver* |
| `docs/` | apoio ao TCC: progresso, decisões, monografia |

Não criar pastas/arquivos vazios só para "parecer organizado".

## 5. Firebase

- **Projeto:** `doe-mais-vida` · **Plano:** Spark (gratuito) — **nunca fazer upgrade**.
- **Auth:** provedores E-mail/Senha e Google (ativar no console).
- **Firestore:** edição Standard, região `nam5`. Modelo **proposto, a confirmar**:
  ```
  users/{uid}
    nome, email, criadoEm, consentimentoLgpdEm
  users/{uid}/triagens/{triagemId}
    resultado: "apto" | "inapto_temporario" | "inapto"
    motivos: string[]          # códigos definidos em config, nunca respostas brutas
    reavaliarAPartirDe: timestamp | null
    versaoCriterios: string
    criadaEm: timestamp
  ```
- **Security Rules (`firestore.rules`):** hoje negam tudo. Modelo futuro: somente o dono acessa `users/{uid}` e subcoleções. Proibido `if true` e regras com data de expiração.
- **Hosting:** serve `dist/`, rewrite de tudo para `/index.html` (SPA). URL: `https://doe-mais-vida.web.app`.
- **Emuladores:** `npm run emulators` (Auth 9099, Firestore 8080, Hosting 5000, UI 4000). Com `VITE_USE_EMULATORS=true` no `.env.local`, `npm run dev` usa os emuladores. Testes de regras usam o projeto `demo-doe-mais-vida` (nunca toca recursos reais).

## 6. Regras de domínio

- Triagem **não oficial**, com aviso visível de que não substitui a triagem do hemocentro.
- Critérios clínicos **somente de fontes oficiais** (MS — Portaria de Consolidação nº 5/2017; ANVISA — RDC nº 34/2014; HEMOSC), em um único arquivo versionado em `src/config/`, com fonte e data de cada critério. **Nunca inventar critérios.**
- **Nunca salvar respostas brutas** da triagem (LGPD — dado de saúde). Salvar só resultado, códigos de motivo, datas e versão dos critérios.
- Links, telefones e endereços oficiais centralizados em `src/config/`, marcados "a verificar" até a equipe confirmar. **Nunca inventar URLs.**

## 7. Regras de desenvolvimento

1. Não remover funcionalidades sem autorização.
2. Não alterar dados de produção sem confirmação; nunca apagar dados.
3. Não tornar Security Rules permissivas; toda mudança de regra vem com teste.
4. Não colocar secrets no código.
5. Não duplicar componentes; preferir reutilizáveis.
6. Preservar responsividade e acessibilidade (HTML semântico, contraste, foco visível, labels em formulários).
7. Corrigir a causa dos bugs, não mascarar.
8. Não instalar dependências sem justificar.
9. Rodar `npm run lint`, `npm run typecheck` e testes após mudanças relevantes.
10. **Sempre atualizar o `README.md`** (seções "Estrutura do projeto", "Páginas do site" e "Histórico de alterações") quando a estrutura do site mudar: nova página/rota, pasta, componente compartilhado, serviço ou coleção. Atualizar também este CLAUDE.md se a regra/arquitetura mudar.
11. Commits pequenos e frequentes, em português, antes de grandes alterações.
12. Antes de deploy: build, testes e revisão das regras.
13. **Sempre salvar o progresso** ao fim de cada tarefa/etapa (ver §8).
14. **Nenhuma informação falsa no projeto final** (ver §11): todo placeholder deve estar marcado `A VERIFICAR`/`PLACEHOLDER` e ser resolvido antes da entrega.

## 8. Salvar progresso (obrigatório)

Ao concluir qualquer tarefa ou etapa:

1. Atualizar `docs/PROGRESSO.md`: data, o que foi feito, estado dos testes, pendências e próximo passo.
2. Atualizar `README.md` se a estrutura mudou (regra 10).
3. Rodar lint/typecheck/testes.
4. Fazer commit local em português (`git add` + `git commit`). **Push só com confirmação.**

Se a sessão for interrompida, a próxima começa lendo este arquivo e `docs/PROGRESSO.md`.

## 9. Política de alterações

- **Pequenas e seguras** (texto, estilo, componente novo, teste): executar direto.
- **Importantes** (banco, Security Rules, Auth, remoção de dados ou funcionalidades, mudança arquitetural, deploy, push): explicar impacto, listar arquivos afetados, apontar riscos e **pedir confirmação**.

## 10. Roteiro das próximas etapas

0. ~~Preparação do ambiente~~ (concluída)
1. Receber a monografia e montar a rastreabilidade (§11)
2. Layout global (navbar e rodapé)
3. Página de informações e tabela de compatibilidade ABO/Rh
4. Triagem (lógica testada)
5. Autenticação
6. Perfil com histórico
7. Agendamento (links oficiais)
8. Sobre a equipe
9. Revisão de segurança
10. Deploy

A ordem pode ser ajustada para seguir a monografia.

## 11. Monografia do TCC (fonte de requisitos)

A monografia será colocada em `docs/monografia/` e contém **diagrama de classes**, **diagrama de casos de uso** e **trechos de código ilustrativos** (que podem ser fictícios). Procedimento:

1. Ler a monografia e extrair requisitos, casos de uso e classes para `docs/monografia/rastreabilidade.md` (cada item → onde é implementado → status).
2. **Casos de uso** viram rotas/fluxos; **classes** viram tipos em `src/types/` + lógica em `src/features/` + persistência em `src/services/`, respeitando a arquitetura (§3) e a regra LGPD (§6). Se um diagrama conflitar com uma restrição obrigatória (custo zero, LGPD, critérios oficiais), **parar e perguntar** antes de implementar.
3. **Código ilustrativo da monografia deve virar código real e funcional** no projeto (com teste quando houver lógica). Registrar no arquivo de rastreabilidade qual trecho virou qual arquivo, para a equipe poder atualizar o texto da monografia com o código verdadeiro.
4. **Nada fictício permanece na versão final:** nenhum dado, link, telefone, critério, nome, depoimento ou código "de mentira". Informação ainda não confirmada fica marcada `A VERIFICAR` e entra numa lista de pendências em `docs/PROGRESSO.md`; antes da entrega, `grep` por `A VERIFICAR|PLACEHOLDER|TODO` deve retornar vazio.

## 12. Design (a preencher pela equipe)

Tokens ficam em `src/styles/index.css` (`@theme` do Tailwind v4) — mude o visual ali, sem tocar na lógica.

- **Referência anterior (não definitiva):** paleta vermelho/branco/preto, estética acolhedora.
- **Paleta:** _a definir_
- **Tipografia:** _a definir_
- **Espaçamento:** _a definir_
- **Bordas:** _a definir_
- **Sombras:** _a definir_
- **Componentes:** _a definir_
- **Comportamento mobile:** mobile-first; _detalhes a definir_
- **Referências:** _a definir_

## 13. Comandos

```
npm run dev          # servidor de desenvolvimento (Vite)
npm run build        # typecheck + build em dist/
npm run preview      # serve o build localmente
npm run lint         # ESLint
npm run typecheck    # tsc -b
npm test             # testes de lógica (Vitest)
npm run test:rules   # testes das Security Rules no emulador
npm run emulators    # Auth, Firestore, Hosting + Emulator UI
firebase deploy      # SOMENTE com confirmação
```
