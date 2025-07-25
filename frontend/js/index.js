document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main-content");
    const userData = localStorage.getItem("user");

    if (!userData) {
        // Visitante
        main.innerHTML = `
      <section style="text-align: center; padding: 2rem;">
        <h1>Bem-vindo ao KomiHQ</h1>
        <p>Cadastre-se ou faça login para começar a ler HQs!</p>
      </section>
    `;
        return;
    }

    const user = JSON.parse(userData);

    console.log("usuario logado: ", user);
    console.log("usuario logado autor: ", user.is_author);
    console.log("usuario logado empresa: ", user.is_author);

    if (user.is_company) {
        main.innerHTML = `
      <section style="text-align: center; padding: 2rem;">
        <h1>Painel da Empresa</h1>
        <p>Gerencie suas publicações, obras e relatórios aqui.</p>
      </section>
    `;
    } else if (user.is_author) {
        main.innerHTML = `
      <section style="text-align: center; padding: 2rem;">
        <h1>Painel do Autor</h1>
        <p>Crie e gerencie suas HQs, veja seus leitores!</p>
      </section>
    `;
    } else {
        main.innerHTML = `
      <section style="display: flex; justify-content: center; align-items: center; height: 60vh;">
        <div style="width: 300px; height: 300px; background-color: #3498db; border-radius: 10px;"></div>
      </section>
    `;
    }
});
