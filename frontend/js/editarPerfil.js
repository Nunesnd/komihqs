document.addEventListener('DOMContentLoaded', () => {
  const userId = localStorage.getItem('userId');
  const form = document.getElementById('editForm');
  const deleteBtn = document.getElementById('deleteBtn');
  const mensagem = document.getElementById('mensagem');

  if (!userId) {
    alert('Usuário não logado.');
    window.location.href = 'login.html';
    return;
  }

  // Carregar dados do usuário
  fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('name').value = data.name;
      document.getElementById('email').value = data.email;
      document.getElementById('autor').checked = data.is_author; // novo campo
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
      is_author: document.getElementById('autor').checked
    };

    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Erro ao atualizar');

      mensagem.textContent = 'Perfil atualizado com sucesso.';
      setTimeout(() => window.location.href = 'perfil.html', 2000);
    } catch (err) {
      console.error(err);
      mensagem.textContent = 'Erro ao atualizar perfil.';
    }
  });

  // Redireciona para confirmar exclusão
  deleteBtn.addEventListener('click', () => {
    window.location.href = 'confirmarExclusao.html';
  });
});
