/* eslint-disable */
import { communicateWithOpenAI } from '../src/lib/openAIApi.js';

describe('communicateWithOpenAI', () => {
  it('Debería comunicarse con el api de OpenAI', async () => {
    //La respuesta que debería dar OpenAI
    const response = {data: {
      choices: [
        { message: { content: "Response from OpenAI" } }
      ]
    }}

    //Creando mock de axios
    global.axios = {
        post: jest.fn( () => Promise.resolve(response))}

    const prompt = ["Hola, te gusta que te rasquen la pancita"];

    await communicateWithOpenAI(prompt)
    .then(response => {
        expect(response).toBe("Response from OpenAI");
        expect(global.axios.post).toHaveBeenCalled();
      }
      );

    //delete global.axios;//Se limpia el mock después de la prueba
 
    })
})
     
//     ///////////////////////////////////////////laboratoria
//     return communicateWithOpenAI().then(data => {
//       expect(data).toBe('example');
//     });
//     //////////////////////////////////
//   });
