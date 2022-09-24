import {Promise} from 'mongoose';
import axios from 'axios';
import insertLatestCurrencyManager from '../models/InsertCurrencyManager';

interface ResponseInterface {
  data: {
    success: boolean;
    timestamp: number;
    base: string;
    date: Date;
    rates: object
  };
}

export default async function insertLatestCurrency(symbol: string) {
  return new Promise((resolve: () => void, reject: () => void) => {
    let rates = {};
    axios({
      method: 'get',
      url: `https://api.apilayer.com/fixer/latest?symbols=&base=${symbol}`,
      headers: {
        'apikey': 'jf8kXLjO6E0Si6uzTZ0zCCkkzA5JPKDv',
      },
    })
      .then((response: ResponseInterface) => {
        rates = response.data;
        if (response.data.success) {
          insertLatestCurrencyManager(response.data)
        }
        resolve()
      })
      .catch((err: {message: string;}) => {
        console.log(err.message);
        reject()
      });
  })
}