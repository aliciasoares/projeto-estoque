document.getElementById("formCadastroProduto").addEventListener("submit", async (event) => {
    event.preventDefault(); 

    const formData = {
        nome: document.getElementById("nome").value,
        marca: document.getElementById("marca").value,
        volume: document.getElementById("volume").value,
        tipo_embalagem: document.getElementById("tipo_embalagem").value,
        aplicacao: document.getElementById("aplicacao").value,
        estoque_minimo: document.getElementById("estoque_minimo").value
    };

    try {
        const response = await fetch("http://localhost:3001/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("mensagemStatus").textContent = result.Msg;
            document.getElementById("mensagemStatus").classList.add("success");
        } else {
            document.getElementById("mensagemStatus").textContent = result.Msg || "Erro ao cadastrar produto.";
            document.getElementById("mensagemStatus").classList.add("error");
        }
    } catch (error) {
        console.error("Erro ao enviar requisição:", error);
        document.getElementById("mensagemStatus").textContent = "Erro ao conectar com o servidor.";
        document.getElementById("mensagemStatus").classList.add("error");
    }
});