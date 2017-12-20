const express = require('express')

const utils = require('../utils')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const ids = await utils.findFilesWithExt('sql')
    const databases = ids.map(id => ({ id }))
    res.json({ databases })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', utils.validateIdMiddleware, async (req, res, next) => {
  const id = req.params.id
  try {
    const sql = await utils.readSqlFile(id)
    res.json({ id, sql })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', utils.validateIdMiddleware, async (req, res, next) => {
  const id = req.params.id
  const sql = req.body.sql
  if (typeof sql !== 'string') {
    res.status(400).json({ error: 'Invalid field sql' })
    return
  }
  try {
    await utils.writeSqlFile(id, sql)
    res.json({ })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', utils.validateIdMiddleware, async (req, res, next) => {
  const id = req.params.id
  try {
    await utils.removeFile(id, 'sql')
    res.json({ })
  } catch (err) {
    next(err)
  }
})

module.exports = router
