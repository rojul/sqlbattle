const utils = require('./utils')

exports.validateId = (req, res, next) => {
  if (!utils.validateId(req.params.id)) {
    res.status(400).json({ error: 'Invalid ID' })
    return
  }
  next()
}
