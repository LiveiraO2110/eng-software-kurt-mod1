# ADR-001: Arquitetura em Camadas para o MVP 
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto  
Projeto académico focado na criação de uma plataforma de busca e indexação de editais divulgados diariamente pela PNCP. O sistema deve ser capaz de realizar buscas automáticas, tratar os dados e disponibilizá-los para consulta.

Restrições identificadas:
- Membros com diferentes níveis de experiência e sem uma stack tecnológica comum prévia.
- Necessidade de manter a solução simples para manutenção e apresentação
- Limitação de infraestrutura no ambiente gratuito de hospedagem

## Alternativas Consideradas
1. Microserviços — descartado: maior consumo de recursos de cloud (excedendo os limites gratuitos), muito complexo e desnecessário para essa atividade

## Decisão 
Será utilizada uma arquitetura em camadas baseada em:

- Frontend em React
- Backend único em Spring Boot
- Banco PostgreSQL do projeto

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
