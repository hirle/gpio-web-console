const express = require('express')
const expressJson = require('express-json')
const http = require('http')

module.exports = class Web {
  constructor (config) {
    this.app = express()
    this.config = config
    this.server = http.Server(this.app)
    this.controller = null
  }

  startOn (controller) {
    this.controller = controller
    this.app.use('/static', express.static('static'))
    this.app.use(expressJson())
    this.app.all('*', (req, res, next) => {
      console.log(req.method + ' ' + req.url)
      next()
    })
    this.app.get('/', (req, res) => {
      res.redirect('/static/homepage.html');
    })
    this.app.get('/api/gpio', (req, res) => {
      res.send(this.controller.getAllGpio());
    })

    this.app.put('/api/gpio', (req, res, next) => {
      const id = req.query.id
      const newState = ['on', 'up', 'true', '1'].includes(
        req.query.on.toLowerCase()
      )

      this.controller
        .setGpioById(id, newState)
        .then(ret => {
          res.send('OK')
        })
        .catch(next)
    })

    this.setupBonjourAdverstisment()

    this.server.listen(this.config.port, () => {
      console.log('Listening on %d', this.server.address().port)
    })
  }

  setupBonjourAdverstisment () {}
}
