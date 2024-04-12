import data from '../data/dataset.js';
import { filterData, filterDataObj, sortData, sortDataPrice, computeStats } from '../lib/dataFunctions.js';
import { navigateTo } from '../router.js';

/////////////////////////////////view.js////////////////////////////////////
function renderItems(gatos) {
  const nuevoUl = document.createElement("ul");
  gatos.forEach(onlyCat => {
    const nuevoLi = document.createElement("li"); // crear la etiqueta li para un gato
    nuevoLi.classList.add("tarjeta"); // agrega la clase "tarjeta" al li
    nuevoLi.setAttribute("itemscope", true);//<li itemscope></li> 
    nuevoLi.setAttribute("itemtype", "RazasDeGatos");//<li itemtype="RazasDeGatos"></li>
    nuevoLi.innerHTML = `<img src="${onlyCat.imageUrl}" alt="${onlyCat.id}">
    <h2 itemprop=sort-order>${onlyCat.name}</h2>
    <p itemprop="shortDescription" class="descripcion">${onlyCat.shortDescription}</p>
    <hr/>
    <p><span class="datos">✦ Tamaño:</span> <span itemprop="tamanoGato">${onlyCat.facts["tamanoGato"]}</span></p>
    <p><span class="datos">✦ Pelaje:</span> <span itemprop="pelajeGato">${onlyCat.facts["pelajeGato"]}</span></p>
    <p><span class="datos">✦ Esperanza de vida:</span> <span itemprop="esperanzaMax">${onlyCat.facts["esperanzaMax"]} años</span></p>
    <p><span class="datos">✦ Precio:</span> <span itemprop="precioCachorro">${onlyCat.facts["precioCachorro"]} dólares</span></p>
    <div class="div-botones-tarjetas">
      <button id="ver-info" class="boton-tarjeta">Más info</button>
      <button id="chat-gato" class="boton-tarjeta">Chatear</button>
    </div>`
    nuevoUl.appendChild(nuevoLi); // inserta la etiqueta li en la etiqueta ul
  });
  return nuevoUl;
}

