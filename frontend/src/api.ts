import {Asset, CryptoData, cryptoAssets} from './data';
import axios from 'axios';

export function fakeFetchCrypto(): Promise<CryptoData> {
  const apiUrl = 'https://openapiv1.coinstats.app/coins';
  const key = 'PYWwSwPzgwtjiaLz+pNiEHp1/6FSubRmSnRPJduRyiw=';
  const headers = {
    'X-API-KEY': key,
  };

  return axios
    .get(apiUrl, {headers})
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching crypto data:', error);
      throw error; // Propagate the error further if needed
    });
}

export function fakeAssets(): Promise<Asset[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 2);
  });
}
