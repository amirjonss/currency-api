import {Promise} from 'mongoose';
import insertLatestCurrencyManager from '../models/InsertCurrencyManager';

const axios = require('axios');

interface ResponseInterface {
  data: {
    success: boolean;
    timestamp: number;
    base: string;
    date: Date;
    rates: object
  };
}

export default async function insertLatestCurrency(symbol: string, date: Date) {
  let strDate = date.toISOString().slice(0, 10);
  return new Promise((resolve: () => void, reject: () => void) => {
    axios({
      method: 'GET',
      url: `https://api.apilayer.com/fixer/${strDate}?symbols=&base=${symbol}`,
      headers: {
        apikey: 'wNzvMdh5m0PDf1z7Yy4kIVU3GVttG1T8',
      },
    })
      .then((response: ResponseInterface) => {
        if (response.data.success) {
          insertLatestCurrencyManager(response.data);
        }
        resolve()
      })
      .catch((err: {message: string;}) => {
        console.log(err.message);
        reject();
      });
  });
}