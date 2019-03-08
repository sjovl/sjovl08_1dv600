'use strict'

const randomWord = require('random-words')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
/**
 * Class for handling a game of Hangman
 * @class Hangman
 */
class Hangman {
  constructor () {
    this.letters = []
    this.currentLetter = ''
    this.randomWord = randomWord
    this.currentWord = {
      word: '',
      solved: false
    }
    this.readline = readline
    this.player1 = {
      name: 'Player 1',
      guesses: 10
    }
    this.player2 = {
      name: 'Player 2',
      guesses: 10,
      multiplayer: false
    }
    this.currentPlayer = this.player1
    this.progress = []
    this.numberOfGuesses = 0
  }
  /**
   * Initiate the game by calling for setOption method
   */
  init () {
    this.setOption()
  }
  /**
   * Set options for game
   */
  setOption () {
    this.currentPlayer = this.player1
    this.logExceptOnTest('1. Set nickname')
    this.logExceptOnTest('2. Change to two players')
    this.logExceptOnTest('3. Start Game')
    this.logExceptOnTest('4. Quit game')
    if (process.env.NODE_ENV !== 'test') {
      this.makeMenuChoice()
    }
  }
  makeMenuChoice () {
    readline.question('Make a choice: ', (choice) => {
      if (choice === '1') {
        this.setNickname()
      } else if (choice === '2') {
        this.twoPlayers()
      } else if (choice === '3') {
        this.startGame()
      } else if (choice === '4') {
        this.quitGame()
      } else {
        console.log('\n')

        console.log('WRONG INPUT! CHOOSE A NUMBER BETWEEN 1-4')
        console.log('\n')

        this.setOption()
      }
    })
  }
  /**
   * Set the word to be guessed
   */
  setWord () {
    let underScore = '_'
    this.currentWord.word = Array.from(this.randomWord())
    this.progress = Array.from(underScore.repeat(this.currentWord.word.length))
    this.logExceptOnTest(this.progress.join(' '))
    return this.currentWord.word
  }
  /**
   * Method for setting nickname
   */
  setNickname () {
    readline.question('Player 1 choose your nickname: ', (nick) => {
      this.player1.name = nick

      console.log('\n')
      console.log(`Welcome ${nick}`)

      this.setOption()
    })
  }
  /**
   * Method for starting the game
   */
  startGame () {
    this.currentWord.solved = false
    this.progress = []
    this.letters = []
    this.numberOfGuesses = 0
    console.log('\n')

    console.log('Welcome to the game of Hangman! Start by guessing a letter')
    this.setWord()
    this.guess()
  }
  /**
   * Method for handling guesses
   */
  guess () {
    let index = 0

    readline.question('Guess a letter: ', (letter) => {
      this.letters.push(letter)
      this.currentWord.word.forEach(symbol => {
        if (symbol === letter) {
          this.progress[index] = letter
        }
        index++
      })

      console.log(this.progress.join(' '))
      console.log(`Letters used: ${this.letters}`)
      this.checkSolved(letter)
    })
  }
  checkSolved (letter) {
    let strProgress = this.progress.join(' ')
    let strWord = this.currentWord.word.join(' ')
    if (!strWord.includes(letter)) {
      this.wrongGuess()
    }
    if (strProgress === strWord) {
      this.currentWord.solved = true
      if (this.player2.multiplayer === true) {
        console.log('\n')
        console.log(`${this.player1.name} finishied with ${this.numberOfGuesses}`)
        console.log('\n')
        console.log(`${this.player2.name}'s turn!`)
        this.currentPlayer = this.player2
        this.startGame()
      }
      readline.question('You Won! Play again? (y/n): ', (answer) => {
        if (answer === 'y') {
          this.startGame()
        } else {
          this.setOption()
        }
      })
    }
    if (this.currentWord.solved === false) {
      this.guess()
    }
  }
  /**
   * Method for quitting game
   */
  quitGame () {
    try {
      readline.close()
    } catch (err) {
      throw new TypeError('ERROR: Could not quit the game')
    }
  }
  /**
   * Method for multiplayer option
   */
  twoPlayers () {
    readline.question('Set nickname for Player 2: ', (nickname) => {
      this.player2.name = nickname
      this.player2.multiplayer = true
      console.log('\n')
      console.log(`Welcome ${nickname}`)
      this.setOption()
    })
  }
  wrongGuess () {
    this.numberOfGuesses++
    console.log(`Strike ${this.numberOfGuesses}/10`)
    if (this.numberOfGuesses === 10) {
      readline.question('Bad luck! You got hanged! Play again? (y/n): ', (answer) => {
        if (answer === 'y') {
          this.startGame()
        } else {
          this.setOption()
        }
      })
    }
  }
  logExceptOnTest (string) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(string)
    }
    return string
  }
  failingTest (evenValue) {
    if (evenValue % 2 === 1) {
      return false
    } else {
      return true
    }
  }
}

// Exports
module.exports = Hangman
