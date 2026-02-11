function scrollProdutos(direction) {
  const container = document.querySelector('.produtos-container');
  const cardWidth = container.offsetWidth; // Largura exata do container
  
  if (direction === 'next') {
    container.scrollLeft += cardWidth;
  } else {
    container.scrollLeft -= cardWidth;
  }
}

// Gerador de neve
function criarNeve() {
  const neveContainer = document.querySelector(".neve-container");
  const quantidade = 50;

  for (let i = 0; i < quantidade; i++) {
    const floco = document.createElement("div");
    floco.classList.add("floco-neve");
    floco.innerHTML = "❄";
    floco.style.left = Math.random() * 100 + "%";
    floco.style.fontSize = Math.random() * 1.5 + 0.5 + "em";
    floco.style.animationDuration = Math.random() * 3 + 5 + "s";
    floco.style.animationDelay = Math.random() * 5 + "s";
    floco.style.opacity = Math.random() * 0.7 + 0.3;
    neveContainer.appendChild(floco);
  }
}

// Iniciar neve quando a página carregar
window.addEventListener("load", criarNeve);