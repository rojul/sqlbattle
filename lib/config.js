require('dotenv').config()

const prefix = 'SQLBATTLE'
const get = (name, val) => process.env[`${prefix}_${name}`] || val

module.exports = {
  port: get('PORT', '3000'),
  loglevel: get('LOGLEVEL', 'debug'),
  configPath: get('CONFIG_PATH', './config'),
  dbRootPassword: get('DB_ROOT_PASSWORD', ''),
  dbPrefix: get('DB_PREFIX', 'sb'),
  dbHost: get('DB_HOST', '127.0.0.1'),
  dbPort: get('DB_PORT', '3306'),
  dbSocketPath: get('DB_SOCKET_PATH', ''),
  configToken: get('CONFIG_TOKEN', '')
}
