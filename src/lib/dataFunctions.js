//Filtra pelaje
export const filterData = (data, filterBy, value) => {
  return data.filter(cat => cat["facts"][filterBy] === value)
};

//Filtra personalidad
export const filterDataObj = (data, filterBy, value) => {
  return data.filter(cat => cat["extraInfo"][filterBy][value]) 
};

// orden A-Z y de Z-A
export const sortData = (data, sortBy, sortOrder) => {
  const data1 = [...data];//creando copia (shallow copy)// operador spread(...): crea una copia de cada elemento del array
  
  data1.sort((a, b) =>{
    if(sortOrder === "asc"){
      return (a[sortBy] > b[sortBy]) ? 1 : -1; //codigo ternario si es true devuelve 1 si es false devuelve -1
    }else if(sortOrder === "desc"){
      return (a[sortBy] < b[sortBy]) ? 1 : -1;
    }//else return 0;
  });
  return data1;
};

//Ordena por precios
export const sortDataPrice = (data, sortBy, sortOrder) => {
  const data1 = data.map(x => x);//crea una copia, devuelve x para cada elemento x, creando una copia de cada elemento 
  data1.sort((a, b) =>{
    if(sortOrder === "asc"){
      return (a["facts"][sortBy] > b["facts"][sortBy]) ? 1 : -1; //codigo ternario si es true devuelve 1 si es false devuelve -1
    }else if(sortOrder === "desc"){
      return (a["facts"][sortBy] < b["facts"][sortBy]) ? 1 : -1;
    }//else return 0;
  });
  return data1;
};

//Funcion del boton estadísticas
export const computeStats = (data) => {
  const precioTotal = data.reduce((conteo, gato) => conteo + gato["facts"]["precioCachorro"], 0);
  return precioTotal / data.length;
};
