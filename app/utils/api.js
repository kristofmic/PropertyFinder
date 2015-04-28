const
  BASE_URL = 'http://api.nestoria.co.uk/api?';

var
  _ = require('lodash'),
  queryData;

queryData = {
  pretty: '1',
  encoding: 'json',
  listing_type: 'buy',
  action: 'search_listings',
  page: '1'
};

module.exports = {
  fetchListings
};

function fetchListings (config) {
  var
    query,
    url;

  config = config || {};

  query = _.chain(config)
    .pick(['country', 'page', 'place_name'])
    .assign(queryData)
    .map((val, key) => key + '=' + encodeURIComponent(val))
    .value()
    .join('&');

  url = BASE_URL + query;

  return fetch(url)
    .then(res => res.json())
    .then(resData => resData.response.listings);
}