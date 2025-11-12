// necessário instalar essas dependencias antes pelo terminal npm 

const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors') 

// configurações do banco de dados (com os dados que aparecem antes de iniciar o heidi)
// conn seria o pool de conexões
const conn = mysql.createPool({ 
    host: "localhost", 
    user: "root",
    password: "", 
    database: "estoque" 
})

const app = express()
app.use(cors()) // isso vai habilitar o cors
app.use(express.json()) 

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`)
})

// rota de documentação
app.get("/", (req, res) => {
    res.json({
        documentacao: "API de Controle de Estoque de Produtos de Limpeza",
        rotas_disponiveis: {
            "/": "GET - Obtém todas as rotas disponíveis (esta documentação)",
            "/produtos": "POST - Cadastra um novo produto",
            "/produtos": "GET - Lista todos os produtos",
            "/estoque/entrada": "PUT - Registra entrada de estoque",
            "/estoque/saida": "PUT - Registra saída de estoque",    
            "/alertas": "GET - Produtos abaixo do estoque mínimo"  
        }
    })
}) 


// essa rota alimenta o estoque.html
app.get("/produtos", async (req, res) => {
    try {
        const sql = "SELECT * FROM produtos";
        // o pool (conn) vai retornar uma lista [rows, fields]
        const [produtos] = await conn.query(sql);

        // retorna todos os produtos encontrados (que o estoque.html espera)
        res.status(200).json(produtos);

    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        res.status(500).json({ Msg: "Erro interno ao buscar lista de produtos." });
    }
})

/
// cadastro (POST /produtos) 


app.post("/produtos", async (req, res) => {
    const { 
        nome, marca, volume, tipo_embalagem, aplicacao, estoque_minimo
    } = req.body

    const sql = `INSERT INTO produtos (
        nome, marca, volume, tipo_embalagem, aplicacao, estoque_minimo, quantidade
    ) VALUES (?, ?, ?, ?, ?, ?, 0)`

    try {
        const [result] = await conn.query(sql, [
            nome, marca, volume, tipo_embalagem, aplicacao, estoque_minimo
        ])
        
        res.status(201).json({ 
            Msg: "Produto cadastrado com sucesso", 
            id: result.insertId 
        })
    } catch (error) {
        console.error('ERRO CRÍTICO NO BANCO:', error)
        res.status(500).json({ Msg: "Erro interno ao cadastrar produto. Verifique a conexão MySQL." })
    }
})


// listar os alertas (GET /alertas) - para alertas.html

app.get("/alertas", async (req, res) => {
    try {
        // busca produtos onde a quantidade é menor que o estoque_minimo
        const sql = "SELECT * FROM produtos WHERE quantidade < estoque_minimo";
        const [alertas] = await conn.query(sql);

        res.status(200).json(alertas);

    } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        res.status(500).json({ Msg: "Erro interno ao buscar alertas de estoque." });
    }
})


app.put("/estoque/entrada", async (req, res) => {
    const { produto_id, quantidade, data_validade, responsavel } = req.body
    
   
    let connection 
    
    try {
        
        connection = await conn.getConnection() 
        
       
        await connection.beginTransaction() 
        
        const updateSql = "UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?"
        const logSql = `INSERT INTO movimentacoes_estoque (
            produto_id, tipo_movimentacao, quantidade, data_movimentacao, 
            data_validade, responsavel
        ) VALUES (?, 'ENTRADA', ?, UTC_TIMESTAMP(), ?, ?)`

        const [updateResult] = await connection.query(updateSql, [quantidade, produto_id]) 

        if (updateResult.affectedRows === 0) {
            await connection.rollback() 
            return res.status(404).json({ Msg: "Produto não encontrado para entrada" })
        }

        await connection.query(logSql, [
            produto_id, quantidade, data_validade, responsavel
        ])
        
       
        await connection.commit() 
        
        res.json({ 
            Msg: `Entrada de ${quantidade} unidades registrada com sucesso para o Produto ID: ${produto_id}` 
        })
        
    } catch (error) {
        console.error('Erro ao registrar entrada de estoque:', error)
        
        if (connection) { 
            await connection.rollback() 
        }
        
        res.status(500).json({ Msg: "Erro interno ao registrar entrada de estoque" })
        
    } finally {
      
        if (connection) { 
            connection.release() 
        }
    }
})

// rotas do put (registrar entrada e saida do estoque )
app.put("/estoque/saida", async (req, res) => {
    const { produto_id, quantidade, responsavel } = req.body
    
    let connection
    
    try {
        connection = await conn.getConnection()
        await connection.beginTransaction() 
        
        const checkStockSql = "SELECT quantidade FROM produtos WHERE id = ?"
        const updateSql = "UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?"
        const logSql = `INSERT INTO movimentacoes_estoque (
            produto_id, tipo_movimentacao, quantidade, data_movimentacao, responsavel
        ) VALUES (?, 'SAIDA', ?, UTC_TIMESTAMP(), ?)`

        const [rows] = await connection.query(checkStockSql, [produto_id])
        if (rows.length === 0) {
            await connection.rollback()
            return res.status(404).json({ Msg: "Produto não encontrado para saída" })
        }

        const estoque_atual = rows[0].quantidade

        if (estoque_atual < quantidade) {
            await connection.rollback()
            return res.status(400).json({ 
                Msg: `Estoque insuficiente. Disponível: ${estoque_atual}, Solicitado: ${quantidade}` 
            })
        }

        await connection.query(updateSql, [quantidade, produto_id])
        await connection.query(logSql, [produto_id, quantidade, responsavel])
        
        await connection.commit() 
        
        res.json({ 
            Msg: `Saída de ${quantidade} unidades registrada com sucesso para o Produto ID: ${produto_id}` 
        })
    } catch (error) {
        console.error('Erro ao registrar saída de estoque:', error)
        
        if (connection) { 
            await connection.rollback() 
        }
        
        res.status(500).json({ Msg: "Erro interno ao registrar saída de estoque" })
        
    } finally {
        if (connection) { 
            connection.release() 
        }
    }
})
