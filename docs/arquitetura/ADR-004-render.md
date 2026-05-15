# ADR-004: Escolha da Plataforma de Hospedagem (Render) vs (AWS)
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto  
A arquitetura definida (ADR-001) exige a hospedagem de três componentes principais:
- Frontend (React)
- Backend (Spring Boot)
- Banco de Dados Relacional (PostgreSQL)

O projeto não possui orçamento alocado, portanto, a infraestrutura deve focar em planos gratuitos (Free Tier) que suportem a carga de testes da equipe e avaliadores, exigindo o menor esforço possível de configuração de DevOps (CI/CD).

---

## Alternativas Consideradas 
1. **AWS / Google Cloud / Azure** — descartado: Curva de aprendizado alta para configuração de infraestrutura (VPC, EC2, RDS) e risco de cobranças inesperadas no cartão de crédito em caso de erro de configuração.
2. **Heroku** — descartado: A plataforma encerrou seu plano totalmente gratuito, inviabilizando o uso sem custos para o banco de dados e aplicações.
3. **Render (render.com)** — escolhido: Oferece planos gratuitos nativos para Web Services (Backend/Frontend) e um banco de dados PostgreSQL gerenciado (com expiração de 90 dias, o que cobre o tempo do semestre letivo).

---

## Decisão 
Foi decidido utilizar a plataforma **Render** como provedor de infraestrutura em nuvem para hospedar o MVP completo do Módulo 1.

A configuração utilizará:
- **Render PostgreSQL:** Para o banco de dados centralizado.
- **Render Web Service:** Para hospedar a API em Spring Boot.
- **Render Static Site / Web Service:** Para hospedar a interface web em React.
- **Integração com GitHub:** Para realizar o deploy automático a cada novo commit na branch principal (main/master).

---

## Consequências 

### Positivas: 
- **Custo Zero:** Encaixa-se perfeitamente na restrição orçamentária do projeto acadêmico.
- **Facilidade de Deploy:** A integração direta com o repositório do GitHub automatiza as entregas sem necessidade de configurar pipelines complexos (ex: GitHub Actions).
- **Ambiente Unificado:** Permite gerenciar banco de dados, frontend e backend no mesmo painel.

### Negativas / Trade-offs Aceitos: 
- **Cold Starts (Hibernação):** No plano gratuito, os serviços web do Render "dormem" após 15 minutos de inatividade. O primeiro acesso após esse período pode levar até 1 minuto para carregar (impactando temporariamente a experiência do usuário/avaliador).
- **Limitação de Duração do Banco de Dados:** O PostgreSQL gratuito do Render expira após 90 dias. A equipe aceita esse trade-off pois o período é suficiente para a apresentação e avaliação do MVP acadêmico do semestre.
- **Recursos Limitados:** Memória RAM e CPU reduzidas, o que limita a escalabilidade, mas é perfeitamente adequado para o volume de dados de um protótipo.
- Links relacionados: docs/arquitetura/diagrama_de_implementacao.puml
