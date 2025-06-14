document.addEventListener('DOMContentLoaded', () => {
  const userId = localStorage.getItem('userId');
  const form = document.getElementById('senhaForm');
  const mensagem = document.getElementById('mensagem');

  if (!userId) {
    alert('Usuário não logado.');
    window.location.href = 'login.html';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (novaSenha !== confirmarSenha) {
      mensagem.textContent = 'As senhas não coincidem.';
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: novaSenha })
      });

      if (!res.ok) throw new Error('Erro ao atualizar a senha');

      mensagem.textContent = 'Senha atualizada com sucesso.';
      setTimeout(() => window.location.href = 'editarPerfil.html', 2000);
    } catch (err) {
      console.error(err);
      mensagem.textContent = 'Erro ao atualizar a senha.';
    }
  });
});
