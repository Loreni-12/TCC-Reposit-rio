# Rastreabilidade: monografia → código

> Liga cada item da monografia ([modelo-monografia.md](modelo-monografia.md)) ao arquivo que o implementa.
> Status: ⏳ planejado · 🔧 em andamento · ✅ implementado e testado · ⚠️ conflito (decisão da equipe) · ✏️ texto da monografia precisa ser ajustado

## 1. Casos de uso

| Caso de uso | Implementação prevista | Status |
|---|---|---|
| UC1 Consultar informações sobre doação | rota `/` + `src/config/informacoes.ts` (conteúdo com fonte) | ⏳ |
| UC2 Consultar critérios para doação | seção de critérios lida de `src/config/criterios.ts` (mesma fonte da triagem) | ⏳ |
| UC3 Realizar questionário de triagem online | rota `/triagem` + `src/features/triagem/` | ⏳ |
| UC4 Responder o questionário (include) | formulário acessível em `src/pages/TriagemPage.tsx` | ⏳ |
| UC5 Verificar aptidão (include) | `verificarAptidao()` em `src/features/triagem/`, com testes | ⏳ |
| UC6 Consultar resultado (include) | tela de resultado + histórico em `/perfil` | ⏳ |
| UC7 Receber orientação (extend) | orientações por motivo, vindas de `criterios.ts` | ⏳ |
| UC8 Agendar doação (extend UC5) | ver conflito **C1** | ⚠️ |

## 2. Classes → código

| Classe (Figura 4) | Onde vira código real | Observação |
|---|---|---|
| Usuario | `src/types/usuario.ts` + `src/services/usuarios.ts` (`users/{uid}`) | O id passa a ser a string do Firebase Auth (uid), não `int`. ✏️ |
| InformacaoDoacao | `src/config/informacoes.ts` | Conteúdo estático versionado, cada item com fonte e data. |
| CriterioDoacao | `src/config/criterios.ts` | Fonte única dos critérios (fonte + data + status de validação). |
| QuestionarioTriagem | `src/features/triagem/questionario.ts` | Perguntas geradas a partir dos critérios. Ver **C3**. |
| Resposta | `src/types/triagem.ts` (existe só na memória do navegador) | Ver **C2**. |
| VerificacaoAptidao | `src/features/triagem/verificarAptidao.ts` | Função pura e testada; substitui o Quadro 2. |
| ResultadoTriagem | `src/types/triagem.ts` + `src/services/triagens.ts` (`users/{uid}/triagens`) | Salva resultado, códigos de motivo e datas. |
| Orientacao | `src/config/criterios.ts` (texto de orientação por critério) | |
| AgendamentoDoacao | ver **C1** | |
| Hemocentro (citado no texto, ausente na figura) | `src/config/hemocentros.ts` | Dados reais, marcados como "a verificar" até a equipe confirmar. ✏️ |

Multiplicidade: o diagrama mostra Usuario **1—1** QuestionarioTriagem, mas o texto diz que o usuário pode fazer vários. Será implementado como **1—0..\***. ✏️

## 3. Quadros de código → código real

| Quadro | Código real | Status |
|---|---|---|
| Q1 cadastrar/entrar | `src/services/auth.ts` (mesmas funções do Firebase, tipadas, com mensagens de erro em português) + Google | ⏳ |
| Q2 verificarTriagem | `src/features/triagem/verificarAptidao.ts`: lê os critérios de `criterios.ts` em vez de números fixos e não manipula o DOM | ⏳ |
| Q3 agendar | depende de **C1** | ⚠️ |

## 4. Conflitos com as restrições do projeto (precisam de decisão)

- **C1 Agendamento.** O Quadro 3 grava um agendamento no nosso Firestore com hemocentro, data e horário. Só que o próprio TAP proíbe integração com os sistemas do hemocentro, então o HEMOSC **nunca receberia** esse agendamento. O usuário acharia que agendou sem ter agendado: isso é informação falsa e pode fazer alguém ir ao hemocentro sem horário marcado.
- **C2 Respostas brutas.** A coleção Respostas guarda o array `respostas`, que são dados de saúde. Isso vai contra a LGPD, contra o próprio TAP ("não haverá armazenamento de dados sensíveis além do estritamente necessário") e contra a regra do projeto.
- **C3 Questionários no Firestore.** Sem backend, só daria para editar perguntas pelo console. Já um arquivo versionado tem histórico, fonte e testes.
- **C4 RF-e (relatórios para o hemocentro) e RF-f (lembretes e notificações).** O RF-e exige integração, que o TAP proíbe. Enviar e-mail ou push exige Cloud Functions, que só existe no plano Blaze (pago).
- **C5 Campos `telefone` e `dataNascimento`.** Sem envio de notificações, o telefone não tem uso. A data de nascimento pode ser útil, mas é um dado pessoal a mais para guardar.

## 5. Afirmações da monografia que não batem com o sistema real (✏️ ajustar o texto)

| Trecho | Problema | Sugestão |
|---|---|---|
| Resumo/Abstract: "linguagens de programação como VSCODE, MYSQL, JAVASCRIPT, STAR UML" | VS Code e StarUML não são linguagens. O banco é Firestore, não MySQL/SQL. | "tecnologias como TypeScript, React, Firebase (Authentication e Cloud Firestore), VS Code e StarUML" |
| §2.2 e §3: "backend Node.js e Express.js, APIs RESTful" | Não existe backend próprio. O plano gratuito não permite Cloud Functions. | "aplicação web estática (React + TypeScript) que acessa o Firebase diretamente, com a segurança garantida pelas Security Rules" |
| "JavaScript como linguagem central" | O projeto usa TypeScript (um superconjunto de JavaScript com tipagem). | citar TypeScript |
| §3: "requisitos levantados por meio de entrevistas com profissionais de hemocentros" e "testes de usabilidade com potenciais doadores" | Só é verdade se essas atividades aconteceram de fato. | Manter só se ocorreram, com data e participantes. Caso contrário, remover. |
| §3.2.2: "Os exemplos podem ser integrados ao projeto" e a Tabela 5 ("representado", "preparado para gravação") | Não são resultados de teste. | Substituir pelos quadros e resultados reais gerados por este projeto (testes automatizados). |
| "repositório GitHub 'TCC Reposit-rio'" e a referência correspondente | O repositório ainda não existe. | Atualizar com a URL real depois do push. |
| Protótipo: selo "Estoque crítico de sangue O-" | Dado em tempo real que não temos (sem integração). | Não usar no site, ou apontar para a página oficial de estoques do HEMOSC. |
| Protótipo: "4 vidas", "450 ml", "60/90 dias", "30 a 40 minutos", "sem jejum" | Precisam de fonte oficial citada. "Recolha" é termo de Portugal. | Só entram no site com fonte e data (`informacoes.ts`). Usar "coleta". |
| Navbar do protótipo: nome "Doe Sangue – Portal de doação" | O nome do projeto é Doe + Vida. | Ajustar a figura ou a legenda. |
| Epígrafe atribuída a Shakespeare | A frase não aparece nas obras de Shakespeare. É uma atribuição falsa comum na internet. | Trocar a citação ou retirar a autoria. |
| Seções com numeração repetida (2.1 e 3.2.2 aparecem duas vezes), sumário com "Error! Bookmark not defined.", Figura 3 fora de ordem, "Acesso em: dia mês ano" e Conclusões vazias | Formatação | Corrigir antes da entrega (ABNT). |
| Personas (fotos) | Personas são fictícias por definição, o que é aceitável. | Deixar claro na legenda que são fictícias. Se as fotos foram geradas por IA, informar isso. |
