# Motor de Busca

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status: Em Desenvolvimento">
</p>

## 📖 Descrição
O **Motor de Busca** é uma API desenvolvida para se integrar com a API do **Portal Nacional de Contratações Públicas (PNCP)**. O sistema automatiza a recolha de editais e licitações com base nos termos de interesse configurados para cada cliente, disponibilizando os dados consolidados através de endpoints `GET`.

## 🚀 Funcionalidades
* 🔍 **Busca Automatizada:** Integração contínua e filtragem de dados diretamente da API do PNCP. Busca programada para executar as 8 horas da manhã, ao rodar a aplicação a busca é executada com os dados cadastrados.
* 👥 **Filtros por Cliente:** Gestão e parametrização de termos específicos customizados por utilizador/cliente.
* ⚡ **Disponibilização de Dados:** Endpoints REST otimizados para consumo rápido dos dados filtrados.

## 🛠 Tecnologias Utilizadas
* **Linguagem:** Java 17
* **Framework:** Spring Boot 3.x
* **Persistência / Banco de Dados:** Spring Data JPA / PostgreSQL
* **Gerador de Builds:** Maven

## 📋 Pré-requisitos
Antes de começar, precisa de ter instalado na sua máquina:
* **JDK 17** ou superior.
* **Maven**
* **PostgreSQL**

## ⚙️ Como Executar

### 1. Clonar o Repositório
```bash
git clone https://github.com/LiveiraO2110/eng-software-kurt-mod1.git
cd eng-software-kurt-mod1/docs/software/back-end
```

### 2. Configurar variáveis de ambiente (application.properties)

```env
spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 3. Rodar a Aplicação
- Execute o comando correspondente no terminal:
```bash
./mvnw spring-boot:run
```

# Spring Security

Spring Security é uma dependência amplamente utilizada para adicionar autenticação e autorização a aplicações Spring Boot. Nesta aplicação, a segurança foi configurada no modelo STATELESS, ou seja, o servidor não mantém informações de sessão entre as requisições.

Para identificar o usuário autenticado, é utilizado o JWT (JSON Web Token). Após realizar o login com sucesso, a API gera um token que deve ser enviado em todas as requisições protegidas por meio do cabeçalho Authorization, utilizando o esquema Bearer:

Authorization: Bearer <token>

A cada requisição, o Spring Security valida a assinatura e a validade do token. Caso ele seja válido, o usuário é autenticado e autorizado a acessar os recursos protegidos da aplicação. Como não há armazenamento de sessão no servidor, todas as informações necessárias para a autenticação são obtidas diretamente a partir do JWT enviado pelo cliente.

# 📍 Endpoints Principais

# POST `/auth/register`

**Descrição:** Realiza o cadastro de um novo usuário.

### Request Body

``` json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Parâmetros

Nenhum.

### Exemplo de Requisição

POST | localhost:8080/auth/register

``` json
{
  "name": "Diego Lopes",
  "email": "diegolopes@gmail.com",
  "password": "d13g0"
}
```

### Exemplo de Resposta

Status: 201

``` json
{
  "id": 1,
  "name": "Diego Lopes"
}
```

------------------------------------------------------------------------

# POST `/auth/login`

**Descrição:** Realiza o login do usuário.

### Request Body

``` json
{
  "email": "string",
  "password": "string"
}
```

### Parâmetros

Nenhum.


### Exemplo de Requisição

POST | localhost:8080/auth/login

``` json
{
  "email": "diegolopes@gmail.com",
  "password": "d13g0"
}
```

### Exemplo de Resposta

Status: 200

``` json
{
  "token": ij4b14b8y213y12bu3b21ug3b12yadad
}
```

------------------------------------------------------------------------

# POST `/customers`

**Descrição:** Cadastra um novo cliente.

### Request Body

``` json
{
  "userId": "number",
  "name": "string"
}
```

### Parâmetros

Nenhum.

### Exemplo de Requisição

POST | localhost:8080/customers

``` json
{
  "userId": 1,
  "name": Hélio Ferragens
}
```

### Exemplo de Resposta

Status: 201

``` json
{
  "id": 1,
  "name": "Hélio Ferragens",
  "searchTerms": [],
  "procurements": 0
}
```

------------------------------------------------------------------------

# GET `/customers`

**Descrição:** Retorna todos os clientes pertencentes ao usuário
autenticado.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

GET | localhost:8080/customers

### Exemplo de Resposta


``` json
[
  {
    "id": 1,
    "name": "Hélio Ferragens",
    "searchTerms": [],
    "procurements": 0
  }
]
```

------------------------------------------------------------------------

# GET `/customers/{customerId}`

**Descrição:** Retorna um cliente específico.

### Request Body

Nenhum.

### Parâmetros

  Nome         Tipo   Obrigatório   Descrição
  ------------ ------ ------------- ---------------
  customerId   Long   Sim           ID do cliente

### Exemplo de Requisição

GET | localhost:8080/customers

### Exemplo de Resposta

``` json
{
  "id": 1,
  "name": "Hélio Ferragens",
  "searchTerms": [],
  "procurements": 0
}
```

------------------------------------------------------------------------

# POST `/customers/search-terms`

**Descrição:** Cadastra termos de busca para um cliente.

### Request Body

``` json
{
  "customerId": "number",
  "terms": [
    "term": "string",
    "states": "string[]"
  ]
}
```

### Parâmetros

Nenhum.

### Exemplo de Requisição

POST | localhost:8080/customers/search-terms

``` json
{
  "customerId": 1,
  "terms": [
    {
      "term": "ferragem",
      "states": [20] 
    }
  ]
}
```

### Exemplo de Resposta

Status: 201

