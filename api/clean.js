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
    const select = async sql => (await db.query(c, sql, prefix)).rows.map(r => r[0])
    const dbs = await select('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME LIKE ?')
    const users = await select('SELECT user FROM mysql.user WHERE user LIKE ?')
    await Promise.all([
      ...dbs.map(v => db.query(c, 'DROP DATABASE ??', v)),
      ...users.map(v => db.query(c, 'DROP USER ??', v))
    ])
  } finally {
    c.end()
  }
}

module.exports = router
