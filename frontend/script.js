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
});

document.getElementById("mensagem-usuario").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagem();
  }
});

function iniciarChatFuria() {
  const messages = document.getElementById("messages");
  messages.innerHTML = `<div id="digitando" class="bot-message"><em>Bot está digitando</em></div>`;

  setTimeout(() => {
    document.getElementById("digitando").remove();
    messages.innerHTML += `
      <div class="bot-message">
        <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
        👋 Salve, torcedor da FURIA! Preparado pra dominar o servidor com a gente? 🐺
      </div>`;

    setTimeout(() => {
      messages.innerHTML += `
        <div class="bot-message">
          <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
          Me mande uma pergunta ou escolha uma das opções abaixo: 👇
        </div>`;
      mostrarOpcoes();
    }, 1500);
  }, 1200);
}

function mostrarOpcoes() {
  const messages = document.getElementById("messages");

  const opcoes = [
    "Qual é o ranking atual da FURIA",
    "Quem são os jogadores da equipe?",
    "Quando é o próximo jogo da FURIA?"
  ];

  opcoes.forEach((texto, index) => {
    const delay = index * 300; 
    setTimeout(() => {
      messages.innerHTML += `
        <div class="bot-message sugestao" onclick="enviarSugestao('${texto}')">
          <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
          ${texto}
        </div>`;
      messages.scrollTop = messages.scrollHeight;
    }, delay);
  });
}


async function enviarMensagem() {
  const input = document.getElementById("mensagem-usuario");
  const mensagem = input.value.trim();
  if (mensagem === "") return;

  const messages = document.getElementById("messages");
  messages.innerHTML += `<div class="user-message animated fade-in"> ${mensagem}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  messages.innerHTML += `<div class="bot-message animated fade-in" id="digitando-ia">
    <img src="https://upload.wikimedia.org/wikipedia/pt/f/f9/Furia_Esports_logo.png" class="bot-icon">
    Digitando...
  </div>`;

  try {
    const resposta = await fetch("https://furiacsbot-landingpagweb-production.up.railway.app/api/mensagem", {
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

function enviarSugestao(texto) {
  const input = document.getElementById("mensagem-usuario");
  input.value = texto;
  enviarMensagem();
}
