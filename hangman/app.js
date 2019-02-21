/**
 * Starting point of the app
 * Handles a game of Hangman
 * Author Simon Jonsson <sjovl08>
 */

const Hangman = require('./src/js/Hangman.js')

const game = new Hangman()
game.init()
