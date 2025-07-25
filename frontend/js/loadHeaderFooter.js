// Função para carregar um componente HTML externo
function carregarComponente(id, caminho, callback) {
    fetch(caminho)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${caminho}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback(); // Executa função extra após carregar (como personalizar cabeçalho)
        })
        .catch(error => {
            console.error(error);
        });
}

// Personaliza o cabeçalho após o carregamento
function personalizarCabecalho() {
  const userData = localStorage.getItem("user");
  const headerActions = document.getElementById("header-actions");

  if (!headerActions) return;

  if (userData) {
    const user = JSON.parse(userData);

    // Limpa os botões Login/Cadastrar
    headerActions.innerHTML = `
      <div id="user-menu-container" style="position: relative; cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #3498db;"></div>
          <span id="user-name">${user.name}</span>
        </div>
        <div id="user-dropdown" style="display: none; position: absolute; top: 120%; right: 0; background-color: white; border: 1px solid #ccc; box-shadow: 0 2px 6px rgba(0,0,0,0.1); border-radius: 4px; z-index: 10;">
          <a href="/pages/editarPerfil.html" style="display: block; padding: 0.5rem 1rem; text-decoration: none; color: black;">Editar Perfil</a>
          <button id="logout-btn" style="width: 100%; padding: 0.5rem 1rem; text-align: left; background: none; border: none; cursor: pointer;">Sair</button>
        </div>
      </div>
    `;

    const menuContainer = document.getElementById("user-menu-container");
    const dropdown = document.getElementById("user-dropdown");

    // Alternar menu com clique
    menuContainer.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Logoff
    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/index.html";
    });

    // Fecha dropdown se clicar fora
    document.addEventListener("click", (event) => {
      if (!menuContainer.contains(event.target)) {
        dropdown.style.display = "none";
      }
    });
  }
}

// Carrega cabeçalho e rodapé ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    carregarComponente("header", "./components/header.html", personalizarCabecalho);
    carregarComponente("footer", "./components/footer.html");
});
