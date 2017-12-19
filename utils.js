const fs = require('fs-extra')
const path = require('path')

const config = require('./config')

exports.validateId = id => typeof id === 'string' && /^[a-z0-9]+$/.test(id)

exports.findFilesWithExt = async ext => {
  return (await fs.readdir(config.configPath))
    .map(f => {
      const [id, ...e] = f.split('.')
      return e.join('.') === ext && this.validateId(id) ? id : undefined
    })
    .filter(id => id)
}

exports.readSqlFile = async id => {
  return fs.readFile(path.join(config.configPath, `${id}.sql`), 'utf8')
}

exports.readJson = async id => {
  const json = await fs.readJson(path.join(config.configPath, `${id}.json`))
  json.id = id
  return json
}
