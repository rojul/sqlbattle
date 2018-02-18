const express = require('express')

const db = require('../lib/db')
const dbUtils = require('../lib/db-utils')
const files = require('../lib/files')
const middleware = require('../lib/middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const ids = await files.findFilesWithExt('sql')
    const databases = ids.map(id => ({ id }))
    res.json({ databases })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  try {
    const sql = await files.readSqlFile(id)
    res.json({ id, sql })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  const sql = req.body.sql
  if (typeof sql !== 'string') {
    res.status(400).json({ error: 'Invalid field sql' })
    return
  }
  try {
    await files.writeSqlFile(id, sql)
    res.json(await forceImport(id))
  } catch (err) {
    next(err)
  }
})

const forceImport = async id => {
  let c, error
  try {
    c = db.connect('root')
    await dbUtils.ensureDatabase(c, id, true)
  } catch (err) {
    error = err.sqlMessage || err.message
  }
  c.end()
  return { importSuccessful: !error, error }
}

router.delete('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  try {
    await files.removeFile(id, 'sql')
    await deleteDatabase(id)
    res.json({ })
  } catch (err) {
    next(err)
  }
})

const deleteDatabase = async (id) => {
  let c
  try {
    c = db.connect('root')
    await dbUtils.dropDatabase(c, id)
  } finally {
    c.end()
  }
}

module.exports = router
