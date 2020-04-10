import express from 'express';
import expressJson from 'express-json';
import { Server } from 'http';
import socketIO from 'socket.io';
import Controller from './Controller';
import Config from './Config';

export default class Web {

  config: Config;
  app: express.Application;
  controller: Controller;
  server: Server;
  io: socketIO.Server;


  constructor(config: Config) {
    this.app = express()
    this.config = config;
    this.server = new Server(this.app)
    this.io = socketIO(this.server);
    this.controller = null
  }

  startOn(controller) {
    this.controller = controller
    this.app.use('/static', express.static('static'))
    this.app.use(expressJson())
    this.app.all('*', (req, res, next) => {
      console.log(req.method + ' ' + req.url)
      next()
    })
    this.app.get('/', (req, res) => {
      res.redirect('/static/index.html');
    })

    this.setAPIRoutes();

    this.setupBonjourAdverstisment()

    this.server.listen(this.config.port, () => {
      console.log('Listening on %s', this.server.address().toString())
    });

    this.setSocketIO();
  }

  setAPIRoutes() {

    this.app.get('/api/gpio', (req, res) => {
      res.send(this.controller.getAllGpio());
    });

    this.app.put('/api/gpio', (req, res, next) => {

      const requiredArguments = ['id', 'state'];
      // check required arguments
      requiredArguments.forEach(requiredArg => {
        if (!Object.keys(req.query).includes(requiredArg)) {
          throw new Error('missing argument :' + requiredArg);
        }
      })

      const id = req.query.id;
      const newState = ['on', 'up', 'true', '1'].includes(req.query.state.toString().toLowerCase());

      this.controller
        .setGpioById(id, newState)
        .then(() => {
          // HTTP_STATUS_NO_CONTENT
          res.sendStatus(204);
        })
        .catch(next);
    });

    this.app.put(/^\/api\/gpio\/(\w+)\/pulse$/, (req, res, next) => {

      const id = req.params[0];

      this.controller.pulseOneSecondGpio(id)
        .then(() => {
          res.statusCode = 204;
          res.send();
        })
        .catch(next);
    });
  }

  emitUpdate() {
    this.io.emit('update', this.controller.getAllGpio());
    return Promise.resolve();
  }

  setupBonjourAdverstisment() { }

  setSocketIO() {
    this.io.on('connection', socket => {
      socket.send(this.controller.getAllGpio());
    });
  }
}
