exports.validateId = id => typeof id === 'string' && /^[a-z0-9]+$/.test(id)

exports.escapeUnderscore = s => s.replace(/_/g, '\\_')
