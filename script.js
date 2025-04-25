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

  messages.innerHTML = `<div id="digitando"><em>Bot está digitando...</em></div>`;
  
  setTimeout(() => {
    document.getElementById("digitando").remove();
    messages.innerHTML += `<div><strong>Bot:</strong> 👋 Bem-vindo ao ChatWeb FURIA!</div>`;

    setTimeout(() => {
      messages.innerHTML += `<div><strong>Bot:</strong> Aqui você pode ver o ranking, os jogadores e a agenda de jogos.</div>`;
      mostrarOpcoes();
    }, 1500);
  }, 1200);
}

function mostrarOpcoes() {
  const opcoes = document.getElementById("opcoes");
  opcoes.innerHTML = `
    <button onclick="responder('ranking')">📈 Ver Ranking</button>
    <button onclick="responder('jogadores')">🎯 Jogadores</button>
    <button onclick="responder('agenda')">🗓️ Agenda de Jogos</button>
  `;
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

  messages.innerHTML += `<div><strong>Você:</strong> ${acao}</div>`;
  messages.innerHTML += `<div><strong>Bot:</strong> ${resposta}</div>`;
  messages.scrollTop = messages.scrollHeight;
}
