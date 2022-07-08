const cryptoService = require('../services/CryptoService');
const Crypto = require('../models/Crypto');
const Event = require('../models/Event');

// Endpoints to get trending crypto currency data from Coin Marcap

async function getCryptos() {
  let cryptoMap = await cryptoService.loadData(
    'v1/cryptocurrency/map?limit=300'
  );
  let cryptoLatest = await cryptoService.loadData(
    'v1/cryptocurrency/listings/latest'
  );
  // console.log(cryptoMap);
  // console.log(cryptoLatest);

  let cryptoList = [];
  for (let j = 0; j < cryptoLatest.data.length; j++) {
    let cryptoLatestObj = cryptoLatest.data[j];
    for (let i = 0; i < cryptoMap.data.length; i++) {
      let cryptoMapObj = cryptoMap.data[i];
      // console.log(cryptoMapObj);

      // console.log(cryptoLatestObj);
      if (cryptoMapObj.id == cryptoLatestObj.id) {
        let crypto = Object.create(Crypto);
        crypto.id = cryptoMapObj.id;
        crypto.name = cryptoLatestObj.name;
        crypto.symbol = cryptoLatestObj.symbol;
        crypto.circulatingSupply = cryptoLatestObj.circulating_supply;
        crypto.totalSupply = cryptoLatestObj.total_supply;
        crypto.priceQuote = cryptoLatestObj.quote['USD'].price;
        crypto.marketCapQuote = cryptoLatestObj.quote['USD'].market_cap;
        crypto.maxSupply = cryptoLatestObj.max_supply;

        cryptoList.push(crypto);
      }
    }
  }
  console.log(cryptoList);

  return cryptoList;
}

// Endpoint to get significant crypto events from Coin Market CAL
async function getCryptoEvents() {
  let cryptoEvents = await cryptoService.loadEventsData(
    'v1/events?sortBy=significant_events'
  );

  let cryptoEventsList = [];
  for (let i = 0; i < cryptoEvents.body.length; i++) {
    let cryptoEventsObj = cryptoEvents.body[i];
    // console.log(cryptoEventsObj[i]);
    let event = Object.create(Event);
    event.id = cryptoEventsObj.id;
    event.title = cryptoEventsObj.title;
    event.dateEvent = cryptoEventsObj.date_event;
    event.coins = cryptoEventsObj.coins;
    cryptoEventsList.push(event);
    // console.log(cryptoEventsList);
  }
  return cryptoEventsList;
}

module.exports.getCryptos = getCryptos;
module.exports.getCryptoEvents = getCryptoEvents;
