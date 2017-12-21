const express = require('express')
const compression = require('compression')

const config = require('./lib/config')
const logger = require('./lib/logger')
const api = require('./api')

logger.info('server starting')

const app = express()
app.disable('x-powered-by')
app.use(compression())

app.use('/api', api)
app.use(express.static('dist'))

app.listen(config.port)
