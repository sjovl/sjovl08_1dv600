const randomWord = require('random-words')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

class Hangman {
  constructor () {
    this.letters = []
    this.randomWord = randomWord
    this.currentWord = []
    this.readline = readline
    this.player1 = ''
    this.player2 = ''
  }
  init () {
    this.setOption()
  }
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
      }
    })
  }
  setWord () {
    let underScore = '_ '
    this.currentWord = this.randomWord()
    console.log(this.currentWord)
    console.log(underScore.repeat(this.currentWord.length))
    this.guess()
  }
  setNickname () {
    readline.question('Choose your nickname: ', (nick) => {
      this.player1 = nick

      console.log('\n')
      console.log(`Welcome ${nick}`)
      this.setOption()
    })
  }
  startGame () {
    this.setWord()
  }

  guess () {
    readline.question('Guess a letter: ', (letter) => {
      this.letters.push(letter)
    })
  }
  quitGame () {
    readline.close()
  }
  twoPlayers () {
  }
}

module.exports = Hangman
