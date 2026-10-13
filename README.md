# Doe + Vida

Portal web informativo e motivacional sobre doação de sangue, com pré-triagem online **não oficial** e área do usuário. Trabalho de Conclusão de Curso do curso técnico integrado ao ensino médio em Desenvolvimento de Sistemas. Região de referência: Blumenau, SC.

## Para o professor

- **Site publicado:** https://doe-mais-vida.web.app
- **Código-fonte:** este repositório.

Roteiro rápido de avaliação, direto no site publicado:

1. **Página inicial:** role a página, ou use o menu, para ver "Quem pode doar", "Agendamento" e "Sobre a equipe".
2. **Pré-triagem:** clique em "Fazer pré-triagem", responda e veja o resultado (apto, inapto temporário ou inapto), com o motivo, a fonte oficial e a data para refazer. As respostas não são salvas (LGPD).
3. **Cadastro e login:** clique em "Entrar", depois em "Criar conta" (ou "Continuar com Google"). O perfil é gravado no Cloud Firestore, e somente o próprio usuário consegue lê-lo, garantido pelas Security Rules.
4. **Perfil:** depois de entrar, acesse https://doe-mais-vida.web.app/perfil para ver os dados salvos no banco.

> **Estado atual:** site em página única (abertura, requisitos, agendamento e equipe), pré-triagem em página própria e conta (entrar/cadastrar) em pop-up. Histórico de pré-triagens no perfil ainda não implementado.

## Objetivo

Informar a população sobre a doação de sangue, desfazer mitos, incentivar novos doadores e ajudar cada pessoa a saber se provavelmente pode doar, encaminhando-a aos canais oficiais do HEMOSC / Hemocentro Regional de Blumenau.

## Funcionalidades

| Funcionalidade | Status |
|---|---|
| Informações: requisitos, intervalos e impedimentos, com fonte | **pronta** (tabela de compatibilidade ABO/Rh planejada) |
| Pré-triagem: questionário (apto / inapto temporário / inapto), orientação e data para refazer | **pronta** (salvar no perfil depende do login) |
| Sobre a equipe (dados do TAP da monografia) | **pronta** |
| Entrar / Cadastro em pop-up (e-mail/senha e Google) + perfil no Firestore | **pronto** (regras ainda não publicadas) |
| Perfil: histórico das triagens e data sugerida para reavaliar | planejada |
| Agendamento: encaminhamento para os canais oficiais do HEMOSC | **pronto** (planejamento pessoal na conta: planejado) |
| Layout global: navbar e rodapé | **pronto** |

## Aviso

A triagem do Doe + Vida é **apenas orientativa** e **não substitui a triagem oficial** feita no hemocentro. O site não é oficial e não tem vínculo com o Ministério da Saúde, a ANVISA ou o HEMOSC.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Build | Vite |
| Interface | React + TypeScript |
| Rotas | React Router |
| Estilo | Tailwind CSS v4, fonte Poppins (`@fontsource/poppins`), ícones `lucide-react` |
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
│   ├── app/            # App, router e LayoutPrincipal (navbar + conteúdo + rodapé)
│   ├── pages/          # uma página por rota
│   ├── components/
│   │   ├── ui/         # Botao, Cartao, Aviso, LinkExterno, Dialogo, Onda, Conteiner
│   │   ├── inicio/     # seções da página única (abertura, informações, agendamento, equipe)
│   │   ├── conta/      # ModalConta (pop-up de entrar/cadastrar)
│   │   ├── layout/     # Navbar, Rodape
│   │   ├── formulario/ # CampoTexto, CampoOpcoes (acessíveis)
│   │   └── triagem/    # formulário e cartão de resultado da pré-triagem
│   ├── features/
│   │   ├── triagem/    # datas, validarFormulario, verificarAptidao (+ testes)
│   │   └── auth/       # ProvedorConta, useConta, validarConta, erros (+ testes)
│   ├── services/       # única camada que fala com o Firebase: auth.ts, usuarios.ts
│   ├── config/         # rotas, links oficiais, fontes, criterios da triagem
│   ├── types/          # tipos compartilhados (triagem)
│   ├── assets/         # logo
│   ├── lib/firebase.ts # inicialização do Firebase + emuladores
│   ├── styles/         # index.css com tokens de design (Tailwind)
│   ├── main.tsx        # ponto de entrada
│   └── vite-env.d.ts   # tipos das variáveis de ambiente
├── public/             # favicon
├── tests/              # testes das Security Rules
├── docs/               # progresso, monografia, design (referências visuais)
├── firebase.json       # Hosting, Firestore e emuladores
├── firestore.rules     # regras de segurança (users/{uid} só para o dono; resto negado)
└── firestore.indexes.json
```


### Páginas do site

O site é uma **página única** com seções; só a pré-triagem e o perfil têm página própria. Entrar/cadastrar é um **pop-up**.

| Endereço | Conteúdo | Arquivo |
|---|---|---|
| `/` | Abertura | `components/inicio/SecaoAbertura.tsx` |
| `/#informacoes` | Quem pode doar: requisitos, intervalos, impedimentos | `components/inicio/SecaoInformacoes.tsx` (+ `FaixaTriagem`) |
| `/#agendamento` | Como agendar no HEMOSC | `components/inicio/SecaoAgendamento.tsx` |
| `/#equipe` | Sobre a equipe | `components/inicio/SecaoEquipe.tsx` |
| `/triagem` | Pré-triagem (formulário + resultado) | `pages/TriagemPage.tsx` |
| `/perfil` | Dados da conta (área logada) | `pages/PerfilPage.tsx` |
| pop-up | Entrar, criar conta, completar cadastro (Google) | `components/conta/ModalConta.tsx` |
| qualquer outra | Página não encontrada | `pages/NaoEncontradaPage.tsx` |

