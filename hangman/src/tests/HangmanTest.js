'use strict'
process.env.NODE_ENV = 'test'
const expect = require('chai').expect
const describe = require('mocha').suite
const it = require('mocha').test
const Hangman = require('../js/Hangman')
const hangman = new Hangman()

describe('Hangman.js Tests setWord()', () => {
  it('check that word is an array', done => {
    const word = hangman.setWord()
    expect(word).to.be.a('array')
    done()
  })
  it('word should not be undefined', done => {
    const word = hangman.setWord()
    expect(word).to.not.equal(undefined || null)
    done()
  })
})

describe('Hangman.js Tests quitGame()', () => {
  it('should terminate the app', done => {
    expect(() => { hangman.quitGame() }).to.not.throw(TypeError)
    done()
  })
})

describe('Hangman.js Tests logExceptOnTests()', () => {
  it('if not a test the function should console.log a string', done => {
    const isString = hangman.logExceptOnTest('test')
    expect(isString).to.be.a('string')
    done()
  })
})

// Failing test with odd number sent as an argument
describe('Hangman.js Tests failingTest()', () => {
  it('should return true if an even number', done => {
    const isEven = hangman.failingTest(1)
    expect(isEven).to.equal(true)
    done()
  })
})
