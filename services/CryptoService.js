const axios = require('axios');

//Request to Coin Market Cap Web API
async function loadData(endpoint) {
  let baseUrl = 'https://pro-api.coinmarketcap.com/';
  let response = await axios.get(baseUrl + endpoint, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
    },
  });
  return await response.data;
}

//Request to Coin Market Cal Web API
async function loadEventsData(endpoint) {
  let baseUrl = 'https://developers.coinmarketcal.com/';
  let response = await axios.get(baseUrl + endpoint, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'x-api-key': 'pXOLwUY3YI9oD1PNlbjX44ztz3cXsYVj31n7H99D',
    },
  });
  return await response.data;
}

module.exports.loadData = loadData;
module.exports.loadEventsData = loadEventsData;
