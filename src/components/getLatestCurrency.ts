import mongoose from 'mongoose';
import insertLatestCurrency from './insertLatestCurrency';

let Latest = require('../models/latest-currency_model');
export default async function getCurrencyByDate(symbol: string, date: Date) {
  await mongoose.connect('mongodb://localhost:27017/currency');

  let currency = await Latest.collection.findOne({
    date: date.toISOString().slice(0, 10),
    base: symbol
  })

  if (currency === null) {
    await insertLatestCurrency(symbol, date)
    return await Latest.collection.findOne({
      date: date.toISOString().slice(0, 10),
      base: symbol
    })
  } else {
    return currency
  }
}
