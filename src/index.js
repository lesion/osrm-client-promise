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
      return fetch(`${this.apiURL}/${method}?${query}`)
        .then(toJson)
    }

    nearest (loc) {
      if (Array.isArray(loc) && loc.length === 2) {
        return this._req('nearest', {loc: [loc]})
      } else {
        return Promise.reject(new Error('Expecting an array with 2 elements => [lat,lng]'))
      }
    }

    match (params) {
      return this._req('match', params)
    }

    table (params) {
      return this._req('table', params)
    }

    viaroute (params) {
      return this._req('viaroute', params)
    }

    trip (params) {
      return this._req('trip', params)
    }

}
