/* global describe, it */
'use strict'
const chai = require('chai')
const expect = chai.expect
require('should-eventually')
chai.use(require('chai-as-promised'))

const OSRMClient = require('../lib/index')

const test_coords = [
  [45, 8], [45.1, 8.1]
]

describe('osrm-client-promise', function () {
  var osrm = new OSRMClient()

  it('should create an instance', function () {
    expect(osrm).to.be.instanceOf(OSRMClient)
  })

  describe('viaroute', function () {
    it('should fail on empty request', function () {
      let a = osrm.viaroute()
      return a.should.eventually.be.rejected
    })
  })

  describe('trip', function () {
    it('should be ok with 2 coords', function () {
      return osrm.trip({loc: test_coords})
        .then(data => console.error(data))
    })
  })
})
