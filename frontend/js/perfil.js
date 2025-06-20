const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
  window.location.href = "login.html";
} else {
  const perfilDiv = document.getElementById("perfil");
  perfilDiv.innerHTML = `
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Nome:</strong> ${usuario.name}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Deseja publicar HQs:</strong> ${usuario.is_company ? 'Sim' : 'Não'}</p> 
  `;
}

const editarBtn = document.getElementById("editarBtn"); // Obter a referência do botão
if (editarBtn) { // Verificar se o botão existe
  editarBtn.addEventListener("click", () => {
    window.location.href = "editarPerfil.html";
  });
}
