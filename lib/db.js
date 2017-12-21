const mysql = require('mysql')

const config = require('./config')

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
    connection.query(...args, (err, rows, fields) => {
      if (err) {
        reject(err)
        return
      }
      resolve({ rows, fields })
    })
  })
}
