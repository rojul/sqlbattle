const fs = require('fs-extra')
const path = require('path')

const config = require('./config')
const utils = require('./utils')

const getPath = (id, ext) => path.join(config.configPath, `${id}.${ext}`)

exports.findFilesWithExt = async ext => {
  return (await fs.readdir(config.configPath))
    .map(f => {
      const [id, ...e] = f.split('.')
      return e.join('.') === ext && utils.validateId(id) ? id : undefined
    })
    .filter(id => id)
}

exports.readSqlFile = async id => {
  return fs.readFile(getPath(id, 'sql'), 'utf8')
}

exports.readJson = async id => {
  return Object.assign({ id }, await fs.readJson(getPath(id, 'json')))
}

exports.writeSqlFile = async (id, data) => {
  return fs.writeFile(getPath(id, 'sql'), data)
}

exports.writeJson = async (id, obj) => {
  await fs.writeJson(getPath(id, 'json'), obj, { spaces: 2 })
}

exports.removeFile = async (id, ext) => {
  await fs.remove(getPath(id, ext))
}
