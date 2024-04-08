import { setApiKey } from '../src/lib/apiKey.js';

const fakeAPIKey = "fakeapikey";

describe('setApiKey', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear local storage before each test
  });

  it('debería establecer correctamente la API Key', () => {
    setApiKey(fakeAPIKey);
    expect(localStorage.getItem("key").toEqual(fakeAPIKey));
  });
});

// describe('getApiKey', () => {

//   it('debería devolver el valor de la API Key', () => {
//     // Desarrolla el test correspondiente aquí
//     expect(getApiKey().not.toBeNull());
//   });
// });