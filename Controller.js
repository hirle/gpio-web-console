module.exports = class Controller {
	constructor( config, webConnector, gpioConnector ) {

		this.config = config;
		this.webConnector = webConnector;
		this.gpioConnector = gpioConnector;
	}

	startOn (){
	  console.log('web starting');
	  this.webConnector.startOn(this);
	  console.log('web started on');
	} 
	
	setGpioById(id, newState){
	  return this.gpioConnector.setGpioById(id, newState);
	}  

	getAllGpio(){
	  return this.gpioConnector.getAllGpio();	
	}  
}