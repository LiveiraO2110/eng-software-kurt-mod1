## 🔗 `getLink(Procurement procurement)`
> **Retorno:** `boolean` — Busca o arquivo do edital no PNCP, filtra pelo documento do tipo "edital" e valida se o link aponta para um PDF válido.

---

### ⚠️ Pré condições
- O parâmetro procurement não pode ser nulo.

- O objeto procurement deve conter um cnpj válido e preenchido. 

- O objeto procurement deve conter o numeroSequencial da compra preenchido.

### ✅ Pós-condições
- Edital Encontrado e Válido: Retorna `true` se encontrar um arquivo com tipo "edital" e a URL correspondente for um PDF acessível, e o link é adicionado ao objeto procurement. 
- Documento Ausente / Inválido: Retorna `false` se não houver arquivo do tipo "edital" ou se o link não apontar para um PDF.

### 🛑 Exceções Possíveis
- NullPointerException: Ocorre quando o objeto procurement é nulo ou tem atributos essenciais nulos.

- RestClientResponseException: Ocorre quando a API do PNCP responde com um status de erro HTTP.

- ResourceAccessException: Ocorre em cenários de falha de infraestrutura de rede, como perda de conexão com a internet, DNS indisponível ou Timeout.

- Exception (Genérica).