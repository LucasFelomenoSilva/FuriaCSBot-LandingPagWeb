document.getElementById("abrir-chat").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector(".card").style.display = "none";
  document.getElementById("chat-web").style.display = "block";

  iniciarChatFuria();
});

document.getElementById("voltar").addEventListener("click", function() {
  document.getElementById("chat-web").style.display = "none";
  document.querySelector(".card").style.display = "block";
  document.getElementById("messages").innerHTML = ""; 
  document.getElementById("opcoes").innerHTML = "";   
});

function iniciarChatFuria() {
  const messages = document.getElementById("messages");
  const opcoes = document.getElementById("opcoes");

  messages.innerHTML = `<div id="digitando" class="bot-message"><em>Bot está digitando...</em></div>`;

  setTimeout(() => {
    document.getElementById("digitando").remove();
    messages.innerHTML += `
      <div class="bot-message">
        <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
        👋 Bem-vindo ao ChatWeb FURIA!
      </div>`;

    setTimeout(() => {
      messages.innerHTML += `
        <div class="bot-message">
          <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
          Aqui você pode ver o ranking, os jogadores e a agenda de jogos.
        </div>`;
      mostrarOpcoes();
    }, 1500);
  }, 1200);
}

function responder(acao) {
  const messages = document.getElementById("messages");

  let resposta = "";
  if (acao === "ranking") {
    resposta = "Atualmente, a FURIA está no Top 10 mundial de CS! 🔥";
  } else if (acao === "jogadores") {
    resposta = "Time: KSCERATO, yuurih, arT, FalleN, chelo.";
  } else if (acao === "agenda") {
    resposta = "Nosso próximo jogo é sábado às 18h contra a Vitality!";
  }

  messages.innerHTML += `<div class="user-message"><strong>Você:</strong> ${acao}</div>`;
  messages.innerHTML += `
    <div class="bot-message">
      <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
      ${resposta}
    </div>`;
  messages.scrollTop = messages.scrollHeight;
}

async function enviarMensagem() {
  const input = document.getElementById("mensagem-usuario");
  const mensagem = input.value.trim();
  if (mensagem === "") return;

  const messages = document.getElementById("messages");
  messages.innerHTML += `<div class="user-message animated fade-in"><strong>Você:</strong> ${mensagem}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  messages.innerHTML += `<div class="bot-message animated fade-in" id="digitando-ia">
    <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
    Digitando...
  </div>`;

  try {
    const resposta = await fetch("http://localhost:5000/api/mensagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensagem })
    });

    const dados = await resposta.json();
    document.getElementById("digitando-ia").remove();

    messages.innerHTML += `<div class="bot-message animated fade-in">
      <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
      ${dados.resposta}
    </div>`;
  } catch (erro) {
    document.getElementById("digitando-ia").remove();
    messages.innerHTML += `<div class="bot-message animated fade-in">
      <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
      Erro ao buscar resposta 😢
    </div>`;
  }

  messages.scrollTop = messages.scrollHeight;
}

