const express = require('express')

const { version, description } = require('../package.json')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.json({ version, description })
})

module.exports = router
