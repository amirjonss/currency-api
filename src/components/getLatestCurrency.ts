import mongoose from 'mongoose';
import insertLatestCurrency from './insertLatestCurrency';

let Latest = require('../models/latest-currency_model');
export default async function getCurrencyByDate(symbol: string) {
  await mongoose.connect('mongodb://localhost:27017/currency');

  let currency = await Latest.collection.findOne({
    date: new Date().toISOString().slice(0, 10),
    base: symbol
  })

  if (currency === null) {
    await insertLatestCurrency(symbol)
    console.log('if');
  } else {
    return currency
  }
}
