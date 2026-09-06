const telaMarca = document.getElementById("tela-marca");
const telaEnvelope = document.getElementById("tela-envelope");
const telaAbertura = document.getElementById("tela-abertura");
const telaConvite = document.getElementById("tela-convite");
const botaoEnvelope = document.getElementById("abrir-envelope");
const musica = document.getElementById("musica");

const btnLocal = document.getElementById("btn-local");
const btnConfirmar = document.getElementById("btn-confirmar");
const controleMusica = document.getElementById("controle-musica");

const modal = document.getElementById("modal-confirmacao");
const fecharModal = document.getElementById("fechar-modal");
const vaiSim = document.getElementById("vai-sim");
const vaiNao = document.getElementById("vai-nao");

let abrindo = false;

// Mostra a assinatura da marca rapidamente antes do envelope.
setTimeout(() => {
  if (telaMarca) {
    telaMarca.classList.add("saindo");
    setTimeout(() => telaMarca.remove(), 500);
  }
}, 2300);


botaoEnvelope.addEventListener("click", () => {
  if (abrindo) return;
  abrindo = true;

  // O toque no envelope libera o áudio nos celulares.
  musica.volume = 0;
  musica.play().then(() => {
    let volume = 0;
    const fade = setInterval(() => {
      volume += 0.025;
      musica.volume = Math.min(volume, 0.35);
      if (volume >= 0.35) clearInterval(fade);
    }, 80);
  }).catch(() => {});

  telaEnvelope.classList.add("abrindo");
  telaAbertura.classList.add("ativa");

  setTimeout(() => {
    telaEnvelope.classList.remove("ativa");
  }, 80);

  setTimeout(() => {
    telaConvite.classList.add("ativa");
    telaConvite.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      telaAbertura.classList.remove("ativa");
    }, 650);
  }, 2050);

  setTimeout(() => {
    controleMusica.classList.add("visivel");
  }, 3200);
});

// ================================
// CONTAGEM REGRESSIVA
// ================================
// Data do convite: 22 de novembro de 2026, às 14h30.
const contadorTempo = document.getElementById("contador-tempo");
const dataFesta = new Date("2026-11-22T14:30:00-03:00");

function atualizarContador() {
  const agora = new Date();
  let diferenca = dataFesta.getTime() - agora.getTime();

  if (diferenca <= 0) {
    contadorTempo.textContent = "É hoje! 🌸";
    return;
  }

  const dias = Math.floor(diferenca / 86400000);
  diferenca %= 86400000;

  const horas = Math.floor(diferenca / 3600000);
  diferenca %= 3600000;

  const minutos = Math.floor(diferenca / 60000);
  diferenca %= 60000;

  const segundos = Math.floor(diferenca / 1000);

  contadorTempo.textContent =
    `${dias} dias • ${String(horas).padStart(2,"0")}h • ` +
    `${String(minutos).padStart(2,"0")}min • ${String(segundos).padStart(2,"0")}s`;
}

atualizarContador();
setInterval(atualizarContador, 1000);

// Google Maps — link fornecido.
btnLocal.addEventListener("click", () => {
  window.open("https://maps.app.goo.gl/MqdbxyPYWeMEmwoy9", "_blank", "noopener");
});

// Abre confirmação.
btnConfirmar.addEventListener("click", () => {
  modal.classList.add("aberto");
  modal.setAttribute("aria-hidden", "false");
});

function fecharConfirmacao() {
  modal.classList.remove("aberto");
  modal.setAttribute("aria-hidden", "true");
}

fecharModal.addEventListener("click", fecharConfirmacao);

modal.addEventListener("click", (event) => {
  if (event.target === modal) fecharConfirmacao();
});

// WhatsApp de teste.
function abrirWhatsApp(mensagem) {
  const telefone = "5511942266695";
  const url = "https://wa.me/" + telefone + "?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank", "noopener");
}

vaiSim.addEventListener("click", () => {
  fecharConfirmacao();
  abrirWhatsApp("Olá! Confirmo minha presença no aniversário de 1 aninho da Luna!");
});

vaiNao.addEventListener("click", () => {
  fecharConfirmacao();
  abrirWhatsApp("Olá! Infelizmente não poderei comparecer ao aniversário de 1 aninho da Luna.");
});

// Controle da música.
controleMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play().catch(() => {});
    controleMusica.textContent = "♫";
    controleMusica.setAttribute("aria-label", "Pausar música");
  } else {
    musica.pause();
    controleMusica.textContent = "×";
    controleMusica.setAttribute("aria-label", "Tocar música");
  }
});
