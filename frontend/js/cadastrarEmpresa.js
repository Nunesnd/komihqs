// frontend/js/cadastrarEmpresa.js
document.getElementById('empresaForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const userId = localStorage.getItem('userId');

  if (!userId) {
    alert('Usuário não autenticado. Faça login novamente.');
    return;
  }

  const data = {
    userId: parseInt(userId),
    name: document.getElementById('nome').value,
    description: document.getElementById('descricao').value,
    website: document.getElementById('website').value || null
  };

  console.log("Dados sendo enviados:", data);

  try {
    const response = await fetch('http://localhost:3000/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Empresa cadastrada com sucesso!');
      window.location.href = "/pages/editarPerfil.html";
    } else {
      const erro = await response.text();
      console.error('Erro ao cadastrar empresa:', erro);
      alert('Erro ao cadastrar empresa.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar com o servidor.');
  }
});
