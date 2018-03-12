/* eslint-env mocha */
const { expect } = require('chai')
const supertest = require('supertest')

const app = require('../app')

const request = supertest(app)

describe('query', function () {
  it('correct answer', async function () {
    const res = await request.post('/api/query').send({
      db: 'fussball',
      sql: 'select Nachname from spieler where Rueckennummer = 1 and TeamID = 1',
      answer: 'SELECT Nachname FROM spieler WHERE TeamID = 1 AND Rueckennummer = 1;'
    })
    expect(res.body).deep.equal({
      result: {
        fields: ['Nachname'],
        rows: [['Zobel']]
      },
      correct: true
    })
    expect(res.statusCode).to.equal(200)
  })

  it('wrong answer', async function () {
    const res = await request.post('/api/query').send({
      db: 'fussball',
      sql: 'select 1',
      answer: 'select 2'
    })
    expect(res.body).deep.equal({
      result: {
        fields: ['1'],
        rows: [[1]]
      },
      correct: false
    })
    expect(res.statusCode).to.equal(200)
  })

  it('columns with the same name', async function () {
    const res = await request.post('/api/query').send({
      db: 'fussball',
      sql: `select 1, 2 as '1'`
    })
    expect(res.body).deep.equal({
      result: {
        fields: ['1', '1'],
        rows: [[1, 2]]
      }
    })
    expect(res.statusCode).to.equal(200)
  })

  it('invalid sql', async function () {
    const res = await request.post('/api/query').send({
      db: 'fussball',
      sql: 'bla'
    })
    expect(res.body).deep.equal({
      error: `You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'bla' at line 1`
    })
    expect(res.statusCode).to.equal(500)
  })
})
