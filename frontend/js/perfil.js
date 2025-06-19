const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
  window.location.href = "login.html";
} else {
  const perfilDiv = document.getElementById("perfil");
  perfilDiv.innerHTML = `
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Nome:</strong> ${usuario.name}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
  `;
}

document.getElementById("editarBtn").addEventListener("click", () => {
  window.location.href = "editarPerfil.html";
});
