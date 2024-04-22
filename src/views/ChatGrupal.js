import data from '../data/dataset.js';
import { communicateWithOpenAI } from '../lib/openAIApi.js';
import { navigateTo } from '../router.js';

function ChatGrupal() {

  const divChatGrupal = document.createElement("div");
  divChatGrupal.classList.add("div-Chat");
  divChatGrupal.innerHTML = `
    <div class="contenedor-foto-chat">
      <div class="titulo-boton">
        <button id="volver-home" class="boton-chat">◀︎</button>
        <h1 class="titulo-chat">Chatea con todos los gatos</h1>
        <div class="div-vacio-apikey"></div>  
      </div>
      <div id="imagenes-chat"></div>
      <div class="contenedor-chat">
        <div id="mensajes"></div>
        <div class="contenedor-input">
            <textarea id="usuaria-input" placeholder="Escribe tu mensaje..." rows="3"></textarea>
            <button id="boton-enviar-input" class="boton-chat">▶</button>
        </div>
      </div>
    </div>`

  const imagenesChat = divChatGrupal.querySelector("#imagenes-chat");

  const volverHome = divChatGrupal.querySelector("#volver-home");
  volverHome.addEventListener("click", function () {
    navigateTo("/");
  })

  data.forEach(gatito => {
    imagenesChat.innerHTML += `<img class="imagen-chat-grupal" src="${gatito.imageUrl}" alt="${gatito.id}"></img>`
  });

  const mensajes = divChatGrupal.querySelector("#mensajes");
  const inputUsuaria = divChatGrupal.querySelector("#usuaria-input");
  const botonEnviarInput = divChatGrupal.querySelector("#boton-enviar-input");
  // primer mensaje del gato
  const primerParrafoGato = document.createElement("div");
  primerParrafoGato.classList.add("mensaje-gato");
  primerParrafoGato.innerHTML = `<p class="negrita-mensajes">Gatitos 🐈</p>¡Pregúntanos lo que quieras!`
  mensajes.appendChild(primerParrafoGato);

  botonEnviarInput.addEventListener("click", function () {
    const inputTexto = inputUsuaria.value.trim();
    if (inputTexto !== "") {
      const parrafoUsuaria = document.createElement("div");
      parrafoUsuaria.classList.add("mensaje-usuaria");
      parrafoUsuaria.innerHTML = `<p class="negrita-mensajes">Tú 👩🏻</p> ${inputTexto}`;
      mensajes.appendChild(parrafoUsuaria);

      const promesas = data.map(gatito => {
        const prompt = [
          {
            "role": "system",
            "content": "Toma el rol de un gatito de raza " + gatito.id + " y responde a la siguiente pregunta"
          },
          {
            "role": "user",
            "content": inputTexto
          }
        ];

        return communicateWithOpenAI(prompt)
          .then(response => {
            return {
              idParrafo: `Gatito ${gatito.id} 🐈`,
              respuestaParrafo: response
            };
          })
          .catch(error => {
            console.error("Error al comunicarse con OpenAI:", error);
            return {
              idParrafo: `Gatito ${gatito.id} 🐈`,
              respuestaParrafo: "No puedo hablar ahora mismo, por favor intenta más tarde. ¡Miau! 🐾"
            };
          });
      });

      Promise.all(promesas)
        .then(responses => {
          responses.forEach(response => {
            const parrafoGato = document.createElement("div");
            parrafoGato.classList.add("mensaje-gato");
            parrafoGato.innerHTML = `<p class="negrita-mensajes">${response.idParrafo}</p> ${response.respuestaParrafo}`;
            mensajes.appendChild(parrafoGato);
          });
        });

    }

    inputUsuaria.value = "";
  });

  return divChatGrupal;
}

export default ChatGrupal;
