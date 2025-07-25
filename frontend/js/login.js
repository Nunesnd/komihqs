document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Credenciais inválidas");

    const user = await response.json();

    // Armazenar dados do usuário (exemplo simples - para produção usar JWT/token)
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    localStorage.setItem('userId', user.id);

    // Redireciona para o perfil
    //window.location.href = "perfil.html";
    // Exemplo pós-login bem-sucedido:
    localStorage.setItem('user', JSON.stringify(user)); // ou token JWT se for o caso
    window.location.href = "../index.html";

  } catch (error) {
    document.getElementById("mensagem").textContent = "Erro ao fazer login: " + error.message;
  }
});
