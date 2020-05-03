[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hirle_gpio-web-console&metric=alert_status)](https://sonarcloud.io/dashboard?id=hirle_gpio-web-console)[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=hirle_gpio-web-console&metric=coverage)](https://sonarcloud.io/dashboard?id=hirle_gpio-web-console)



# GPIO web console

Ease the control gpio pins through a simple web application

## Installation

Create a nologin user gpio-web-console
Register the gpio-web-console.service, this file may require adaptation for your host

## Running

** API is about good to run **
** web is still under development, it only displays the status **


### Prepare a config file

This file named `config.json` must look like
```javascript
{
    "port": 3040,
    "gpio": [
      {
        "pin": 21,
        "id": "freebox",
        "name": "Freebox",
        "mode": "PULSE"
      },
      {
        "pin": 20,
        "id": "tm",
        "name": "Time Machine",
        "mode": "TWOSTATES"
      },
      {
        "pin": 26,
         "id": "cour",
        "name": "Caméra cour",
        "mode": "TWOSTATES"
      },
      {
        "pin": 16,
         "id": "notused",
        "name": "(Not used)",
        "mode": "NOTWIRED"
      }
    ]
  }
```

### Run

`npm install`
`npm start`

## API

### Get all states

Request:

`GET /api/gpio`

Response:
```javascript
[
		{
  		"pin": 21,
  		"id": "freebox",
	 	"name": "Freebox",
		 "state": true,
        "mode": "PULSE"
  	},
	{
		"pin": 20,
		"id": "tm",
		"name": "Time Machine",
		"mode": "TWOSTATES"
	},
  	{
  		"pin": 26,
  		"id": "notwired",
	 	"name": "(not used)",
		"state": false,
        "mode": "NOTWIRED"
  	}
]
```


### Change state

Request:
`PUT /api/gpio?id=freebox&state=true`


### Pulse

During 1 second, the state is on, then it comes back to off.

Request:
`PUT /api/gpio/freebox/pulse`
