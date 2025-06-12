document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        document.getElementById('mensagem').innerText = 'Usuário cadastrado com sucesso!';
      } else {
        document.getElementById('mensagem').innerText = `Erro: ${data.error || 'Não foi possível cadastrar.'}`;
      }
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      document.getElementById('mensagem').innerText = 'Erro na comunicação com o servidor.';
    }
  });
});
