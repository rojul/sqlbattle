const express = require('express')

const utils = require('../utils')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const ids = await utils.findFilesWithExt('json')
    const promises = ids.map(id => utils.readJson(id))
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
    const quiz = await utils.readJson(id)
    res.json(quiz)
  } catch (err) {
    next(err)
  }
})

module.exports = router
