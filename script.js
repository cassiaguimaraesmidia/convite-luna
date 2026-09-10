const telaInicial = document.getElementById("tela-inicial");
const telaVideo = document.getElementById("tela-video");
const telaConvite = document.getElementById("tela-convite");
const botaoInicial = document.getElementById("abrir-convite");
const videoAbertura = document.getElementById("video-abertura");
const musica = document.getElementById("musica");

const btnLocal = document.getElementById("btn-local");
const btnConfirmar = document.getElementById("btn-confirmar");
const controleMusica = document.getElementById("controle-musica");

const modal = document.getElementById("modal-confirmacao");
const fecharModal = document.getElementById("fechar-modal");
const vaiSim = document.getElementById("vai-sim");
const vaiNao = document.getElementById("vai-nao");

let abrindo = false;

const telaLogo = document.getElementById("tela-logo");

function mostrarArteInicial() {
  if (!telaLogo) {
    telaInicial.classList.add("ativa");
    telaInicial.setAttribute("aria-hidden", "false");
    return;
  }

  telaLogo.classList.add("saindo");
  setTimeout(() => {
    telaLogo.classList.remove("ativa");
    telaLogo.setAttribute("aria-hidden", "true");
    telaInicial.classList.add("ativa");
    telaInicial.setAttribute("aria-hidden", "false");
  }, 650);
}

setTimeout(mostrarArteInicial, 2400);


botaoInicial.addEventListener("click", () => {
  if (abrindo) return;
  abrindo = true;

  telaInicial.classList.remove("ativa");
  telaVideo.classList.add("ativa");
  telaVideo.setAttribute("aria-hidden", "false");

  // O clique do usuário libera o áudio do próprio vídeo nos celulares.
  videoAbertura.currentTime = 0;
  videoAbertura.muted = false;

  const iniciarVideo = videoAbertura.play();
  if (iniciarVideo) {
    iniciarVideo.catch(() => {
      // Fallback: se o navegador bloquear áudio, a abertura ainda roda.
      videoAbertura.muted = true;
      videoAbertura.play().catch(() => {});
    });
  }
});

videoAbertura.addEventListener("ended", () => {
  telaVideo.classList.remove("ativa");
  telaVideo.setAttribute("aria-hidden", "true");

  // A segunda arte entra suavemente, saindo visualmente do envelope.
  telaConvite.classList.add("ativa");
  telaConvite.setAttribute("aria-hidden", "false");

  iniciarMusicaSuave();

  setTimeout(() => {
    controleMusica.classList.add("visivel");
  }, 900);
});

function iniciarMusicaSuave() {
  if (!musica) return;
  musica.currentTime = 0;
  musica.volume = 0;

  musica.play().then(() => {
    let volume = 0;
    const passo = 0.025;
    const fade = setInterval(() => {
      volume += passo;
      musica.volume = Math.min(volume, 0.35);
      if (volume >= 0.35) clearInterval(fade);
    }, 100);
  }).catch(() => {});
}

// ================================
// CONTAGEM REGRESSIVA
// ================================
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

// Google Maps
btnLocal.addEventListener("click", () => {
  window.open("https://maps.app.goo.gl/MqdbxyPYWeMEmwoy9", "_blank", "noopener");
});

// Confirmação
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

// WhatsApp oficial
function abrirWhatsApp(mensagem) {
  const telefone = "5511998268899";
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

// Controle da música
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
