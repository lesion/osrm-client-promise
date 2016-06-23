/* global describe, it */
'use strict'
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

const OSRMClient = require('../lib/index')

const testCoords = [
  [45, 8], [45.1, 8.1]
]

describe('osrm-client-promise', function () {
  var osrm = new OSRMClient('http://localhost:5000')

  it('should create an instance', function () {
    expect(osrm).to.be.instanceOf(OSRMClient)
  })

  describe('viaroute', function () {
    it('should fail on empty request', function () {
      return expect(osrm.viaroute()).to.eventually.be.rejected
    })
  })

  describe('trip', function () {
    it('should be ok with 2 coords', function () {
      return expect(osrm.trip({loc: testCoords})).to.eventually.be.fulfilled
    })
  })

  describe('nearest', function () {
    it('should fill name property', function () {
      return expect(osrm.nearest([45.053411, 7.656143]))
        to.eventually.have.property('name', 'Corso Duca degli Abruzzi')
    })

    it('should fill mapped_coordinate property', function () {
      return expect(osrm.nearest([45.053411, 7.656143]))
        to.eventually.have.property('mapped_coordinate', [ 45.05344, 7.656066 ])
    })

    it('should return a nice error', function () {
      return expect(osrm.nearest(1, 2)).to.eventually.be.rejectedWith(/Expecting an array/)
    })
  })
})
