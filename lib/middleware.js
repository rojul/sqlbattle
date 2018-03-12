const utils = require('./utils')
const config = require('./config')

exports.validateId = (req, res, next) => {
  if (!utils.validateId(req.params.id)) {
    res.status(400).json({ error: 'Invalid ID' })
    return
  }
  next()
}

exports.checkToken = (req, res, next) => {
  const token = req.headers['x-config-token']
  if (config.configToken === '' || token === config.configToken) {
    next()
    return
  }
  const error = token ? 'Token incorrect' : 'Token required'
  res.status(401).json({ error })
}
