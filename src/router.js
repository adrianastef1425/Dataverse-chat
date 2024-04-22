let ROUTES = {}; //Es un objeto vacío que almacenará las rutas de la aplicación
let rootEl; //Es una variable que almacenará el elemento root donde se renderizará el contenido de la aplicación

export const setRootEl = (el) => { 
  rootEl = el; //Asigna a la variable global rootEl el elemento del DOM root (document.querySelector("#root"))
}

export const setRoutes = (routes) => {
  ROUTES = routes; //Asigna el objeto routes que mapea las rutas a las funciones que van a renderizar las vistas 
}

const queryStringToObject = (queryString) => {
  // convierte { id → "persa" } a { id: "persa" }
  const object = {};
  for (const [key, value] of queryString) {
    object[key] = value;
  }
  return object;
}

const renderView = (pathname, props ={}) => { 
  rootEl.innerHTML = "";
  let keyId = 0;
  //let valueId = 0;
  for (const key in props) {
    keyId = key;
    //valueId = props[key];
  }
  //Verifica si la ruta especificada existe en las rutas definidas (ROUTES) o si se proporciona un parámetro "id" en props
  if(!ROUTES[pathname] || (keyId ? keyId !== "id" : false)){
    // Si no existe, redirigir a la ruta de error
    window.history.pushState({}, "/errorGatuno", `${window.location.origin}/errorGatuno`);
    // Actualizar pathname
    pathname = "/errorGatuno";
  } 
  //Se agrega la ruta al root para renderizar una vista(chatGato, gaotInfo, chatGrupal) 
  rootEl.appendChild(ROUTES[pathname](props));
}

export const navigateTo = (pathname, props) => {
  //Navegar a una nueva ruta
  //actualiza la URL del navegador, este método agrega una nueva entrada al historial de navegación. Se utiliza comúnmente en aplicaciones de una sola página (SPA) para cambiar la URL sin recargar la página.
  window.history.pushState({}, pathname, `${window.location.origin + pathname}${props ? "?id=" + props.id : ""}`);
  window.scrollTo(0, 0); // Reinicia el scroll al inicio de la página
  renderView(pathname, props);
}

export const onURLChange = (location) => {
  const pathname = location.pathname; 
  const queryString = new URLSearchParams(location.search); // convierte "?id=persa" a { id → "persa" }
  const objProps = queryStringToObject(queryString); // convierte { id → "persa" } a { id: "persa" }
  renderView(pathname, objProps);
}
