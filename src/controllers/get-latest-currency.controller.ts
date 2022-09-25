import {get, param} from '@loopback/rest';
require('dotenv').config();
import getLatestCurrency from '../components/getLatestCurrency';

export class GetLatestCurrencyController {
  @get('/get-latest-currency', {
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'application/json': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  checkCurrency(
    @param.query.string('symbol', {required: true}) symbol: string,
    @param.query.date('date', {required: false}) date: Date,
  ) {
    return getLatestCurrency(symbol, date ? date : new Date())
  }
}