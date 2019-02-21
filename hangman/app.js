/**
 * Starting point of the app
 * Handles a game of Hangman
 * Author Simon Jonsson <sjovl08>
 *
 * Initiate game with command 'npm start'
 */

const Hangman = require('./src/js/Hangman.js')

const game = new Hangman()
game.init()
