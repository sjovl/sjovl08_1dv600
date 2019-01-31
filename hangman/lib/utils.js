const server = function () {
  const express = require('express')
  const app = express()
  const port = 3000
  const path = require('path')

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
  })

  app.listen(port, () => console.log(`Hangman app listening on port ${port}!`))
}
module.exports = { server }
