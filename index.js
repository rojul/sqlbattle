const config = require('./lib/config')
const logger = require('./lib/logger')
const app = require('./app')

app.listen(config.port, () => {
  logger.info('server started')
})
