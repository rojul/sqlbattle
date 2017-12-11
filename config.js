module.exports = {
  port: process.env.SQLBATTLE_PORT || 3000,
  loglevel: process.env.SQLBATTLE_LOGLEVEL || 'debug',
  configPath: './config'
}
