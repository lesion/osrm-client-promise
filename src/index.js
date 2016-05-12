/* global fetch */
'use strict'
require('es6-promise').polyfill()
const fetch = require('isomorphic-fetch')

module.exports =
  class OSRMClient {

    constructor (apiURL = 'http://router.project-osrm.org') {
      this.apiURL = apiURL
    }

    _req (method, {loc} = {}) {
      function toJson (response) {
        if (response.status >= 400) throw new Error(response.statusText)
        return response.json()
      }

      let query = ''
      query += loc ? `loc=${loc.join('&loc=')}` : ''
      console.error(`${this.apiURL}/${method}?${query}`)
      return fetch(`${this.apiURL}/${method}?${query}`)
        .then(toJson)
    }

    viaroute (params) {
      return this._req('viaroute', params)
    }

    trip (params) {
      return this._req('trip', params)
    }

}
