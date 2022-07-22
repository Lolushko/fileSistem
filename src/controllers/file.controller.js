const FileService = require('../services/file.service');
const { getDirectorySize } = require('/Users/user/Desktop/file.server/lib/utils.js')


class FileController {
	constructor(fileService = new FileService()) {
		this.service = fileService;
	}
	async put(req, res) {
		try {
			const name = req.params.name; 
			const {data, ...meta} = req.file; 
			await this.service.put(name, data, meta);
			getDirectorySize().then(size => {
				if (+size + +req.file.size > 1e+7) {
					res.json({status: 'ok', Warning:` directory size ${+req.file.size + +size}`});
				} else {
					res.json({status: 'ok'});
				}
			});
		} catch (err) {
			res.json({status: 'error'});
		}
	}
  
	async get(req, res) {
		try {
			const name = req.params.name;
			const {stream,  meta} = await this.service.get(name);
			res.setHeader('content-type', meta.mimetype);
			res.setHeader('content-length', meta.size); 
			stream.pipe(res);
		} catch (err) {
			res.json({status: 'error, file not found'});
		}
	}
}

module.exports = FileController;