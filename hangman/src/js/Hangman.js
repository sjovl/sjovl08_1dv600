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
    this.randomWord = randomWord
    this.currentWord = {
      word: '',
      solved: false
    }
    this.readline = readline
    this.player1 = {
      name: ''
    }
    this.player2 = {
      name: '',
      multiplayer: false
    }
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
    console.log('1. Set nickname')
    console.log('2. Change to two players')
    console.log('3. Start Game')
    console.log('4. Quit game')
    readline.question('Make a choice: ', (choice) => {
      if (choice === '1') {
        this.setNickname()
      } else if (choice === '2') {
        this.twoPlayers()
      } else if (choice === '3') {
        this.setWord()
      } else if (choice === '4') {
        this.quitGame()
      } else {
        console.log('Wrong input')
      }
    })
  }
  /**
   * Set the word to be guessed
   */
  setWord () {
    let underScore = '_'
    this.currentWord.word = Array.from(this.randomWord())
    console.log(this.currentWord.word)
    console.log(underScore.repeat(this.currentWord.word.length))
    this.guess()
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
    this.setWord()
  }
  /**
   * Method for handling guesses
   */
  guess () {
    console.log(this.letters)
    readline.question('Guess a letter: ', (letter) => {
      this.letters.push(letter)
      this.currentWord.word.forEach(symbol => {
        if (symbol === letter) {
          console.log('match!')
        }
      })
      this.checkSolved()
    })
  }
  checkSolved () {
    if (this.currentWord.solved === false) {
      this.guess()
    }
  }
  /**
   * Method for quitting game
   */
  quitGame () {
    readline.close()
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
}

module.exports = Hangman
