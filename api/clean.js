const express = require('express')

const config = require('../lib/config')
const db = require('../lib/db')
const utils = require('../lib/utils')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await clean()
    res.json({ })
  } catch (err) {
    next(err)
  }
})

const clean = async () => {
  let c
  try {
    c = db.connect('root')
    const prefix = utils.escapeUnderscore(`${config.dbPrefix}_%`)
    const dbs = (await db.query(c, 'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?', prefix))
      .rows.map(r => r.SCHEMA_NAME)
    const users = (await db.query(c, 'SELECT user FROM mysql.user WHERE user LIKE ?', prefix))
      .rows.map(r => r.user)
    await Promise.all([
      ...dbs.map(v => db.query(c, 'DROP DATABASE ??', v)),
      ...users.map(v => db.query(c, 'DROP USER ??', v))
    ])
  } finally {
    c.end()
  }
}

module.exports = router
