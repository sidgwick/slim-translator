var querystring = require('querystring');

var token = require('./token');
var languages = require('./languages');

function translate(text, opts) {
  opts = opts || {};

  var e;
  [opts.from, opts.to].forEach(function (lang) {
    if (lang && !languages.isSupported(lang)) {
      e = new Error();
      e.code = 400;
      e.message = 'The language \'' + lang + '\' is not supported';
    }
  });
  if (e) {
    return new Promise(function (resolve, reject) {
      reject(e);
    });
  }

  opts.from = opts.from || 'auto';
  opts.to = opts.to || 'en';

  opts.from = languages.getCode(opts.from);
  opts.to = languages.getCode(opts.to);

  return token.get(text).then(function (token) {
    var url = 'https://translate.google.com/translate_a/single';
    var data = {
      client: "gtx",
      sl: opts.from,
      tl: opts.to,
      hl: opts.to,
      //dt: ['t', 'bd'],
      dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'],
      dj: 1,
      source: "icon",

      otf: 1,
      ssel: 0,
      tsel: 0,
      kc: 7,

      q: text
    };
    data[token.name] = token.value;

    return url + '?' + querystring.stringify(data);
  }).then(function (url) {
    return fetch(url).then(response => {
      return response.json();
    }, err => {
      console.log(err);
      var e;
      e = new Error();
      if (err.statusCode !== undefined && err.statusCode !== 200) {
        e.code = 'BAD_REQUEST';
      } else {
        e.code = 'BAD_NETWORK';
      }
      reject(e);
    });
  });
}

module.exports = translate;
module.exports.languages = languages;
