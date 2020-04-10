import Web from './Web';
import Config from './Config';
import GpioConnector from './GpioConnector';

export default class Controller {
  
  webConnector: Web;
  config: Config;
  gpioConnector: GpioConnector;

  constructor(config, webConnector, gpioConnector) {
    this.config = config
    this.webConnector = webConnector
    this.gpioConnector = gpioConnector
  }

  startOn() {
    console.log('web starting')
    this.webConnector.startOn(this)
    console.log('web started on')
    this.gpioConnector.setAllDown()
  }

  setGpioById(id, newState) {
    return this.gpioConnector.setGpioById(id, newState)
      .then( arg => {
        return this.webConnector.emitUpdate()
          .then( () => arg );
    });
  }

  getAllGpio() {
    return this.gpioConnector.getAllGpio();
  }

  pulseOneSecondGpio(id) {

    const oneSecond = 1000;

    return this.setGpioById(id, true)
      .then(() => Controller.sleepPromise(oneSecond))
      .then(() => this.setGpioById(id, false));
  }

  static sleepPromise(delayMs) {
    return new Promise(resolve => setTimeout(resolve, delayMs));
  }
}