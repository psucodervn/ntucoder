'use strict'

const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))

    app.use('/public', publicPath)
    app.get('/solved', getSolved)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}

function getSolved (req, res) {
  const username = req.query.username
  if (!username || username === '') {
    makeJSONResponse(res, [])
    return
  }
  fetch(`http://laptrinh.ntu.edu.vn/Submission/CoderProblemSolved/${username}`)
    .then(response => response.text())
    .then(body => {
      let $ = cheerio.load(body, {
        decodeEntities: true
      })
      let data = {}
      const patt = new RegExp('/Problem/Details/(\\d+)')
      const patt2 = new RegExp('\\d+')
      const rows = $('tr td.left a')
      rows.each((i, ele) => {
        const link = $(ele).attr('href')
        const name = $(ele).text().trim()
        if (patt.test(link)) {
          const id = parseInt(patt2.exec(link)[0])
          data[id] = {
            name: name
          }
        }
      })
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(data))
    })
    .catch(error => {
      makeJSONResponse(res, error)
    })
}

function makeJSONResponse (res, obj) {
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify(obj))
}
