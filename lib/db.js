const mysql = require('mysql2')

const config = require('./config')
const logger = require('./logger')

exports.connect = (user, database) => {
  const connection = mysql.createConnection({
    host: config.dbHost,
    port: config.dbPort,
    user,
    password: config.dbRootPassword,
    multipleStatements: true,
    database
  })
  connection.connect()
  return connection
}

exports.query = (connection, ...args) => {
  return new Promise((resolve, reject) => {
    const { sql } = connection.query(...args, (err, rows, fields) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ rows, fields })
    })
    logger.silly(truncate(sql, 150))
  })
}

const truncate = (s, l) => {
  return s.length > l ? s.substring(0, l) + '...' : s
}
