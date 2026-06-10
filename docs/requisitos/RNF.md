# Especificação de Requisitos do Sistema

Este documento apresenta os Requisitos Não-Funcionais (RNF)

---

## ⚙️ Requisitos Não Funcionais (RNF)

Os Requisitos Não Funcionais especificam os critérios de qualidade, restrições técnicas, desempenho e segurança que o sistema deve cumprir.

| Identificador | Categoria                           | Descrição Detalhada                                                                                                                                                                                                     |
| :--- |:------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **RNF01** | **Periodicidade / Disponibilidade** | A rotina de sincronização e atualização dos dados com a API do PNCP deve ser executada de forma automática uma vez por dia (preferencialmente em horário de menor tráfego, ex: madrugada).                              |
| **RNF02** | **Segurança**                       | Todo o tráfego de dados do sistema, incluindo a autenticação e troca de tokens, deve utilizar criptografia segura através do protocolo HTTPS (TLS).                                                                     |
| **RNF03** | **Segurança**                       | As palavras-passe (senhas) dos utilizadores devem ser armazenadas de forma segura no banco de dados utilizando algoritmos de hash robustos.                                                                             |
| **RNF04** | **Tolerância a Falhas**             | Em caso de indisponibilidade ou lentidão da API do PNCP, o sistema deve registar a falha em logs técnicos e continuar operacional utilizando os dados locais já guardados, sem interromper a experiência do utilizador. |
| **RNF05** | **Usabilidade**                     | A interface do sistema deve ser totalmente responsiva, adaptando-se e garantindo uma navegação fluida tanto em computadores (desktop) como em dispositivos móveis (smartphones e tablets).                              |

---