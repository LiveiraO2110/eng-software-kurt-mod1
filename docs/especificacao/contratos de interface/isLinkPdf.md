## 📄 `isLinkPdf(String url)`
> **Retorno:** `boolean` — Cria um cliente HTTP customizado com timeouts curtos para disparar uma requisição rápida (sem corpo) e valida, através dos cabeçalhos da resposta, se o `Content-Type` do link é um PDF válido.

---

### ⚠️ Pré condições
- Url não pode ser nula ou vazia, e deve ser uma URL semanticamente válida para resolução do cliente HTTP.

### ✅ Pós-condições
- Mídia é PDF: Retorna true se o cabeçalho Content-Type da resposta contiver application/pdf.

- Mídia Diferente de PDF: Retorna false se o link responder com sucesso, mas o tipo de arquivo for outro (ex: HTML, JSON).

### 🛑 Exceções Possíveis
- IllegalArgumentException: Se a string de URL fornecida for inválida.

- RestClientResponseException: Ocorre quando a API do PNCP responde com um status de erro HTTP

- ResourceAccessException: Ocorre em cenários de falha de infraestrutura de rede, como perda de conexão com a internet, DNS indisponível ou Timeout

- Exception (Genérica)