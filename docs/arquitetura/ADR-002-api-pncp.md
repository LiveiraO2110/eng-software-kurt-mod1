# ADR-001 Estratégia de Consumo da API do PNCP
- Status: ACEITO 
- Data: 2026-05-14 
- Equipe: Módulo 1

## Contexto

O sistema proposto tem como objetivo auxiliar usuários na busca e filtragem de oportunidades de contratações públicas disponibilizadas pelo Portal Nacional de Contratações Públicas (PNCP).

A API pública do [PNCP](https://pncp.gov.br/api/consulta?utm_source=chatgpt.com), é responsável por disponibilizar informações sobre:

- editais;
- avisos de contratação;
- órgãos públicos;
- modalidades de licitação;
- datas e valores de processos.

Durante a análise inicial foram identificadas limitações operacionais da API, como:

- indisponibilidade temporária;
- lentidão em horários de pico;
- inconsistência eventual em respostas;
- ausência de garantias de alta disponibilidade.

Essas características impactam diretamente a confiabilidade do sistema, exigindo a definição de mecanismos de tolerância a falhas e estratégias de resiliência arquitetural.

---

# Decisão

Foi decidido utilizar consultas diretas à API do PNCP com tratamento básico de erros.

Quando a API estiver indisponível:

- o sistema exibirá mensagem ao usuário;
- a consulta poderá ser tentada novamente manualmente.

---

# Restrições

- A aplicação depende de um serviço governamental externo sobre o qual não possui controle.
- Não há garantia de disponibilidade contínua da API.
- Os dados precisam permanecer relativamente atualizados.
- O projeto possui limitação de infraestrutura e orçamento.
- O sistema deve manter tempo de resposta aceitável mesmo em falhas externas.

---

# Alternativas Consideradas
## 1. Replicar completamente os dados do PNCP em banco próprio

### Vantagens

- independência da API em tempo real;
- consultas mais rápidas;
- maior controle sobre os dados.

### Desvantagens

- necessidade de sincronização contínua;
- maior consumo de armazenamento;
- alta complexidade de implementação;
- risco de dados desatualizados.

Resultado:

> descartada por exceder o escopo acadêmico do projeto.

---

## 2. Utilizar cache

### Vantagens

- reduz impacto de indisponibilidades da API;
- melhora desempenho em consultas repetidas;
- reduz quantidade de requisições externas.

### Desvantagens

- necessidade de lógica adicional no backend;
- aumento da complexidade do sistema;
- possibilidade de exibir dados temporariamente desatualizados.

Resultado:

> descartada devido à complexidade adicional para o escopo do projeto.

---

## 3. Consultar a API diretamente

### Vantagens

- implementação simples;
- menor complexidade arquitetural;
- desenvolvimento mais rápido;
- integração direta com os dados oficiais.

### Desvantagens

- dependência da disponibilidade da API;
- possibilidade de falhas temporárias nas consultas;
- maior impacto caso o serviço fique indisponível.

Resultado:

> alternativa escolhida por ser mais adequada ao escopo e prazo do projeto.

---

## Consequências

### Positivas

- implementação mais simples e rápida;
- menor complexidade arquitetural;
- menor tempo de desenvolvimento e manutenção;
- integração direta com dados oficiais do [PNCP](https://pncp.gov.br/api/consulta?utm_source=chatgpt.com);
- redução da necessidade de infraestrutura adicional.

---

### Negativas

- dependência da disponibilidade da API do PNCP;
- possibilidade de falhas temporárias durante consultas;
- lentidão caso a API esteja sobrecarregada;
- ausência de funcionamento offline;

---

