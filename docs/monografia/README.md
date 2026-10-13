# Monografia — fonte de requisitos

Coloque aqui a monografia do TCC e os diagramas:

| O que | Formato aceito | Nome sugerido |
|---|---|---|
| Monografia | `.pdf` ou `.docx` (ou texto `.md`) | `monografia.pdf` |
| Diagrama de classes | imagem (`.png`/`.jpg`), PDF ou PlantUML/Mermaid | `diagrama-classes.png` |
| Diagrama de casos de uso | imagem, PDF ou PlantUML/Mermaid | `diagrama-casos-de-uso.png` |
| Trechos de código da monografia | dentro da monografia ou em `codigo-monografia.md` | |

## O que acontece depois

1. Os requisitos, casos de uso e classes são extraídos para `rastreabilidade.md` (item → arquivo que implementa → status).
2. Os casos de uso viram páginas/fluxos; as classes viram tipos, lógica e serviços, seguindo a arquitetura do `CLAUDE.md`.
3. **Todo código ilustrativo/fictício da monografia é transformado em código real e funcional.** O arquivo de rastreabilidade indica qual trecho virou qual arquivo, para a equipe atualizar o texto da monografia.
4. **Nenhuma informação falsa fica no projeto final.** O que não puder ser confirmado fica marcado `A VERIFICAR` até a equipe validar.
5. Conflitos entre os diagramas e as restrições do projeto (custo zero no plano Spark, LGPD, critérios oficiais) são levados para a equipe decidir antes de implementar.
