import data from '../data/dataset.js';
import { communicateWithOpenAI } from '../lib/openAIApi.js';

export function ChatGato(props) {

  const divChatGato = document.createElement("div");
  divChatGato.classList.add("div-Chat");

  for (let i = 0; i < data.length; i++) {
    if (props.id === data[i].id) {
      const gatito = data[i];
      divChatGato.innerHTML = ` 
      <h1 class="titulo-chat">Chatea con el Gatito ${gatito.name}</h1>
      <div class="contenedor-foto-chat">
        <div class="div-image-chat">
          <img class="imagen" src="${gatito.imageUrl}" alt="${gatito.id}">
          <p>💡 ¿Sabías que mi lugar de origen es ${gatito.facts.lugarDeOrigen}?</p>
        </div>
        <div class="contenedor-chat">
          <div id="mensajes"></div>
          <div class="contenedor-input">
              <textarea id="usuaria-input" placeholder="Escribe tu mensaje..." rows="3"></textarea>
              <button id="boton-enviar-input" class="boton-chat">▶</button>
          </div>
        </div>
      </div>`

      const mensajes = divChatGato.querySelector("#mensajes");
      const inputUsuaria = divChatGato.querySelector("#usuaria-input");
      const botonEnviarInput = divChatGato.querySelector("#boton-enviar-input");
      // primer mensaje del gato
      const primerParrafoGato = document.createElement("div");
      primerParrafoGato.classList.add("mensaje-gato");
      primerParrafoGato.innerHTML = `<p class="negrita-mensajes">Gatito ${gatito.id} 🐈</p>¡Pregúntame lo que quieras!`
      mensajes.appendChild(primerParrafoGato);

      botonEnviarInput.addEventListener("click", function () {
        const prompt = [
          {
            "role": "system",
            "content": "Toma el rol de un gatito de raza " + gatito.id + " y responde a la siguiente pregunta"
          },
          {
            "role": "user",
            "content": inputUsuaria.value
          }
        ];

        const parrafoGato = document.createElement("div");
        const parrafoUsuaria = document.createElement("div");
        parrafoGato.classList.add("mensaje-gato");
        parrafoUsuaria.classList.add("mensaje-usuaria");

        parrafoUsuaria.innerHTML = `<p class="negrita-mensajes">Tú 👩🏻</p> ${inputUsuaria.value}`;
        parrafoGato.innerHTML = "Escribiendo...";

        communicateWithOpenAI(prompt)
          .then(response => {
            parrafoGato.innerHTML = `<p class="negrita-mensajes">Gatito ${gatito.id} 🐈</p> ${response}`;
            // mensajeGato.innerHTML = response;
            // console.log("Respuesta de OpenAI:", response);
          })
          .catch(error => {
            // return error;
            console.error("Error al comunicarse con OpenAI:", error);
            parrafoGato.innerHTML = `<p class="negrita-mensajes">Gatito ${gatito.id} 🐈</p> No puedo hablar ahora mismo, por favor intenta más tarde. ¡Miau! 🐾`;
          });

        mensajes.appendChild(parrafoUsuaria);
        mensajes.appendChild(parrafoGato);

        inputUsuaria.value = "";

      });

    }
  }

  return divChatGato;
}