import {get} from '@loopback/rest';
const axios = require('axios');
import insertSymbols from '../models/Symbols';

export class UpdateCurrencyController {
  @get('/addSymbols', {
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
  async good() {
    async function getSymbols() {
      let symbols = {}
        await axios({
          method: 'get',
          url: 'https://api.apilayer.com/fixer/symbols',
          headers: {
            'apikey': 'jf8kXLjO6E0Si6uzTZ0zCCkkzA5JPKDv'
          }
        })
          .then((response: { data: {symbols: object}; })=>{
            symbols = response.data.symbols
            insertSymbols(response.data.symbols)
          })
          .catch((err: { message: string; })=> {
            console.log(err.message);
          })
      return symbols;
    }
    return getSymbols()
  }
}
