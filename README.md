# Dataverse Chat [Razas de gatos]

## Descripción

Dataverse Chat es una aplicación que te permite explorar diferentes razas de gatos y comunicarte con ellos en tiempo real mediante un chat.

**Funcionalidades principales**
- Exploración de razas: Visualiza una lista de 24 razas de gatos con imágenes y descripciones breves.
- Filtrado y ordenamiento: Filtra las razas por pelaje, personalidad y orden alfabético o de precio.
- Chat individual: Interactúa con un gato de una raza específica a través de un chat.
- Chat grupal: Participa en un chat grupal con varios gatos a la vez.

**Tecnologías utilizadas**
- JavaScript: Lenguaje de programación principal.
- HTML y CSS: Para la estructura y el estilo de la interfaz de usuario.
- Axios: Biblioteca para realizar peticiones HTTP.
- LocalStorage: Para almacenar la API KEY de manera local.
- OpenAI API: Para generar respuestas en el chat utilizando IA.

**Estructura del código**

El código se organiza en diferentes archivos:
- `apiKey.js`: Contiene funciones para obtener y guardar la API KEY en el Local Storage.
- `dataFunctions.js`: Funciones para filtrar, ordenar y calcular estadísticas sobre los datos de las razas de gatos.
- `openAIApi.js`: Funciones para comunicarse con la API de OpenAI y obtener respuestas en el chat.
- `router.js`: Configuración del enrutador para navegar entre diferentes vistas de la aplicación.
- `dataset.js`: Archivo JSON con los datos de las razas de gatos.
- `view.js`: Vistas de la aplicación, incluyendo la página principal, el chat individual, el chat grupal y la página de información de cada raza.

**Uso de Promesas**

En este proyecto, se hace un uso extensivo de promesas para manejar operaciones asíncronas, como la comunicación con la API de OpenAI y la coordinación de múltiples solicitudes en el chat grupal.

- **Comunicación individual con OpenAI:** La función `communicateWithOpenAI` utiliza promesas para manejar la comunicación con la API de OpenAI. Aquí, una promesa se utiliza para enviar una solicitud a la API y otra promesa se utiliza para manejar la respuesta.
- **Comunicación grupal con Promise.all:** En el chat grupal, se utiliza `Promise.all` para coordinar múltiples solicitudes a la API de OpenAI para varios gatos. Esto permite enviar todas las solicitudes simultáneamente y esperar a que todas se completen antes de continuar.

**Tests**

En este proyecto se han incluido varios tests para verificar el funcionamiento correcto de las funciones implementadas. Los tests se encuentran organizados en archivos separados dentro del directorio `tests`.

- **Test de fakeSetApiKey y fakeGetApiKey:** Se realizan pruebas para verificar el correcto funcionamiento de las funciones `fakeSetApiKey` y `fakeGetApiKey`. Estas funciones simulan el almacenamiento y recuperación de una API Key en un objeto local.
- **Test de funciones de manipulación de datos:** Se han creado tests para las funciones de manipulación de datos como `filterData`, `filterDataObj`, `sortData`, `sortDataPrice`, y `computeStats`.
- **Test de communicateWithOpenAI:** Se realiza una prueba para verificar la comunicación exitosa con la API de OpenAI. Se utiliza un mock de Axios para simular la respuesta de la API y asegurar que la función `communicateWithOpenAI` maneja correctamente la respuesta.

## Definición de producto

¿Quiénes son las principales usuarias del producto?
- Personas que quieran adoptar a un gato de raza.
- Veterinarios que quieran especializarse en gatos.

¿Cuáles son los objetivos de estas usuarias en relación con el producto?
- Obtener información relevante sobre cada raza y sus características
- Tener fácil acceso a la data para usarlo en futuras investigaciones o en el campo en el que trabajen.

¿Cuáles son los datos más relevantes que quieren ver en la interfaz y por qué?
- Pelaje
- Tamaño
- Personalidad
- Esperanza de vida
- Precio

¿Cuándo utilizan o utilizarían el producto?
- Cuando tengan la curiosidad de conocer sobre razas de gatos.
- Cuando quieran adoptar un gatito.

## Historias de usuaria

### Historia de usuaria #1

