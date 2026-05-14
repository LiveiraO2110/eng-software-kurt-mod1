# ADR-001: Arquitetura em Camadas para o MVP 
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto  
Projeto acadêmico com a finalidade de criação de uma plataforma, onde o Módulo 1 seria responsável pela busca e indexação de editais divulgados diáriamente pela PNCP

Restrições identificadas:
- Equipe sem uma tecnologia/framework em comum
-

## Alternativas Consideradas 
1. MVC - descartado: 
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
