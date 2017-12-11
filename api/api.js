const express = require('express')

const { version, description } = require('../package.json')
const quizzes = require('./quizzes')

const router = express.Router()

router.use('/quizzes', quizzes)

router.get('/', (req, res, next) => {
  res.json({ version, description })
})

module.exports = router
