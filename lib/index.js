/* global fetch */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('es6-promise').polyfill();
var fetch = require('isomorphic-fetch');

module.exports = function () {
  function OSRMClient() {
    var apiURL = arguments.length <= 0 || arguments[0] === undefined ? 'http://router.project-osrm.org' : arguments[0];

    _classCallCheck(this, OSRMClient);

    this.apiURL = apiURL;
  }

  _createClass(OSRMClient, [{
    key: '_req',
    value: function _req(method) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var loc = _ref.loc;

      function toJson(response) {
        if (response.status >= 400) throw new Error(response.statusText);
        return response.json();
      }

      var query = '';
      query += loc ? 'loc=' + loc.join('&loc=') : '';
      console.error(this.apiURL + '/' + method + '?' + query);
      return fetch(this.apiURL + '/' + method + '?' + query).then(toJson);
    }
  }, {
    key: 'viaroute',
    value: function viaroute(params) {
      return this._req('viaroute', params);
    }
  }, {
    key: 'trip',
    value: function trip(params) {
      return this._req('trip', params);
    }
  }]);

  return OSRMClient;
}();