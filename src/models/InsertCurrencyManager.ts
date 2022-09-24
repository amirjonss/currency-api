import mongoose from 'mongoose';
let InsertCurrencyManager = require('./latest-currency_model');

export default async function insertLatestCurrencyManager(symbols: object) {
  await mongoose.connect('mongodb://localhost:27017/currency');
  try {
    await InsertCurrencyManager.collection.insertOne(symbols)
  } catch (e) {
    console.log(e);
  }
  await mongoose.connection.close();
}