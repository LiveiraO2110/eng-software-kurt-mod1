# Especificação de Requisitos do Sistema

Este documento apresenta os Requisitos Funcionais (RF)
---

## 📋 Requisitos Funcionais (RF)

Os Requisitos Funcionais descrevem as ações, comportamentos e funcionalidades que o sistema deve executar para atender às necessidades dos utilizadores.

| Identificador | Descrição Detalhada                                                                                                                                                                   | Prioridade |
|:--------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------|
| **RF01**      | O sistema deve consumir periodicamente a API do PNCP para recuperar novos editais de licitação de forma automatizada.                                                                 | Essencial  |
| **RF02**      | O sistema deve permitir o utilizador salvar termos de busca específicas para cada cliente                                                                                             | Essencial  |
| **RF03**      | O sistema deve permitir para o utilizador selecionar onde o termo de busca vai ser buscado                                                                                            | Essencial  |
| **RF04**      | O sistema deve permitir a busca de editais por palavra-chave (termo de busca salvo).                                                                                                  | Essencial  |
| **RF05**      | O sistema deve permitir filtrar os editais por Unidade Federativa (UF) do órgão licitante.                                                                                            | Essencial  |
| **RF06**      | O sistema deve exibir uma listagem dos editais encontrados, contendo resumidamente: título, órgão emissor, data de publicação e valor estimado.                                       | Essencial  |
| **RF07**      | O sistema deve permitir visualizar a página de detalhes de um edital selecionado, contendo a categoria, itens detalhados da licitação e o link direto para o edital original no PNCP. | Essencial  |
| **RF08**      | O sistema deve permitir a autenticação de utilizadores através de e-mail (login) e palavra-passe (senha).                                                                             | Essencial  |
| **RF09**      | O sistema deve exibir apenas editais cujo prazo de recebimento de propostas esteja ativo (dentro do prazo válido).                                                                    | Essencial  |
| **RF10**      | O sistema deve alertar automaticamente o utilizador (via e-mail ou notificação interna) sempre que novos editais compatíveis com os seus perfis de busca forem importados.            | Importante |
| **RF11**      | O sistema deve permitir que o utilizador autenticado marque editais como "Favoritos" para consulta rápida posterior.                                                                  | Importante |
| **RF12**      | O sistema deve permitir filtrar os editais por uma faixa de valor estimado (definindo um valor mínimo e um valor máximo).                                                             | Importante |
| **RF13**      | O sistema deve permitir que o utilizador salve múltiplos perfis de busca (combinações guardadas de palavras-chave, UF e faixa de valor).                                              | Desejável  |
| **RF13**      | O sistema deve permitir que o utilizador descarte os editais que ele não tenha interesse                                                                                              | Essencial  |
