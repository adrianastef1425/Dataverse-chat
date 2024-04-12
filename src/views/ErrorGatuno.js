import { navigateTo } from '../router.js';

export function ErrorGatuno() {
  const divError = document.createElement('div');
  divError.innerHTML = `
    <div>
      <button id="volver-home">Ir al inicio</button>
      <h1 class="titulo-chat">Error Gatuno 404 🐾</h1>
    </div> 
    <img src="images/gato-error.jpg" alt="error">
    `

  const volverHome = divError.querySelector("#volver-home");
  volverHome.addEventListener("click", function () {
    navigateTo("/");
  })

  return divError;
}