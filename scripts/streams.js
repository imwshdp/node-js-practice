const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, '../data/content.txt'), (error, data) => {
	if (error) {
		throw error;
	}
	console.log('\n---ALL DATA---\n', data, '\n');
});

// read readStream
const readStream = fs.createReadStream(path.resolve(__dirname, '../data/content.txt'));

readStream.on('data', (chunk) => {
	console.log('\nCHUNK', chunk);
});

readStream.on('open', () => {
	console.log('\n---readStream OPEN---');
});

readStream.on('end', () => {
	console.log('\n---readStream END---');
});

readStream.on('error', (error) => {
	console.log('\n---readStream ERROR---\n', error);
});

// write readStream
const writeStream = fs.createWriteStream(path.resolve(__dirname, '../data/content_write.txt'));

for (let index = 0; index < 20; index++) {
	writeStream.write(`${index + 1}\n`);
}

writeStream.end();

