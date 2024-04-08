import { getApiKey } from './apiKey.js';
//import axios from 'axios';

export const communicateWithOpenAI = (messages) => {
  //Aquí es donde debes implementar la petición con fetch o axios
  const apiKey = getApiKey();
  const url = 'https://api.openai.com/v1/chat/completions';
  
  //const axios = require('axios');//?????

  return axios.post(url, {
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
    .then(response => {
      return response.data.choices[0].message.content;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};
