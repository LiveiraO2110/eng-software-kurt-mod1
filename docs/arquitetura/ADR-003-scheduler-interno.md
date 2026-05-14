# ADR-003: Scheduler Interno
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto  
Um dos principais requisitos é a interface fazer a busca diária das proposta na PNCP sem depender de ações manuais dos usuários.
Para garantir que os dados permaneçam atualizados.

Restrições identificadas:
- Desconhecimento de funções que rodem diariamente
- Limitação de infraestrutura no ambiente gratuito de hospedagem

## Alternativas Consideradas 

1. Usuário acionar a busca manualmente

Descartado pois:
- dependeria de interação humana
- os dados poderiam ficar desatualizados
- não atenderia o requisito de atualização automática
- prejudicaria a experiência dos demais módulos da plataforma

---

2. Worker separado

Foi considerada a criação de um serviço independente para execução das buscas periódicas utilizando Selenium.

A alternativa foi descartada pois:
- aumentaria a complexidade arquitetural
- geraria maior dificuldade de manutenção
- a API do PNCP já fornece acesso estruturado via REST

## Decisão 
Será utilizado um scheduler interno no backend Spring Boot utilizando a anotação `@Scheduled`.

As tarefas agendadas serão executadas dentro da própria aplicação backend, sem separação em serviços independentes.

O scheduler será responsável por:
- consultar diariamente a API do PNCP
- persistir novos editais
- atualizar dados existentes
- manter a base local sincronizada

## Consequências 

POSITIVAS: 
- Implementação simples
- Menor complexidade arquitetural
- Deploy unificado
- Facilidade de manutenção
- Integração direta com os serviços internos
- Menor custo

NEGATIVAS / TRADE-OFFS ACEITOS: 
- Possível impacto de desempenho em operações pesadas ou requisições demoradas
- Escalabilidade limitada
- Menor isolamento entre processamento interno e requisições HTTP
