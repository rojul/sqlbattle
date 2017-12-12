const express = require('express')
const fs = require('fs-extra')
const path = require('path')

const config = require('../config')

const router = express.Router()

const validateQuizId = id => /^[a-z0-9]+$/.test(id)

const readJson = async id => {
  const json = await fs.readJson(path.join(config.configPath, `${id}.json`))
  json.id = id
  return json
}

router.get('/', async (req, res, next) => {
  try {
    const ids = (await fs.readdir(config.configPath))
      .map(f => f.split('.'))
      .filter(f => f.length === 2 && f[1] === 'json' && validateQuizId(f[0]))
      .map(f => f[0])
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
  if (!validateQuizId(id)) {
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
