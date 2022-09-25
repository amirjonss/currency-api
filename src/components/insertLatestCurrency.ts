import {Promise} from 'mongoose';
import insertLatestCurrencyManager from '../models/InsertCurrencyManager';
require('dotenv').config();

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
        apikey: process.env.FIXER_API_KEY,
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