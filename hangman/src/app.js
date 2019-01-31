const Hangman = require('./js/Hangman')
const utils = require('../lib/utils.js')

utils.server()

const game = new Hangman()
game.init()
