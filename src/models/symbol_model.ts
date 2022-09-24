import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const symbolSchema = new Schema({
  symbol: String,
  name: String
})

module.exports = mongoose.model('symbol', symbolSchema);