const config = require('./config')
const db = require('./db')
const files = require('./files')

exports.createUser = async (c, user, database, privileges) => {
  await db.query(c, `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?`, [user, config.dbRootPassword])
  await db.query(c, `GRANT ${privileges} ON ??.* TO ?@'%'`, [database.replace(/_/g, '\\_'), user])
}

exports.ensureDatabase = async (c, id, force = false) => {
  const database = `${config.dbPrefix}_${id}`
  if (!force) {
    const { rows } = await db.query(c, 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', database)
    if (rows.length !== 0) {
      return
    }
  }

  const dump = await files.readSqlFile(id)
  const rwUser = `${config.dbPrefix}_rw_${id}`
  await this.createUser(c, rwUser, database, 'ALL PRIVILEGES')
  await db.query(c, 'DROP DATABASE IF EXISTS ??', database)
  await db.query(c, 'CREATE DATABASE ??', database)

  c.changeUser({
    user: rwUser,
    database
  })

  await db.query(c, dump)

  c.changeUser({
    user: 'root'
  })

  await db.query(c, `DROP USER ?@'%'`, rwUser)
}
