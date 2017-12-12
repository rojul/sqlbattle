const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const db = require('../db')
const config = require('../config')
const utils = require('../utils')

const router = express.Router()

const readFile = async id => {
  return fs.readFile(path.join(config.configPath, `${id}.sql`), 'utf8')
}

const createUser = async (c, user, database, privileges) => {
  await db.query(c, `CREATE USER IF NOT EXISTS ?@'%' IDENTIFIED BY ?`, [user, config.dbRootPassword])
  await db.query(c, `GRANT ${privileges} ON ??.* TO ?@'%'`, [database, user])
}

const ensureDatabase = async (c, id) => {
  const database = `${config.dbPrefix}_${id}`
  const { rows } = await db.query(c, 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', database)
  if (rows.length !== 0) {
    return
  }

  const dump = await readFile(id)
  const rwUser = `${config.dbPrefix}_rw_${id}`
  await createUser(c, rwUser, `${config.dbPrefix}\\_${id}`, 'ALL PRIVILEGES')
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

const query = async (id, sql) => {
  let c, result

  try {
    c = db.connect('root')
    const roUser = `${config.dbPrefix}_ro`

    await ensureDatabase(c, id)
    await createUser(c, roUser, `${config.dbPrefix}\\_%`, 'SELECT, SHOW VIEW')

    c.changeUser({
      user: roUser,
      database: `${config.dbPrefix}_${id}`
    })

    result = await db.query(c, sql)
  } finally {
    c.end()
  }

  return result.rows
}

router.post('/', async (req, res, next) => {
  const { db, sql } = req.body
  if (!utils.validateId(db)) {
    res.status(400).json({ error: 'Invalid field db' })
    return
  }
  if (typeof sql !== 'string') {
    res.status(400).json({ error: 'Invalid field sql' })
    return
  }

  try {
    const rows = await query(db, sql)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
