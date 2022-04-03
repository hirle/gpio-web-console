import { Gpio } from 'onoff';

/**
 * Gpio logic is inverted, 1 = off, 0 = on
 */
const UP = 0
const DOWN = 1

class Pin {

  readonly id: string;
  readonly pin: number;
  readonly name: string;
  readonly state: number;
  readonly mode: string;
  readonly gpio: Gpio;

  constructor( id: string, pin: number, name: string, state: number, mode: string, gpio: Gpio ) {
    this.id = id;
    this.pin = pin;
    this.name = name;
    this.state = state;
    this.mode = mode;
    this.gpio = gpio;   
  }
} 

export default class GpioConnector {

  pins: Pin[];

  constructor (config) {
    this.pins = config.gpio.map(configPin => new Pin(
      configPin.id,
      configPin.pin,
      configPin.name,
      configPin.state,
      configPin.mode,
      new Gpio(configPin.pin.toString(), 'out')
      )
    );
  }

  setAllDown() {
    // set all gpio down
    return Promise.all(this.pins.map( pin => this.writeGpio(pin, DOWN)));
  }

  getAllGpio () {
    return this.pins.map(pin => ({
      id: pin.id,
      pin: pin.pin,
      name: pin.name,
      state: pin.state === UP,
      mode: pin.mode
    }))
  }

  setGpioById (id: string, newState: number) {
    const pin = this.pins.filter(pinToFilter => pinToFilter.id === id).pop()
    if (pin) {
      return this.writeGpio(pin, newState ? UP : DOWN);
    } else {
      return Promise.reject(new Error('gpio id ' + id + ' not found'))
    }
  }


  writeGpio (pin, state) {
    return new Promise((resolve, reject) => {
      pin.gpio.write(state, err => {
        if (err) {
          reject(new Error('could switch gpio to ' + state + ' ' + pin.gpio))
        } else {
          pin.state = state
          resolve(state)
        }
      })
    })
  }
}
