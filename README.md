# Doe + Vida

Portal web informativo e motivacional sobre doação de sangue, com pré-triagem online **não oficial** e área do usuário. Trabalho de Conclusão de Curso do curso técnico integrado ao ensino médio em Desenvolvimento de Sistemas. Região de referência: Blumenau, SC.

> **Estado atual:** Etapa 0 concluída (ambiente e estrutura base). As páginas ainda exibem apenas o título.

## Objetivo

Informar a população sobre a doação de sangue, desfazer mitos, incentivar novos doadores e ajudar cada pessoa a saber se provavelmente pode doar, encaminhando-a aos canais oficiais do HEMOSC / Hemocentro Regional de Blumenau.

## Funcionalidades (planejadas)

| Funcionalidade | Status |
|---|---|
| Informações: o que é, por que doar, quem pode doar, tabela de compatibilidade ABO/Rh, fontes oficiais | planejada |
| Triagem: questionário de pré-avaliação (apto / inapto temporário / inapto) e orientação | planejada |
| Sobre a equipe | planejada |
| Entrar / Cadastro (Firebase Authentication) | planejada |
| Perfil: histórico das triagens e data sugerida para reavaliar | planejada |
| Agendamento: encaminhamento para os canais oficiais | planejada |
| Layout global: navbar e rodapé | planejada |

## Aviso

A triagem do Doe + Vida é **apenas orientativa** e **não substitui a triagem oficial** feita no hemocentro. O site não é oficial e não tem vínculo com o Ministério da Saúde, a ANVISA ou o HEMOSC.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Build | Vite |
| Interface | React + TypeScript |
| Rotas | React Router |
| Estilo | Tailwind CSS v4 |
| Backend | Firebase (Authentication + Cloud Firestore), plano gratuito Spark |
| Hospedagem | Firebase Hosting |
| Testes | Vitest + `@firebase/rules-unit-testing` |
| Qualidade | ESLint + TypeScript (`tsc`) |

## Arquitetura

Aplicação de página única (SPA) estática, sem servidor próprio. O navegador fala diretamente com o Firebase, e o acesso aos dados é protegido pelas **Security Rules**.

Dependências em camadas, sempre de cima para baixo:

```
pages → components → features → services → Firebase
```

- **pages:** montam a tela de cada rota.
- **components:** peças visuais reutilizáveis.
- **features:** regras de negócio (por exemplo, a lógica da triagem).
- **services:** única camada que acessa o Firebase.

O ESLint impede importar o Firebase fora de `src/services/` e `src/lib/`.

## Estrutura do projeto

```
├── src/
│   ├── app/            # App.tsx e router.tsx (rotas)
│   ├── pages/          # uma página por rota
│   ├── components/     # componentes visuais reutilizáveis (TituloPagina)
│   ├── config/         # conteúdo configurável (rotas.ts)
│   ├── lib/firebase.ts # inicialização do Firebase + emuladores
│   ├── styles/         # index.css com tokens de design (Tailwind)
│   ├── main.tsx        # ponto de entrada
│   └── vite-env.d.ts   # tipos das variáveis de ambiente
├── tests/              # testes das Security Rules
├── docs/               # progresso, monografia e apoio ao TCC
├── firebase.json       # Hosting, Firestore e emuladores
├── firestore.rules     # regras de segurança (hoje: negar tudo)
└── firestore.indexes.json
```

As pastas `features/`, `services/`, `types/` e `public/` serão criadas quando tiverem conteúdo.

### Páginas do site

| Rota | Página | Arquivo |
|---|---|---|
| `/` | Informações sobre doação de sangue | `src/pages/InicioPage.tsx` |
| `/triagem` | Triagem | `src/pages/TriagemPage.tsx` |
| `/equipe` | Sobre a equipe | `src/pages/EquipePage.tsx` |
| `/entrar` | Entrar ou cadastrar | `src/pages/EntrarPage.tsx` |
| `/perfil` | Meu perfil | `src/pages/PerfilPage.tsx` |
| `/agendamento` | Agendar doação | `src/pages/AgendamentoPage.tsx` |
| qualquer outra | Página não encontrada | `src/pages/NaoEncontradaPage.tsx` |

Caminhos e títulos ficam em `src/config/rotas.ts`.

## Firebase

- **Projeto:** `doe-mais-vida`, no plano **Spark** (gratuito). Não usamos nada que exija o plano Blaze: Cloud Functions, Cloud Storage e App Hosting estão fora.
- **Authentication:** e-mail/senha e Google.
- **Cloud Firestore:** edição Standard, região `nam5`.
- **Security Rules:** hoje negam todo acesso. Quando a autenticação for implementada, cada usuário poderá ler e escrever **somente os próprios dados**. Toda mudança de regra vem acompanhada de teste.
- **Hosting:** serve a pasta `dist/` e redireciona todas as rotas para `index.html`. Endereço: `https://doe-mais-vida.web.app`.
- **Emuladores:** versões locais de Auth, Firestore e Hosting para desenvolver e testar sem tocar no projeto real.

