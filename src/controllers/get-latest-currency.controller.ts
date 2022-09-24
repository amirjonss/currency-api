import {get, param} from '@loopback/rest';
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
  checkCurrency(@param.query.string('symbol') symbol: string) {
    return getLatestCurrency(symbol)
  }
}