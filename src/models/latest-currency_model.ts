import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const latestSchema = new Schema({
  base: 'string',
  date: Date,
  rates: {},
  success: Boolean,
  timestamp: Number
})

module.exports = mongoose.model('latest', latestSchema);