// frontend/js/seguranca.js
document.addEventListener('DOMContentLoaded', () => {
  const userId = localStorage.getItem('userId');
  const trocarSenhaForm = document.getElementById('trocarSenhaForm');
  const novaSenhaInput = document.getElementById('novaSenha');
  const confirmarSenhaInput = document.getElementById('confirmarSenha');
  const mensagem = document.getElementById('mensagem');
  const voltarPerfilBtn = document.getElementById('voltarPerfilBtn'); // Botão para voltar

  if (!userId) {
    alert('Usuário não logado. Redirecionando para o login.');
    window.location.href = 'login.html';
    return;
  }

  // Listener para o formulário de troca de senha
  trocarSenhaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaSenha = novaSenhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    // Validação básica no frontend
    if (novaSenha === '' || confirmarSenha === '') {
      mensagem.textContent = 'Por favor, preencha ambos os campos de senha.';
      mensagem.style.color = 'orange'; // Cor para avisos
      return;
    }

    if (novaSenha !== confirmarSenha) {
      mensagem.textContent = 'As senhas não coincidem. Por favor, digite novamente.';
      mensagem.style.color = 'red'; // Cor para erros
      return;
    }

    if (novaSenha.length < 6) { // Exemplo de validação de comprimento mínimo
      mensagem.textContent = 'A senha deve ter pelo menos 6 caracteres.';
      mensagem.style.color = 'orange';
      return;
    }

    try {
      // Requisição PUT para o backend para atualizar apenas a senha
      const res = await fetch(`http://localhost:3000/users/${userId}/password`, { // Nova rota no backend!
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: novaSenha })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao atualizar a senha.');
      }

      mensagem.textContent = 'Senha atualizada com sucesso!';
      mensagem.style.color = 'green'; // Cor para sucesso
      novaSenhaInput.value = ''; // Limpa os campos
      confirmarSenhaInput.value = '';

    } catch (err) {
      console.error('Erro na troca de senha:', err);
      mensagem.textContent = `Erro ao trocar senha: ${err.message}`;
      mensagem.style.color = 'red';
    }
  });

  // Listener para o botão de voltar ao perfil
  if (voltarPerfilBtn) {
    voltarPerfilBtn.addEventListener('click', () => {
      window.location.href = 'perfil.html';
    });
  }
});