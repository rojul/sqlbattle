const winston = require('winston')

const config = require('./config')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
})

logger.level = config.loglevel

module.exports = logger
