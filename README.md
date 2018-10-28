# GPIO web console

Ease the control gpio pins through a simple web application

## Installation

Create a nologin user gpio-web-console
Register the gpio-web-console.service, this file may require adaptation for your host

## Running

### Prepare a config file

This file named `config.json` must look like
```javascript
{
  "port": 3040,
  "gpio": [
  	{
  		"pin": 21,
  		"id": "freebox",
	 		"name": "Freebox"
  	},
  	{
  		"pin": 26,
	 		"name": "(not used)"
  	},
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
	 		"state": true
  	},
  	{
  		"pin": 26,
  		"id": null,
	 		"name": "(not used)",
	 		"state": false
  	}
]
```


### Change state

Request:
`PUT /api/gpio?id=freebox&on=true`

Response:
`OK`