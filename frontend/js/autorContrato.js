document.getElementById('aceiteContrato').addEventListener('change', function () {
  document.getElementById('formAutor').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('confirmarAutor').addEventListener('click', async () => {
  const userId = document.getElementById('userId').value;
  const pseudonimo = document.getElementById('pseudonimo').value;
  const bio = document.getElementById('bio').value;
  const token = localStorage.getItem('token');

  if (!pseudonimo || !bio) {
    alert('Preencha todos os campos.');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/author', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, pseudonimo, bio }),
    });

    if (resposta.ok) {
      alert('Agora você é um autor!');
      window.location.href = 'homeAuthor.html';
    } else {
      const erro = await resposta.json();
      console.error('Erro:', erro);
      alert('Erro ao se tornar autor.');
    }
  } catch (err) {
    console.error('Erro geral:', err);
    alert('Erro ao conectar com o servidor.');
  }
});
