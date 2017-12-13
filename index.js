const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')

const config = require('./config')
const logger = require('./logger')
const api = require('./api')

logger.info('server starting')

const app = express()
app.disable('x-powered-by')
app.use(compression())
app.use(bodyParser.json({ type: '*/*' }))

app.use('/api', api)
app.use(express.static('dist'))

app.listen(config.port)