Rotas, seções (âncoras) e itens do menu ficam em `src/config/rotas.ts`. Todas as páginas usam o `LayoutPrincipal` (navbar + rodapé + pop-up de conta).

### Pré-triagem: como funciona

1. O formulário (`FormularioTriagemCampos`) coleta as respostas, que **ficam só no navegador**.
2. `validarFormulario` confere os campos e converte para `RespostasTriagem`.
3. `verificarAptidao` aplica os critérios de `src/config/criterios.ts` e devolve resultado, motivos, orientações e a data para refazer.
4. Cada critério guarda o trecho literal da fonte oficial (FAQ do Ministério da Saúde) e a marcação `revisadoPelaEquipe`.

## Firebase

- **Projeto:** `doe-mais-vida`, no plano **Spark** (gratuito). Não usamos nada que exija o plano Blaze: Cloud Functions, Cloud Storage e App Hosting estão fora.
- **Authentication:** e-mail/senha e Google.
- **Cloud Firestore:** edição Standard, região `southamerica-east1` (São Paulo).
- **Security Rules:** `users/{uid}` pode ser lido, criado e atualizado **somente pelo próprio usuário**, com validação de campos (sem campos extras, e-mail igual ao da conta, datas definidas pelo servidor). Todo o resto é negado. São 11 testes em `tests/firestore.rules.test.ts`. **As regras novas ainda não foram publicadas no projeto real** (deploy só com confirmação).
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

CEDUP Hermann Hering, Blumenau/SC, turma 302 (2026).

| Integrante | Função |
|---|---|
| Ana Paula Pachuczki Ottequir | Front-end |
| Eduardo Loreni Kfassniak | Back-end |
| Milena Vitória Mognon | Full-stack |
| Thaís Fernanda Cruz | Front-end |

Orientador: Prof. Luis Renato. Professores: Oscar Stefen Junior (Projeto de Software) e Emanuel Spanhol (Desenvolvimento de Sistemas Web 4).

Requisitos e modelagem: veja [docs/monografia/](docs/monografia/).

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
| 2026-10-12 | Etapa 1: monografia transcrita (diagramas, dicionário, quadros) e rastreabilidade em `docs/monografia/`. Firestore em São Paulo. |
| 2026-10-12 | Identidade visual (paleta, Poppins, ícones, logo), layout global e pré-triagem com 37 testes. |
| 2026-10-12 | Página única com seções fluidas, equipe (TAP), cadastro em pop-up (Firebase Auth + perfil), regras de `users/{uid}` com testes, Firebase carregado sob demanda (Firestore Lite). |
| 2026-10-12 | Primeiro deploy (https://doe-mais-vida.web.app), rodapé com direitos autorais, PDF de conceitos em `docs/apresentacao/`. |
