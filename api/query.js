const express = require('express')
const assert = require('assert')

const config = require('../lib/config')
const dbUtils = require('../lib/db-utils')
const db = require('../lib/db')
const utils = require('../lib/utils')

const router = express.Router()

const query = async (id, sql, answer) => {
  let c, result, correct

  try {
    c = db.connect('root')
    const roUser = `${config.dbPrefix}_ro_${id}`
    const database = `${config.dbPrefix}_${id}`

    await dbUtils.ensureDatabase(c, id)
    await dbUtils.createUser(c, roUser, database, 'SELECT, SHOW VIEW')
    c.changeUser({ user: roUser, database })
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

const transformResult = ({ fields, rows }) => {
  return {
    fields: fields.map(f => f.name),
    rows
  }
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
