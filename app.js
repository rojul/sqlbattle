const express = require('express')
const compression = require('compression')

const api = require('./api')

const app = express()
app.disable('x-powered-by')
app.use(compression())

app.use('/api', api)
app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

module.exports = app