## Banco de dados

O modelo de dados será documentado aqui conforme a implementação. A proposta inicial está no `CLAUDE.md` (§5). Por causa da LGPD, as respostas da triagem **não são armazenadas**. Guardamos apenas o resultado, os códigos de motivo, as datas e a versão dos critérios usados.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha com a configuração web do app:

```
firebase apps:sdkconfig WEB --project doe-mais-vida
```

| Variável | Uso |
|---|---|
| `VITE_FIREBASE_*` | configuração web do Firebase |
| `VITE_USE_EMULATORS` | `true` faz o `npm run dev` usar os emuladores locais |

A configuração web do Firebase **não é segredo**: ela aparece no site publicado, e a proteção vem das Security Rules. Mesmo assim, fica em `.env.local` (fora do Git) por organização. **Chaves de service account e chaves privadas nunca entram no repositório.**

## Instalação

Pré-requisitos: Node.js 22 ou superior, Git, Java (JDK) 21 ou superior (exigido pelos emuladores) e Firebase CLI.

```
npm install -g firebase-tools
firebase login
npm install
```

## Execução local

```
npm run emulators   # terminal 1: emuladores (com VITE_USE_EMULATORS=true)
npm run dev         # terminal 2: site em http://localhost:5173
```

## Emuladores

`npm run emulators` sobe:

| Serviço | Porta |
|---|---|
| Emulator UI | http://127.0.0.1:4000 |
| Authentication | 9099 |
| Firestore | 8080 |
| Hosting | 5000 (serve o `dist/`; rode `npm run build` antes) |

## Testes

```
npm test            # testes de lógica (Vitest)
npm run test:rules  # testes das Security Rules (sobe o emulador sozinho)
npm run lint        # ESLint
npm run typecheck   # verificação de tipos
```

Os testes de regras usam o projeto fictício `demo-doe-mais-vida`, por isso nunca acessam dados reais.

## Build

```
npm run build       # gera dist/
npm run preview     # serve o build localmente
```

## Deploy

```
firebase deploy
```

O site fica em `https://doe-mais-vida.web.app`. O deploy **só é feito após confirmação da equipe**, depois de rodar o build e os testes e de revisar as regras.

## Git/GitHub

- Branch principal: `main`.
- Commits pequenos, em português, descrevendo o que mudou.
- Ainda não há remoto no GitHub. O remoto e o push serão configurados com aprovação da equipe.

## Fluxo de desenvolvimento

1. Ler `CLAUDE.md` e `docs/PROGRESSO.md`.
2. Implementar a mudança, respeitando as camadas da arquitetura.
3. Rodar lint, typecheck e testes.
4. Atualizar este README se a estrutura do site mudou, e registrar o progresso.
5. Fazer o commit.

## Convenções de código

- Nomes de domínio em português (`triagem`, `reavaliarAPartirDe`).
- Componentes em PascalCase, um por arquivo. Páginas terminam em `Page`.
- Sem `any` desnecessário, sem `eslint-disable` sem justificativa e sem `try/catch` vazio.
- HTML semântico, foco visível e labels em todos os campos de formulário.

## Segurança e LGPD

- As respostas da triagem são dados de saúde (dados sensíveis pela LGPD) e **nunca são salvas**.
- Cada usuário acessa apenas os próprios dados, regra garantida pelas Security Rules e coberta por testes.
- Nenhum segredo fica no código. Arquivos `.env*` (exceto `.env.example`) e chaves de service account são ignorados pelo Git.

## Fontes oficiais

Os critérios da triagem virão exclusivamente de:

- Ministério da Saúde: Portaria de Consolidação nº 5/2017
- ANVISA: RDC nº 34/2014
- HEMOSC: Centro de Hematologia e Hemoterapia de Santa Catarina
- OMS: Organização Mundial da Saúde

Links e contatos oficiais serão centralizados em `src/config/` e marcados como "a verificar" até a equipe confirmar.

## Equipe

_A preencher._

## Solução de problemas

| Problema | Solução |
|---|---|
| `Configuração do Firebase incompleta` | Crie `.env.local` a partir de `.env.example`. |
| Emulador do Firestore não inicia | Instale o JDK 21 ou superior e abra um terminal novo. |
| Porta em uso (4000, 5000, 8080 ou 9099) | Feche outro emulador ou processo que esteja usando a porta. |
| `firebase` não reconhecido | `npm install -g firebase-tools` e abra um terminal novo. |
| Rota abre 404 no Hosting | Confira o `rewrites` no `firebase.json`. |

## Histórico de alterações

| Data | Alteração |
|---|---|
| 2026-10-12 | Etapa 0: ambiente, estrutura base, Firebase (`doe-mais-vida`), testes e documentação. |
