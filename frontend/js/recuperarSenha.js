// frontend/js/recuperaSenha.js
document.getElementById('recuperaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem');

    console.log('Recebido1:', { name, email }); 

    try {
        const res = await fetch('http://localhost:3000/users/recuperar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

    console.log('Recebido2:', { name, email }); 

        if (!res.ok) throw new Error('Usuário não encontrado');

        const data = await res.json();
        console.log('Resultado da query AAA:', data);
        localStorage.setItem('userId', data.id);
        window.location.href = 'seguranca.html';
    } catch (err) {
        console.error(err);
        mensagem.textContent = 'Nome ou email incorretos.';
    }
});
