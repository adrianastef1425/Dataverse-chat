import { Home } from './views/Home.js';
import { ChatGato } from './views/ChatGato.js';
import { GatoInfo } from './views/GatoInfo.js';
import { ChatGrupal } from './views/ChatGrupal.js';
import { ErrorGatuno } from './views/ErrorGatuno.js';
import { setRootEl, setRoutes, onURLChange } from './router.js';
import {getApiKey, setApiKey} from './lib/apiKey.js'

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

window.addEventListener("popstate", () => {
  onURLChange(window.location);
});

const botonAPIKey = document.querySelector("#boton-apikey");
const popupAPIKey = document.querySelector("#popup-apikey");
const botonGuardarAPIKey = document.querySelector("#boton-guardar-apikey");
const inputAPIKey = document.querySelector("#input-apikey");

botonAPIKey.addEventListener("click", function () {
  popupAPIKey.style.display = "block";
});

botonGuardarAPIKey.addEventListener("click", function () {
  setApiKey(inputAPIKey.value);
  getApiKey();
  popupAPIKey.style.display = "none";
});
