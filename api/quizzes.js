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

router.get('/:id', utils.validateIdMiddleware, async (req, res, next) => {
  const id = req.params.id
  try {
    const quiz = await utils.readJson(id)
    res.json(quiz)
  } catch (err) {
    next(err)
  }
})

module.exports = router
