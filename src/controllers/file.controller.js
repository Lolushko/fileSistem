const MB = 1e+6;
const FileService = require('../services/file.service');
const { getDirectorySize } = require('../../lib/utils');


class FileController {
	constructor( fileService = new FileService()) {
		this.service = fileService;
	}
	async put(req, res) {
		try {
			const name = req.params.name;
			const { data, ...meta } = req.file; 
			console.log(this.name);
			await this.service.put(name, data, meta);
			getDirectorySize().then(size => {
				if (Number(req.file.size) + Number(size) > MB * 10) {
					res.json( { status: 'ok', Warning:'Attention, the directory size is more than 10 megabytes' } );
				} else {
					res.json( { status: 'ok' } );
				}
			});
		} catch (err) {
			console.log(err);
			res.json({ status: 'error' });
		}
	}
  
	async get(req, res) {
		try {
			const name = req.params.name;
			const { stream,  meta } = await this.service.get(name);
			res.setHeader('content-type', meta.mimetype);
			res.setHeader('content-length', meta.size); 
			stream.pipe(res);
		} catch (err) {
			res.json({status: 'error, file not found'});
		}
	}
}

module.exports = FileController;
