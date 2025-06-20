document.addEventListener('DOMContentLoaded', () => {
  const userId = localStorage.getItem('userId');
  const form = document.getElementById('editForm');
  const deleteBtn = document.getElementById('deleteBtn');
  const mensagem = document.getElementById('mensagem');
  const segurancaBtn = document.getElementById('segurancaBtn'); 

  if (!userId) {
    alert('Usuário não logado.');
    window.location.href = 'login.html';
    return;
  }

  // Carregar dados do usuário
  fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('name').value = data.name
      document.getElementById('email').value = data.email;
      document.getElementById('is_company').checked = data.is_company; // novo campo
    })
    .catch(err => {
      console.error('Erro ao carregar perfil:', err);
      mensagem.textContent = 'Erro ao carregar dados.';
    });

  // Atualizar perfil
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      is_company: document.getElementById('is_company').checked 
    };

    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erro ao atualizar');

      // --- Ponto CRÍTICO: Sobrescrever os dados no localStorage ---
      // 1. Recebe a resposta do backend. O backend (PUT /users/:id) DEVE retornar { user: {...} }
      const updatedResponseData = await res.json(); 
      
      // 2. Converte o objeto 'user' atualizado para string JSON e salva no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(updatedResponseData.user)); 
      // -----------------------------------------------------------


      mensagem.textContent = 'Perfil atualizado com sucesso.';
      setTimeout(() => window.location.href = 'perfil.html', 2000);
    } catch (err) {
      console.error(err);
      mensagem.textContent = 'Erro ao atualizar perfil.';
    }
  });

  segurancaBtn.addEventListener('click', () => {
    window.location.href = 'seguranca.html';
  });

  // Redireciona para confirmar exclusão
  deleteBtn.addEventListener('click', () => {
    window.location.href = 'confirmarExclusao.html';
  });
});


