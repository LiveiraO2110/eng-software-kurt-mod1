## 🔍 `searchByPage(String q, String ufs, int page)`
> **Retorno:** `List<OpportunitiesPNCP>` — Realiza a busca paginada de editais na API do PNCP.
---

### ⚠️ Pré condições
- A string q não pode ser nula ou vazia
- O inteiro page precisa ser maior que zero

### ✅ Pós-condições
- Retorno de Dados: Retorna uma lista (List<OpportunitiesPNCP>) contendo os itens retornados pela API do PNCP correspondentes aos filtros aplicados (q, ufs e page).

- Lista Vazia por Ausência de Resultados: Se a API responder com sucesso, mas não houver nenhum item correspondente aos critérios, retorna uma lista vazia (List.of()).

- Resiliência a Falhas (Fallback): Em caso de qualquer erro de comunicação, timeout ou falha na API, retorna uma lista vazia (List.of()), garantindo que o fluxo do sistema não seja interrompido por completo.

- Garantia de Estado: O estado interno do ProcurementService permanece inalterado, pois a operação é estritamente de consulta (Idempotente).

### 🛑 Exceções Possíveis
- IllegalArgumentException (Pré-condição): Lançada caso as validações de pré-condição (como page <= 0 ou q nulo/vazio) sejam violadas antes de iniciar a requisição.

- RestClientResponseException: Ocorre quando a API do PNCP responde com um status de erro HTTP

- ResourceAccessException: Ocorre em cenários de falha de infraestrutura de rede, como perda de conexão com a internet, DNS indisponível ou Timeout

- Exception (Genérica)