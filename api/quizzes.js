const express = require('express')
const Joi = require('joi')

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
  try {
    const obj = await Joi.validate(req.body, quizSchema)
    await files.writeJson(id, obj)
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

const quizSchema = Joi.object({
  name: Joi.string().required(),
  db: Joi.string().required(),
  questions: Joi.array().items(Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    help: Joi.string()
  }).required()).min(1).required()
}).required()

module.exports = router
