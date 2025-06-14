document.getElementById('confirmarExclusao').addEventListener('click', async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Usuário não autenticado.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}/ocultar`, {
      method: 'PUT',
    });

    if (response.ok) {
      alert('Conta excluída com sucesso.');
      localStorage.clear(); // limpa dados locais
      window.location.href = 'login.html';
    } else {
      alert('Erro ao excluir conta.');
    }
  } catch (error) {
    console.error('Erro ao excluir conta:', error);
    alert('Erro de rede ao tentar excluir conta.');
  }
});
