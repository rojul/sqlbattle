const express = require('express')

const { version, description } = require('../package.json')
const query = require('./query')
const quizzes = require('./quizzes')
const logger = require('../logger')

const router = express.Router()

router.use('/query', query)
router.use('/quizzes', quizzes)

router.get('/', (req, res, next) => {
  res.json({ version, description })
})

router.all('*', (req, res) => {
  res.status(404).json({ error: 'Resource Not Found' })
})

router.use((err, req, res, next) => {
  logger.error(err)
  if (res.headersSent) {
    next(err)
    return
  }
  res.status(500).json({ error: err.sqlMessage || err.message })
})

module.exports = router
