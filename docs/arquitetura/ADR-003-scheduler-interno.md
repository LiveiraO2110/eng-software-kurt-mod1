# ADR-003: Scheduler Interno
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto  
Um dos principais requisitos é a interface fazer a busca diária das proposta na PNCP

Restrições identificadas:
- 
-

## Alternativas Consideradas 
1. Usuário acionar a busca diariamente - descartado: 
2. Microserviços — descartado: muito complexo e desnecessário para essa atividade


## Decisão 
Será utilizada uma arquitetura em camadas baseada em:

- Frontend em React
- Backend único em Spring Boot
- Banco PostgreSQL centralizado

Todos os componentes do módulo:
- controllers
- services
- repositories
- schedulers


## Consequências 

POSITIVAS: 
- Menor complexidade arquitetural
- Facilidade de desenvolvimento
- Facilidade de depuração
- Comunicação interna na API

NEGATIVAS / TRADE-OFFS ACEITOS: 
- Escalabilidade limitada
- Acoplamento maior entre componentes

---

Links relacionados: docs/arquitetura/diagrama_de_componentes.puml
