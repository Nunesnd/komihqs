// Função para carregar um componente HTML externo
function carregarComponente(id, caminho) {
    fetch(caminho)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${caminho}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(id).innerHTML = html;
        })
        .catch(error => {
            console.error(error);
        });
}

// Carrega cabeçalho e rodapé ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    carregarComponente("header", "./components/header.html");
    carregarComponente("footer", "./components/footer.html");
});