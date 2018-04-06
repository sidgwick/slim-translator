import sM from "./google-encrypt";
import getGoogleTranslatorDomain from './domain';

var window = {
  TKK: localStorage['TKK'] || '0'
};

function updateTKK() {
  return new Promise(function (resolve, reject) {
    var now = Math.floor(Date.now() / 3600000);

    if (Number(window.TKK.split('.')[0]) === now) {
      resolve();
    } else {
      var url = `https://${getGoogleTranslatorDomain()}`;
      fetch(url, {
        method: 'GET',
      }).then(response => {
        return response.text();
      }).then(res => {
        var code = res.match(/TKK=(.*?)\(\)\)'\);/g);

        if (code) {
          eval("window." + code[0]);
          /* eslint-disable no-undef */
          if (typeof TKK !== 'undefined') {
            window.TKK = TKK;
            localStorage['TKK'] = TKK;
          }
        }

        resolve();
      }, err => {
        var e = new Error();
        e.code = 'BAD_NETWORK';
        e.message = err.message;
        reject(e);
      });
    }
  });
}

function get(text) {
  return updateTKK().then(function () {
    var tk = sM(text);
    tk = tk.replace('&tk=', '');
    return {name: 'tk', value: tk};
  }).catch(function (err) {
    throw err;
  });
}

module.exports.get = get;
