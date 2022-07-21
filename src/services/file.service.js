class FileService {

	constructor(fileAdapter, fileModel) {
		this.fileAdapter = fileAdapter;
		this.model = fileModel;
	}

	async put(name, file, meta) {
		await this.model.updateOne({name}, {$set: {...meta, name}}, {upsert: true});
		return this.fileAdapter.put(name, file);
	}
  
	async get(name) {
		const meta = await this.model.findOne({name});
		return {
			meta, 
			stream: this.fileAdapter.get(name)
		};
	}
}

module.exports = FileService;