**Como**: Como líder de grupo.
**Quiero**: Estén capacitadas para entender el código que se va implementar.
**Para**: Entender cómo desarrollar una SPA en el futuro.

**Criterios de aceptación:**
- Entender que hace la función Home y que se hace en Home.js
- Entender que se hace en src/router.js
- Entender cada funcion: setRootEl, setRoutes, renderView y onURLChange.
- Entender cada funcion: setRootEl, setRoutes, renderView y onURLChange.

**Definición de terminado:**
- Que expliquemos la otra.
- Ser capaces de hacer la historia de usuaria 2.

### Historia de usuaria #2

**Como**: Posible adoptante.
**Quiero**: Chatear con una raza de gatito en específico.
**Para**: Conocer más acerca de esa raza e interactuar con un gatito.

**Criterios de aceptación:**
- Un botón de chat en cada tarjeta y darle la funcionalidad para ir a otra vista.
- Una vista de chat, importar la data, donde se reciba props(id).
- Un archivo ( src/lib/apiKey.js), ahi hacer las funciones del apikey (getApiKey y setApiKey).
- Un archivo ( test/apiKey.spec.js), importa las funciones de apikey y hacer los test.
- Integración con OPENAI, crear (src/lib/openAIApi.js), implementar la función communicateWithOpenAI.
- Entrenar a la AI para que actúe como gato 🐱.

**Definición de terminado:**
- Despliegue en Netlify o Vercel.
- Que pasen los test que implementamos.

### Historia de usuaria #3

**Como**: Posible adoptante.
**Quiero**: Chatear con todas raza de gatitos.
**Para**: Conocer más acerca de todos e interactuar con todos gatitos.

**Criterios de aceptación:**
- Un botón de chat grupal en el menú que te lleve a la vista de chat grupal.
- Una vista de chatgrupal, importar la data, donde se reciba props(id).
- Leer el README otra vez, para saber que nos falta implementar
- Consumo de la integración con Open AI.
- Implementación de tests communicateWithOpenAI (Mock y espías)
- Que el chat funcione bien.

**Definición de terminado:**
- Despliegue desplegado en Netlify o Vercel (5).
- Que pasen los test que implementamos (3).
- Luego de pedir feedback sobre el chat, implementar las correcciones necesarias. (5)

### Historia de usuaria #4

**Como**: Usuaria de la página.
**Quiero**: Que me salga una vista de error cuando le cambio algo en el URL.
**Para**: Saber que la página no existe y poder volver a la página principal.

**Criterios de aceptación:**
- Configurar el router para que direccione a un error setRoutes y RenderView.
- Un botón en la vista de error que te lleve a la vista de Home.
- Un archivo de Error.

**Definición de terminado:**
- Que se vea en el despliegue el error.

### Historia de usuaria #5

**Como**: Usuaria de la página.
**Quiero**: Poder ver bien la página desde mi celular.
**Para**: No tener que verlo desde la laptop

**Criterios de aceptación:**
- Diseño del prototipo para que sea responsive, empezar con "mobile first" (para todas las vistas)
- Implementar lo de display grid en css
- Terminar el css de toda las vistas
- Refactorización y modularización (opcional)

**Definición de terminado:**
- El despliegue sin error
- Que pasen todos los test
- Hacer el README

## Prototipo de baja fidelidad

![sketch](https://i.postimg.cc/wTVR2Fh0/prototipo-baja1.jpg "sketch")
> No habíamos incluido el botón para volver al inicio ni opción para ingresar la API key.

## Prototipo de alta fidelidad

![diseño UI](https://i.postimg.cc/Dztch5p1/prototipo-alta.png "diseño UI")
> Vistas de chat.

## Demostración del chat en funcionamiento

Una vez se ingresa una API key válida, se podrá hacer uso del chat.

![api key valida](https://i.postimg.cc/gknryd2k/apikey-valida.png "api key valida")
> Primer diseño de escritorio.

## Problemas detectados en tests de usabilidad

- El diseño del título de las páginas de chat no era agradable
- Que los mensajes del chat del usuario estén a la derecha y del gato a la izquierda.

¡Gracias por utilizar Dataverse Chat! ¡Disfruta de la aplicación! 🚀🤖
