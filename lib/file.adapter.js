const fs = require('fs');
const logger = require('./logger');
const  { getDirectorySize } = require('./utils');

class FileAdapter {
	constructor() {
		this.dir = (name) => './data/' + name;
		this.logger = logger;
	}
	put(name, data) {
		return new Promise((resolve, reject) => {
			const stream = fs.createWriteStream(this.dir(name));
			this.logger.info('Started uploads file');
			stream.write(data);
			stream.on('error', err => {
				this.logger.error(err);
				reject(err);
			});
			getDirectorySize().then(size => { 
				this.logger.info(`End writing the file (data directory size ${size+data.length} bytes)`);
			}); 
			resolve({ name }); 
		});
	}
	get(name) {
		return fs.createReadStream(this.dir(name));
	}
}
module.exports = FileAdapter;
