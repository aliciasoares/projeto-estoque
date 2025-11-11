document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const form = event.target;
    const usuario = form.usuario.value;
    const senha = form.senha.value;
    const statusElement = document.getElementById('mensagemStatus');
    
    statusElement.textContent = '';
    statusElement.className = 'status-message'; 

    const usuario_correto = "admin";
    const senha_correta = "123";

    if (usuario === usuario_correto && senha === senha_correta) {
        
        statusElement.textContent = 'Acesso liberado. Redirecionando...';
        statusElement.classList.add('success');
        
  
        setTimeout(() => {
            window.location.href = 'cadastro.html'; 
        }, 1000); 

    } else {
     
        statusElement.textContent = ' Usuário ou senha incorretos.';
        statusElement.classList.add('error');
    }
});