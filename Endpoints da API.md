# Endpoints da API (metodos HTTP)
## GET "/": 
- Obtém todas as rotas disponíveis
##  POST "/produtos" - POST
- Cadastra um novo produto no banco de dados
## GET "/produtos":
- Lista todos os produtos cadastrados no banco de dados
## PUT "/estoque/entrada" 
- Registra a entrada (adição de unidades ao estoque de um produto existente.)            
## PUT "/estoque/saida"    
- Registra a saída (remoção) de unidades do estoque de um produto existente.
## GET "/alertas" 
- Lista apenas os produtos que a **quantidade** está abaixo do **estoque_minimo**, que é 10 unidades               
            
