const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const config = require('../config')
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

module.exports = router
