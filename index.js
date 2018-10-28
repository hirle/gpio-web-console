const Web = require('./Web');
const Controller = require('./Controller');
const GpioConnector = require('./GpioConnector');


const config = require('./config.json');

const gpioConnector = new GpioConnector( config );
const webConnector = new Web( config );

const controller = new Controller(
  config,
  webConnector,
  gpioConnector);

controller.startOn();