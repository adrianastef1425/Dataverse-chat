import Home from './views/Home.js';
import ChatGato from './views/ChatGato.js';
import GatoInfo from './views/GatoInfo.js';
import ChatGrupal from './views/ChatGrupal.js';
import ErrorGatuno from './views/ErrorGatuno.js';
import { setRootEl, setRoutes, onURLChange } from './router.js';
import {/*getApiKey, */setApiKey} from './lib/apiKey.js'

const routes = { 
  '/': Home,
  '/chatGato': ChatGato,
  '/chatGrupal': ChatGrupal,
  '/gatoInfo': GatoInfo,
  '/errorGatuno': ErrorGatuno,
};

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  setRootEl(document.querySelector("#root")); // rootEl = el
  onURLChange(window.location)
});

//Navegar hacia atrás o adelante de acuerdo al historial del navegador
window.addEventListener("popstate", () => {
  onURLChange(window.location);
});

const botonAPIKey = document.querySelector("#boton-apikey"); // boton que abre el form
const popupAPIKey = document.querySelector("#popup-apikey"); // div escondido que contiene el form
const botonGuardarAPIKey = document.querySelector("#boton-guardar-apikey"); // boton que guarda el apikey
const inputAPIKey = document.querySelector("#input-apikey"); // campo de texto donde se ingresa el apikey

botonAPIKey.addEventListener("click", function () {
  popupAPIKey.style.display = "flex";
  popupAPIKey.style.flexDirection = "column";
});

botonGuardarAPIKey.addEventListener("click", function () {
  setApiKey(inputAPIKey.value);
  // getApiKey();
  popupAPIKey.style.display = "none";
});

const cerrarPopup = document.querySelector("#cerrar-popup-apikey") // boton cerrar div popup
cerrarPopup.addEventListener("click", function() {
  popupAPIKey.style.display = "none";
})
