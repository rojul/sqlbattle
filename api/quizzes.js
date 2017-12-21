const express = require('express')

const files = require('../lib/files')
const middleware = require('../lib/middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const ids = await files.findFilesWithExt('json')
    const promises = ids.map(id => files.readJson(id))
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

router.get('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  try {
    const quiz = await files.readJson(id)
    res.json(quiz)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  const { name, db, questions } = req.body
  try {
    await files.writeJson(id, { name, db, questions })
    res.json({ })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', middleware.validateId, async (req, res, next) => {
  const id = req.params.id
  try {
    await files.removeFile(id, 'json')
    res.json({ })
  } catch (err) {
    next(err)
  }
})

module.exports = router
