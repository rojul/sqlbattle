const config = require('./config')
const db = require('./db')
const files = require('./files')
const utils = require('../lib/utils')
const logger = require('./logger')

exports.createUser = async (c, user, database, privileges) => {
  await db.query(c, `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?`, [user, config.dbRootPassword])
  await db.query(c, `GRANT ${privileges} ON ??.* TO ?@'%'`, [utils.escapeUnderscore(database), user])
}

exports.ensureDatabase = async (c, id, force = false) => {
  const rwUser = `${config.dbPrefix}_rw_${id}`
  const database = `${config.dbPrefix}_${id}`

  if (!force && await this.databaseExists(c, database)) {
    return
  }

  const dump = await files.readSqlFile(id)
  await this.dropDatabase(c, database)

  try {
    await db.query(c, 'CREATE DATABASE ??', database)
    await this.createUser(c, rwUser, database, 'ALL PRIVILEGES')
    c.changeUser({ user: rwUser, database })
    await db.query(c, dump)
    c.changeUser({ user: 'root' })
    await db.query(c, `DROP USER ?@'%'`, rwUser)
  } catch (e) {
    this.dropDatabase(c, database).catch(logger.silly)
    throw new Error(`Error while importing database: ${e}`)
  }
}

exports.databaseExists = async (c, database) => {
  const { rows } = await db.query(c, 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', database)
  return rows.length !== 0
}

exports.dropDatabase = async (c, database) => {
  await db.query(c, 'DROP DATABASE IF EXISTS ??', database)
}
