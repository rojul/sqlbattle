const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const config = require('../config')
const utils = require('../utils')

const router = express.Router()

const readJson = async id => {
  const json = await fs.readJson(path.join(config.configPath, `${id}.json`))
  json.id = id
  return json
}

router.get('/', async (req, res, next) => {
  try {
    const ids = (await fs.readdir(config.configPath))
      .map(f => {
        const [id, ...e] = f.split('.')
        return e.join('.') === 'json' && utils.validateId(id) ? id : undefined
      })
      .filter(id => id)
    const promises = ids.map(id => readJson(id))
    const quizzes = (await Promise.all(promises))
      .map(q => ({
        id: q.id,
        name: q.name
      }))
    res.json({ quizzes })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  if (!utils.validateId(id)) {
    res.status(400).json({ error: 'Invalid ID' })
    return
  }
  try {
    const quiz = await readJson(id)
    res.json(quiz)
  } catch (err) {
    next(err)
  }
})

module.exports = router
