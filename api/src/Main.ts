import fs from 'fs';
import Web from './Web';
import Config from './Config';
import GpioConnector from './GpioConnector';
import Controller from './Controller';

export function main(argv: string[]): number {

    const config = processArgv(argv);

    const gpioConnector = new GpioConnector(config)
    const webConnector = new Web(config)

    const controller = new Controller(
        config,
        webConnector,
        gpioConnector)

    controller.startOn()

    return 0
}

function processArgv(argv: string[]): Config {
    if (argv.length < 3) {
      throw new Error('missing argument: ./path/to/config.json');
    } else {
      return JSON.parse(fs.readFileSync(argv[2], 'utf8'));
    }
  }