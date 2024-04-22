// import { setApiKey } from '../src/lib/apiKey.js';

const fakeAPIKey = "fakeapikey";

// se crea el objeto para guardar la key
const localStorage = {};

const fakeSetApiKey = (key) => {
  // se guarda la key como "key"
  localStorage["key"] = key;
};

const fakeGetApiKey = () => {
  // se obtiene el valor de "key" y se retorna el valor de key
  const key = localStorage["key"];
  return key;
};

describe('fakeSetApiKey', () => {
  it('debería establecer correctamente la API Key', () => {
    fakeSetApiKey(fakeAPIKey); // se llama a la funcion fakeSetApiKey para que guarde la fakeapikey en localstorage
    expect(localStorage["key"]).toEqual(fakeAPIKey);
  });
});

describe('fakeGetApiKey', () => {
  it('debería devolver el valor de la API Key', () => {
    expect(fakeGetApiKey()).toEqual(fakeAPIKey);
  });
});
