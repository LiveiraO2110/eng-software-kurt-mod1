# Motor de Busca

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge" alt="Status: Em Desenvolvimento">
</p>

## 📖 Descrição
O **Motor de Busca** é uma API desenvolvida para se integrar com a API do **Portal Nacional de Contratações Públicas (PNCP)**. O sistema automatiza a recolha de editais e licitações com base nos termos de interesse configurados para cada cliente, disponibilizando os dados consolidados através de endpoints `GET`.

## 🚀 Funcionalidades
* 🔍 **Busca Automatizada:** Integração contínua e filtragem de dados diretamente da API do PNCP. Busca programada para executar a cada 30min, ao rodar a aplicação a busca é executada com os dados cadastrados.
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

### Exemplo de Resposta

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

### Exemplo de Resposta

------------------------------------------------------------------------

# POST `/customers`

**Descrição:** Cadastra um novo cliente.

### Request Body

``` json
{
  "userId": 1,
  "name": "string"
}
```

### Parâmetros

Nenhum.

### Exemplo de Requisição

### Exemplo de Resposta

------------------------------------------------------------------------

# GET `/customers`

**Descrição:** Retorna todos os clientes pertencentes ao usuário
autenticado.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

### Exemplo de Resposta

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

### Exemplo de Resposta

------------------------------------------------------------------------

# POST `/customers/search-terms`

**Descrição:** Cadastra termos de busca para um cliente.

### Request Body

``` json
{
  "customerId": 1,
  "terms": ["software","servidor","rede"]
}
```

### Parâmetros

Nenhum.

### Exemplo de Requisição

### Exemplo de Resposta

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

### Exemplo de Resposta

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

### Exemplo de Resposta

------------------------------------------------------------------------

# GET `/procurements`

**Descrição:** Retorna todos os editais dos clientes do usuário.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

### Exemplo de Resposta

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
  PNCP   String      Não           ID PNCP

### Exemplo de Requisição

### Exemplo de Resposta

------------------------------------------------------------------------

# PUT `/procurements/{id}/status/{status}`

**Descrição:** Altera o status do edital.

### Request Body

Nenhum.

### Parâmetros

  Nome     Tipo   Obrigatório   Descrição
  -------- ------ ------------- --------------
  id       Long   Sim           ID do edital
  status   Enum   Sim           Novo status

### Exemplo de Requisição

### Exemplo de Resposta

------------------------------------------------------------------------

# DELETE `/procurements`

**Descrição:** Remove todos os editais com status `DESCARTADO`.

### Request Body

Nenhum.

### Parâmetros

Nenhum.

### Exemplo de Requisição

### Exemplo de Resposta