``` json
[
  {
    "id": 1,
    "term": "ferragem",
    "customerId": 1
  }
]
```

------------------------------------------------------------------------

# GET `/customers/{customerId}/search-terms`

**Descrição:** Retorna os termos de busca cadastrados para um cliente.

### Request Body

Nenhum.

### Parâmetros

  Nome         Tipo   Obrigatório   Descrição
  ------------ ------ ------------- ---------------
  customerId   Long   Sim           ID do cliente

### Exemplo de Requisição

GET | localhost:8080/customers/1/search-terms

### Exemplo de Resposta

Status: 200

``` json
[
  {
    "id": 1,
    "term": "ferragem",
    "customerId": 1
  }
]
```

------------------------------------------------------------------------

# GET `/customers/{customerId}/procurements`

**Descrição:** Retorna todos os editais do cliente.

### Request Body

Nenhum.

### Parâmetros

  Nome         Tipo   Obrigatório   Descrição
  ------------ ------ ------------- ---------------
  customerId   Long   Sim           ID do cliente

### Exemplo de Requisição

GET | localhost:8080/customers/1/procurements

### Exemplo de Resposta

Status: 200

``` json
[
  {
        "id": 1,
        "pncpId": "78486198000152-1-000254/2026",
        "customerId": 1,
        "customer": "Hélio Ferragens",
        "description": "Descrição sobre o edtial",
        "city": "Santa Cruz do Sul",
        "uf": "RS",
        "insertDate": "2026-07-02",
        "openDate": "2026-07-03T15:00:00",
        "closeDate": "2026-07-22T07:45:00",
        "cnpj": "78486198000152",
        "name": "MUNICIPIO DE SANTA CRUZ DO SUL",
        "modalidade": "Pregão - Eletrônico",
        "link": "https://pncp.gov.br/app/editais/78486198000152/2026/254"
    }
]
```

------------------------------------------------------------------------

# GET `/procurements`

**Descrição:** Retorna todos os editais dos clientes do usuário.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

GET | localhost:8080/procurements

### Exemplo de Resposta

Status: 200

``` json
[
  {
        "id": 1,
        "pncpId": "78486198000152-1-000254/2026",
        "customerId": 1,
        "customer": "Hélio Ferragens",
        "status": "PENDENTE"
        "description": "Descrição sobre o edtial",
        "city": "Santa Cruz do Sul",
        "uf": "RS",
        "insertDate": "2026-07-02",
        "openDate": "2026-07-03T15:00:00",
        "closeDate": "2026-07-22T07:45:00",
        "cnpj": "78486198000152",
        "name": "MUNICIPIO DE SANTA CRUZ DO SUL",
        "modalidade": "Pregão - Eletrônico",
        "link": "https://pncp.gov.br/app/editais/78486198000152/2026/254"
    }
]
```

------------------------------------------------------------------------

# GET `/procurements/search`

**Descrição:** Pesquisa editais utilizando filtros.

### Request Body

Nenhum.

### Parâmetros

  Nome   Tipo        Obrigatório   Descrição
  ------ ----------- ------------- ------------------
  c      Long        Não           ID do cliente
  date   LocalDate   Sim           Data da pesquisa
  uf     String      Não           Estado
  pncp   String      Não           ID PNCP

### Exemplo de Requisição

GET | localhost:8080/procurements/search?c=1&date=2026-07-02&uf=RS&pncp=784

### Exemplo de Resposta

Status: 200

``` json
[
  {
        "id": 1,
        "pncpId": "78486198000152-1-000254/2026",
        "customerId": 1,
        "customer": "Hélio Ferragens",
        "status": "PENDENTE"
        "description": "Descrição sobre o edtial",
        "city": "Santa Cruz do Sul",
        "uf": "RS",
        "insertDate": "2026-07-02",
        "openDate": "2026-07-03T15:00:00",
        "closeDate": "2026-07-22T07:45:00",
        "cnpj": "78486198000152",
        "name": "MUNICIPIO DE SANTA CRUZ DO SUL",
        "modalidade": "Pregão - Eletrônico",
        "link": "https://pncp.gov.br/app/editais/78486198000152/2026/254"
    }
]
```

------------------------------------------------------------------------

# PUT `/procurements/{id}/status/{status}`

**Descrição:** Altera o status do edital. (APROVADO, PENDENTE e DESCARTADO)

### Request Body

Nenhum.

### Parâmetros

  Nome     Tipo   Obrigatório   Descrição
  -------- ------ ------------- --------------
  id       Long   Sim           ID do edital
  status   Enum   Sim           Novo status

### Exemplo de Requisição

PUT | localhost:8080/procurements/1/DESCARTADO

### Exemplo de Resposta

Status: 204

------------------------------------------------------------------------

# DELETE `/procurements`

**Descrição:** Remove todos os editais com status `DESCARTADO`.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

DELETE | localhost:8080/procurements

### Exemplo de Resposta

Status: 204


------------------------------------------------------------------------

# GET `/search`

**Descrição:** Realiza a busca na API do PNCP

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

GET | localhost:8080/search

### Exemplo de Resposta

1 - Se a busca não estiver ocorrendo

Status: 409

``` json
  {
      "status": "BUSCANDO...",
      "message": "A busca já está sendo realizada"
  }
```

---

2 - Se a busca estiver ocorrendo

Status: 200

``` json
  {
      "status": "BUSCA INICIADA",
      "message": "A busca foi iniciada"
  }
```

------------------------------------------------------------------------

# GET `/search/status`

**Descrição:** Verfica se a busca esta ativa (true) ou não (false)

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

GET | localhost:8080/search/status

### Exemplo de Resposta

Status: 200

true
