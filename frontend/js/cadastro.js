document.getElementById('formCadastro').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede recarregamento da página

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        password: senha
      })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      document.getElementById('mensagem').innerText = 'Usuário cadastrado com sucesso!';
      document.getElementById('formCadastro').reset();
    } else {
      document.getElementById('mensagem').innerText = resultado.error || 'Erro ao cadastrar usuário.';
    }

  } catch (erro) {
    console.error('Erro ao cadastrar:', erro);
    document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor.';
  }
});
