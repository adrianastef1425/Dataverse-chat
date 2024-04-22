import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = (messages) => {
  const apiKey = getApiKey();
  const url = 'https://api.openai.com/v1/chat/completions'; //URL de la API de OpenAI chat//endpoint

  return axios.post(url, { //Envía la solicitud HTTP post al endpoint de OpenAI chat
    messages,
    max_tokens: 150,
    temperature: 1.2,
    model: "gpt-3.5-turbo"
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => { //funcion arrow que retorna el contenido de la respuesta de la API
      return response.data.choices[0].message.content;
    })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
};
