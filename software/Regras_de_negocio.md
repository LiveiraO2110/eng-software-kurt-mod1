## ⚖️ Regras de Negócio

O comportamento da aplicação e a consistência dos dados são regidos pelas seguintes regras de negócio:

### 🔄 Processamento e Execução da Busca
* **Execução Exclusiva (Singleton):** A rotina de busca de editais funciona de forma síncrona/bloqueante por execução. Não é permitida a execução de mais de uma busca simultaneamente; caso uma busca seja solicitada enquanto outra estiver ativa, o sistema retornará um erro de conflito (`Status 409`).
* **Idempotência de Editais:** O sistema possui um mecanismo de validação para garantir a unicidade dos dados. Sob nenhuma circunstância um mesmo edital será duplicado ou inserido repetidamente para o mesmo cliente no banco de dados.

### 🔍 Critérios e Escopo da Pesquisa (Integração PNCP)
Quando a busca automatizada diária (ou manual) é acionada, ela utiliza a API do PNCP aplicando estritamente os seguintes filtros para **todos** os clientes cadastrados:
* **Janela Temporal:** São capturados apenas os editais publicados a partir de **3 dias atrás** em relação à data atual.
* **Modalidade Restrita:** A busca filtra exclusivamente contratações da modalidade **Pregão - Eletrônico**.
* **Disponibilidade de Anexo:** O sistema apenas realiza a coleta e o armazenamento de editais que possuam o **arquivo PDF disponibilizado** na plataforma de origem.

### 🗺️ Abrangência Geográfica dos Termos de Busca
* **Filtro por Estado (UF):** Os termos de busca parametrizados para cada cliente podem estar vinculados a nenhum, a um, ou a múltiplos estados (UFs).
* **Abrangência Nacional:** Caso um termo de busca seja cadastrado **sem nenhum estado associado**, o sistema interpretará que a pesquisa para aquele termo deve ser realizada a nível nacional (país inteiro).

### 📋 Ciclo de Vida e Fluxo dos Editais
* **Gerenciamento de Status:** Os editais coletados podem transicionar entre três estados principais gerenciados pelo cliente: `PENDENTE` (padrão inicial), `VALIDADO` e `DESCARTADO`.
* **Segregação de Descartados:** Ao marcar um edital como `DESCARTADO`, ele é imediatamente ocultado das listagens principais de consumo diário do usuário, tornando-se acessível exclusivamente através de uma visão/aba específica de itens descartados.
* **Expurgo de Dados:** O cliente detém a autonomia para realizar a limpeza definitiva do banco de dados, sendo permitido deletar permanentemente todos os editais que estejam com o status `DESCARTADO` através de um único comando.