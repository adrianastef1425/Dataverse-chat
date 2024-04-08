import { data as fakeData } from './data.js';
import { filterData, filterDataObj, sortData, sortDataPrice, computeStats } from '../src/lib/dataFunctions.js';

describe('Función filterData', () => {

  it('Retorna 3 para la cantidad de gatos de pelo corto', () => {
    expect(filterData(fakeData, "pelajeGato", "Pelo corto")).toHaveLength(3);
  });
  it('Retorna 0 para la cantidad de gatos de pelo semilargo', () => {
    expect(filterData(fakeData, "pelajeGato", "Pelo semilargo")).toHaveLength(0);
  });
  it('Retorna 3 para la cantidad de gatos de pelo largo', () => {
    expect(filterData(fakeData, "pelajeGato", "Pelo largo")).toHaveLength(3);
  });
  it('Retorna 0 para la cantidad de gatos sin pelo', () => {
    expect(filterData(fakeData, "pelajeGato", "Sin pelo")).toHaveLength(0);
  });
});

describe('Función filterDataObj', () => {

  it('Retorna 3 para la cantidad de gatos de personalidad tranquilo', () => {
    expect(filterDataObj(fakeData, "personalidad", "tranquilo")).toHaveLength(3);
  });
  it('Retorna 6 para la cantidad de gatos de personalidad cariñoso', () => {
    expect(filterDataObj(fakeData, "personalidad", "carinoso")).toHaveLength(6);
  });
  it('Retorna 5 para la cantidad de gatos de personalidad sociable', () => {
    expect(filterDataObj(fakeData, "personalidad", "sociable")).toHaveLength(5);
  });
  it('Retorna 3 para la cantidad de gatos de personalidad energico', () => {
    expect(filterDataObj(fakeData, "personalidad", "energico")).toHaveLength(3);
  });
  it('Retorna 3 para la cantidad de gatos de personalidad jugueton', () => {
    expect(filterDataObj(fakeData, "personalidad", "jugueton")).toHaveLength(3);
  });
});

describe('Función sortData', () => {

  it('Retorna Bengalí como primer elemento del arreglo de gatos ordenados A-Z', () => {
    expect(sortData(fakeData, "name", "asc")[0]["name"]).toBe("Bengalí");
  });
  it('Retorna Siberiano como primer elemento del arreglo de gatos ordenados Z-A', () => {
    expect(sortData(fakeData, "name", "desc")[0]["name"]).toBe("Siberiano");
  });
  it('Retorna la data sin ordenar cuando todos nombres de los gatos son iguales', () => {
    expect(sortData(fakeData, "name", "desc")).not.toEqual(fakeData);
  });
});

describe('Función sortDataPrice', () => {

  it('Retorna 800 como el precio más bajo del arreglo de gatos', () => {
    expect(sortDataPrice(fakeData, "precioCachorro", "asc")[0]["facts"]["precioCachorro"]).toBe(800);
  });
  it('Retorna 1500 como el precio más alto del arreglo de gatos', () => {
    expect(sortDataPrice(fakeData, "precioCachorro", "desc")[0]["facts"]["precioCachorro"]).toBe(1500);
  });
  it('Retorna la data sin ordenar cuando los precios de los gatos son iguales', () => {
    expect(sortDataPrice(fakeData, "precioCachorro", "desc")).not.toEqual(fakeData);
  });
});

describe('Función computeStats', () => {

  it('Retorna 1133.33 para el promedio de precios de los gatos', () => {
    expect(computeStats(fakeData)).toBe(1133.3333333333333);
  });
});