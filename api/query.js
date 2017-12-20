const express = require('express')
const assert = require('assert')

const db = require('../db')
const config = require('../config')
const utils = require('../utils')

const router = express.Router()

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

  const dump = await utils.readSqlFile(id)
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

const query = async (id, sql, answer) => {
  let c, result, correct

  try {
    c = db.connect('root')
    const roUser = `${config.dbPrefix}_ro`

    await ensureDatabase(c, id)
    await createUser(c, roUser, `${config.dbPrefix}\\_%`, 'SELECT, SHOW VIEW')

    c.changeUser({
      user: roUser,
      database: `${config.dbPrefix}_${id}`
    })

    result = transformResult(await db.query(c, sql))

    if (answer !== undefined) {
      const expected = transformResult(await db.query(c, answer))
      correct = deepEqual(result, expected)
    }
  } finally {
    c.end()
  }

  return { result, correct }
}

const transformResult = result => {
  if (!Array.isArray(result.fields[0])) {
    result.fields = [result.fields]
    result.rows = [result.rows]
  }

  return result.fields.map((fieldsObj, i) => {
    const fields = fieldsObj.map(f => f.name)
    const rows = result.rows[i].map(row => fields.map(f => row[f]))
    return { fields, rows }
  })
}

const deepEqual = (actual, expected) => {
  try {
    assert.deepStrictEqual(actual, expected)
    return true
  } catch (e) {
    return false
  }
}

router.post('/', async (req, res, next) => {
  const { db, sql, answer } = req.body
  if (!utils.validateId(db)) {
    res.status(400).json({ error: 'Invalid field db' })
    return
  }
  if (typeof sql !== 'string') {
    res.status(400).json({ error: 'Invalid field sql' })
    return
  }
  if (answer !== undefined && typeof answer !== 'string') {
    res.status(400).json({ error: 'Invalid field answer' })
    return
  }

  try {
    const rows = await query(db, sql, answer)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router
