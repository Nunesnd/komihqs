document.addEventListener('DOMContentLoaded', () => {
  console.log('JS carregado');
  const checkbox = document.getElementById('aceitarContrato');
  const campos = document.getElementById('camposAutor');

  if (!checkbox || !campos) {
    console.error('Elementos não encontrados');
    return;
  }

  checkbox.addEventListener('change', () => {
    console.log('Checkbox clicado. Estado:', checkbox.checked);
    campos.style.display = checkbox.checked ? 'block' : 'none';
  });
});

document.getElementById('confirmarAutor').addEventListener('click', async () => {
  const userId = localStorage.getItem('userId');
  const pseudonimo = document.getElementById('pseudonimo').value.trim();
  const bio = document.getElementById('bio').value.trim();

  if (!userId || !pseudonimo || !bio) {
    alert('Preencha todos os campos antes de confirmar.');
    return;
  }

  // Aqui começa a tentativa de envio real (apenas após confirmar visualmente)
  try {
    const resposta = await fetch('http://localhost:3000/authors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        pseudonimo: pseudonimo,
        bio: bio
      })
    });

    if (!resposta.ok) {
      throw new Error('Erro ao enviar dados de autor');
    }

    // Redirecionar para home do autor
    window.location.href = 'homeAuthors.html';
  } catch (erro) {
    console.error('Erro ao registrar autor:', erro);
    alert('Houve um erro ao salvar os dados do autor.');
  }
});
