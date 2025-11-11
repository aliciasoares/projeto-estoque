document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastroProduto');
    const statusElement = document.getElementById('mensagemStatus');
    const API_URL = 'http://localhost:3001/produtos'; 

    if (!form) {
        statusElement.textContent = 'Erro: Formulário não encontrado no HTML.';
        statusElement.classList.add('error');
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        statusElement.textContent = 'Enviando dados para a API...';
        statusElement.className = 'status-message'; 

     
        const dadosProduto = {
            nome: form.nome.value,
            marca: form.marca.value,
            volume: form.volume.value,
            tipo_embalagem: form.tipo_embalagem.value,
            aplicacao: form.aplicacao.value,
            estoque_minimo: parseInt(form.estoque_minimo.value, 10)
        };
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProduto)
        };

        try {
      
            const response = await fetch(API_URL, options);
            
       
            let resultado;
            try {
                resultado = await response.json();
            } catch (e) {
                
                console.error("API não retornou JSON. Status:", response.status);
                statusElement.textContent = `Erro da API: Resposta inválida. Status HTTP: ${response.status}`;
                statusElement.classList.add('error');
                return;
            }

            // 3. Verifica o Status HTTP
            if (response.ok) { 
                statusElement.textContent = ` Produto ID ${resultado.id} CADASTRADO com sucesso! Verifique o HeidiSQL.`;
                statusElement.classList.add('success');
                form.reset();
            } else {
                // Trata erros de requisição (4xx ou 5xx)
                statusElement.textContent = `Falha na API. Causa: ${resultado.Msg || resultado.message || 'Erro Desconhecido'}`;
                statusElement.classList.add('error');
            }

        } catch (error) {
            // 4. Trata erros de rede (Se a API Node.js não estiver rodando)
            console.error('Erro de conexão/rede:', error);
            statusElement.textContent = 'Erro  de Conexão.';
            statusElement.classList.add('error');
        }
    });
});