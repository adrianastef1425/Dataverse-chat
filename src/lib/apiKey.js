export const getApiKey = () => {
// Implementa el código para obtener la API KEY desde Local Storage
  const key = localStorage.getItem("key");
  return key;
};
 
export const setApiKey = (key) => {
// Implementa el código para guardar la API KEY en Local Storage
  localStorage.setItem("key", key);
};
