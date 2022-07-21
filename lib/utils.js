const path = require('path');
const { readdir, stat } = require('fs/promises');


function getDirectory() {
	return path.join(__dirname, '../data');
}

async function getDirectorySize(directory = getDirectory()) {
	const files = await readdir(directory);
	const stats = files.map( file => stat( path.join( directory, file ) ) );
	const directorySize = Promise.all(stats);
	return (await directorySize).reduce((acc, { size }) => acc += size, 0);
}

getDirectorySize();

module.exports = {
	getDirectory,
	getDirectorySize
};


