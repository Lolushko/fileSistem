const { createLogger, transports, format } = require('winston');


const logger = createLogger({
	transports:[
		new transports.File({
			filename: 'coustomer.log',
			level: 'info',
			format: format.combine(format.timestamp(), format.json())
		}),
		new transports.File({
			filename: 'customer-error.log',
			level: 'error',
			format: format.combine(format.timestamp(), format.json())
		})
	]
});

module.exports = logger;
