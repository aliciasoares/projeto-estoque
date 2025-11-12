# Estrutura de dados e testes JSON (testados no ThunderClient)
# GET 
## Endereço: localhost:3001/produtos
```json 
{
    "nome": "",
    "marca": "",
    "volume": "",
    "tipo_embalagem": "",
    "aplicacao": "",
    "estoque_minimo": 10
}
```


# POST
## Endereço: localhost:3001/produtos
```json 
{
    "nome": "sabão em pó",
    "marca": "OMO",
    "volume": "5 Kg",
    "tipo_embalagem": "saco plástico",
    "aplicacao": "industrial",
    "estoque_minimo": 10
}

{
    "nome": "Detergente Neutro",
    "marca": "Limpa Fácil",
    "volume": "500ml",
    "tipo_embalagem": "Plástico",
    "aplicacao": "domestica",
    "estoque_minimo": 10
}

```
# PUT 
## Endereço: localhost:3001/estoque/entrada
```json
{
    "produto_id": 1, 
    "quantidade": 30,
    "data_validade": "2026-03-30",
    "responsavel": "Alice Recebimento"
}

{
    "produto_id": 3, 
    "quantidade": 30,
    "data_validade": "2026-03-30",
    "responsavel": "João"
}
```
# PUT
## Endereço: localhost:3001/estoque/saida
```json
{
    "produto_id": 1, 
    "quantidade": 15,
    "responsavel": "setor de vendas"
}
```

# GET 
## Endereço: localhost:3001/alertas
### Resultado obtido:
```json
[
  {
    "id": 2,
    "nome": "Amaciante",
    "marca": "Downy",
    "volume": "5Kg",
    "tipo_embalagem": "plástico",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 4,
    "nome": "Sabonete Liquido",
    "marca": "Omo",
    "volume": "2L",
    "tipo_embalagem": "Plástico",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 5,
    "nome": "sabão em pó",
    "marca": "omo",
    "volume": "720g",
    "tipo_embalagem": "papelão",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 6,
    "nome": "sabão em pó",
    "marca": "omo",
    "volume": "720g",
    "tipo_embalagem": "papelão",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 7,
    "nome": "Detergente",
    "marca": "Limpol",
    "volume": "720g",
    "tipo_embalagem": "plástico",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 8,
    "nome": "Detergente",
    "marca": "omo",
    "volume": "720g",
    "tipo_embalagem": "plástico",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  },
  {
    "id": 9,
    "nome": "sabão em pó",
    "marca": "omo",
    "volume": "820g",
    "tipo_embalagem": "papelão",
    "aplicacao": "domestica",
    "quantidade": 0,
    "estoque_minimo": 10
  }
]
```