export function Home(/*props*/) {
  const divHome = document.createElement('div');
  //////////////////////////////////////// index.html (DATAVERSE) ///////////////////////////
  divHome.innerHTML = `<header>
  <h1>Razas de gatos</h1>
  <h3>Las 24 razas de gatos más populares</h3>
  </header>
  <nav>
    <div class="div-menu-boton">
      <button class="menu-boton"> ☰ </button>
      <button class="cerrar-filtros"> ☰ </button>
    </div>
    <div class="menu-normal">
      <div class="div-select">
        <label for="pelajeGato">Filtrar por pelaje</label>
        <select name="pelajeGato" id="pelajeGato" data-testid="select-filter">
          <option value="pelo-corto">Pelo corto</option>
          <option value="pelo-semilargo">Pelo semilargo</option>
          <option value="pelo-largo">Pelo largo</option>
          <option value="sin-pelo">Sin pelo</option>
        </select>
      </div>
      <div class="div-select">
        <label for="personalidad">Filtrar por personalidad</label>
        <select name="personalidad" id="personalidad">
          <option value="tranquilo">Tranquilo</option>
          <option value="carinoso">Cariñoso</option>
          <option value="sociable">Sociable</option>
          <option value="energico">Enérgico</option>
          <option value="jugueton">Juguetón</option>
        </select>
      </div>
      <div class="div-select">
        <label for="orden">Ordenar</label>
        <select id="orden" name="sort-order" data-testid="select-sort">
          <option value="asc">Nombre (A-Z)</option>
          <option value="desc">Nombre (Z-A)</option>
          <option value="precio-asc">Precio (menor-mayor)</option>
          <option value="precio-desc">Precio (mayor-menor)</option>
        </select>
      </div>
      <span id="conteo">Resultados: 24</span>
      <button id="botonBorrar" class="botonMenu" data-testid="button-clear">Borrar filtros</button>
      <button id="stats" class="botonMenu">Estadísticas</button>
      <button id="chat-grupal" class="botonMenu">Chat Grupal</button>
    </div>
    
  </nav>
  <main>
    <div class="contenedor-estadisticas">
      <button class="boton-cerrar-estadisticas"> X </button>
      <div class="div-estadisticas"></div>
    </div>
    <div id="rootHome"></div>
  </main>
  <footer>
    <p>🐈‍⬛ 🐈‍⬛  Hecho por: Adriana y Flor 🐈‍⬛ 🐈‍⬛</p>
  </footer>`;

  //////////////////////////////////////// main.js (DATAVERSE) ///////////////////////////
  const root = divHome.querySelector("#rootHome");
  root.appendChild(renderItems(data));

  // menu responsive
  const menuNormal = divHome.querySelector(".menu-normal"); // div con selects en vista de PC
  const menuBoton = divHome.querySelector(".menu-boton"); // boton menu abrir en vista phone
  const cerrarFiltros = divHome.querySelector(".cerrar-filtros"); // boton menu cerrar en vista phone
  menuBoton.addEventListener("click", function () {
    menuBoton.style.display = "none";
    cerrarFiltros.style.display = "block";
    menuNormal.style.display = "flex";
  })
  cerrarFiltros.addEventListener("click", function () {
    menuBoton.style.display = "block";
    cerrarFiltros.style.display = "none";
    menuNormal.style.display = "none";
  })


  // FUNCIONES USADAS EN LOS EVENTOS
  function filtrarPelaje(data, pelajeSelec) {
    let gatosFiltrados = data;
    if (pelajeSelec === "pelo-corto") {
      gatosFiltrados = filterData(data, "pelajeGato", "Pelo corto");
    } else if (pelajeSelec === "pelo-semilargo") {
      gatosFiltrados = filterData(data, "pelajeGato", "Pelo semilargo");
    } else if (pelajeSelec === "pelo-largo") {
      gatosFiltrados = filterData(data, "pelajeGato", "Pelo largo");
    } else if (pelajeSelec === "sin-pelo") {
      gatosFiltrados = filterData(data, "pelajeGato", "Sin pelo");
    }
    return gatosFiltrados;
  }

  function filtrarPersonalidad(data, personalidadSelec) {
    let gatosFiltrados = data;
    if (personalidadSelec === "tranquilo") {
      gatosFiltrados = filterDataObj(data, "personalidad", "tranquilo");
    } else if (personalidadSelec === "carinoso") {
      gatosFiltrados = filterDataObj(data, "personalidad", "carinoso");
    } else if (personalidadSelec === "sociable") {
      gatosFiltrados = filterDataObj(data, "personalidad", "sociable");
    } else if (personalidadSelec === "energico") {
      gatosFiltrados = filterDataObj(data, "personalidad", "energico");
    } else if (personalidadSelec === "jugueton") {
      gatosFiltrados = filterDataObj(data, "personalidad", "jugueton");
    }
    return gatosFiltrados;
  }

  function ordenar(data, ordenSelec) {
    let gatosOrdenados = data;
    if (ordenSelec === "asc") {
      gatosOrdenados = sortData(data, "name", "asc");
    } else if (ordenSelec === "desc") {
      gatosOrdenados = sortData(data, "name", "desc");
    } else if (ordenSelec === "precio-asc") {
      gatosOrdenados = sortDataPrice(data, "precioCachorro", "asc");
    } else if (ordenSelec === "precio-desc") {
      gatosOrdenados = sortDataPrice(data, "precioCachorro", "desc");
    }
    return gatosOrdenados;
  }

  //Funcionalidad de tarjeta ver mas----------------------------------------------------------
  function tarjetasVer(data) {
    const botonesVer = divHome.querySelectorAll("#ver-info");//selecciona todos los elementos li
    for (let i = 0; i < data.length; i++) {
      botonesVer[i].addEventListener("click", function () {
        navigateTo("/gatoInfo", {id: data[i].id});
      });
    }

    const botonesChat = divHome.querySelectorAll("#chat-gato");
    for (let i = 0; i < data.length; i++) {
      botonesChat[i].addEventListener("click", function () {
        navigateTo("/chatGato", {id: data[i].id});
      });
    }
  }

  tarjetasVer(data);
  //---------------------------------------------------------------------------------------------

  //Funcionalidad de tChat Grupal----------------------------------------------------------
  
  const botonChatGrupal = divHome.querySelector("#chat-grupal");//selecciona todos los elementos li

  botonChatGrupal.addEventListener("click", function () {
    //window.location.href = "/chatGrupal"
    navigateTo("/chatGrupal");
  });
    

  //---------------------------------------------------------------------------------------------

  // EVENTOS SELECT
  const selectPelaje = divHome.querySelector("#pelajeGato");
  const selectPersonalidad = divHome.querySelector("#personalidad");
  const selectOrden = divHome.querySelector("#orden");

  const conteo = divHome.querySelector("#conteo"); //contador

  // evento para select pelaje
  selectPelaje.addEventListener("change", function (evento) {
    // event: la informacion del evento, cuando haces un cambio viaja la informacion de que seleccionas o que has seleccionado previamente
    //insertar las funciones
    const gatosFiltradosPelaje = filtrarPelaje(data, evento.target.value);
    const gatosFiltradosPelajePersonalidad = filtrarPersonalidad(gatosFiltradosPelaje, selectPersonalidad.value);
    const gatosFiltradosOrdenados = ordenar(gatosFiltradosPelajePersonalidad, selectOrden.value)
    root.innerHTML = "";
    root.appendChild(renderItems(gatosFiltradosOrdenados));
    conteo.textContent = "Cantidad: " + gatosFiltradosOrdenados.length; // contador
    tarjetasVer(gatosFiltradosOrdenados);
  });


  // evento para select personalidad
  selectPersonalidad.addEventListener("change", function (evento) {
    const gatosFiltradosPelaje = filtrarPelaje(data, selectPelaje.value);
    const gatosFiltradosPelajePersonalidad = filtrarPersonalidad(gatosFiltradosPelaje, evento.target.value);
    const gatosFiltradosOrdenados = ordenar(gatosFiltradosPelajePersonalidad, selectOrden.value);
    root.innerHTML = "";
    root.appendChild(renderItems(gatosFiltradosOrdenados));
    conteo.textContent = "Cantidad: " + gatosFiltradosOrdenados.length;
    tarjetasVer(gatosFiltradosOrdenados);
  });

  // evento para ordenar
  selectOrden.addEventListener("change", function (evento) {
    // insertar las funciones
    const gatosFiltradosPelaje = filtrarPelaje(data, selectPelaje.value);
    const gatosFiltradosPelajePersonalidad = filtrarPersonalidad(gatosFiltradosPelaje, selectPersonalidad.value);
    const gatosFiltradosOrdenados = ordenar(gatosFiltradosPelajePersonalidad, evento.target.value);
    root.innerHTML = "";
    root.appendChild(renderItems(gatosFiltradosOrdenados));
    conteo.textContent = "Cantidad: " + gatosFiltradosOrdenados.length;
    tarjetasVer(gatosFiltradosOrdenados);
  });

  // evento para boton borrar filtros
  const botonBorrar = divHome.querySelector("#botonBorrar");
  botonBorrar.addEventListener("click", function () {
    root.innerHTML = "";
    root.appendChild(renderItems(data));
    conteo.textContent = "Cantidad: " + data.length;
    selectPelaje.value = "none";
    selectPersonalidad.value = "none";
    selectOrden.value = "sin-orden";
    tarjetasVer(data);
  })

  //Botón estadísticas
  const estadisticasBoton = divHome.querySelector("#stats");
  const estadisticasDiv = divHome.querySelector(".div-estadisticas")
  const cerrar = divHome.querySelector(".boton-cerrar-estadisticas")
  estadisticasBoton.addEventListener("click", function () {
    cerrar.style.display = "flex";
    cerrar.style.justifyContent = "flex-end";
    estadisticasDiv.style.display = "flex";
    estadisticasDiv.style.justifyContent = "center"
    estadisticasDiv.textContent = "El precio promedio de cada gato es: " + computeStats(data);
  })
  cerrar.addEventListener("click", function () {
    estadisticasDiv.style.display = "none";
    cerrar.style.display = "none";
  })

  // al cargar la página, establece los valores por defecto
  window.addEventListener("load", function () {
    selectPelaje.value = "none";
    selectPersonalidad.value = "none";
    selectOrden.value = "sin-orden";
  });
  
  return divHome;
}