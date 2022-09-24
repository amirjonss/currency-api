import mongoose from 'mongoose';
let Symbol = require('./symbol_model');

export default async function insertSymbols(symbols: object) {
  await mongoose.connect('mongodb://localhost:27017/currency');
  try {
    await Symbol.collection.insertOne(symbols)
  } catch (e) {
    console.log(e);
  }
  await mongoose.connection.close();
}