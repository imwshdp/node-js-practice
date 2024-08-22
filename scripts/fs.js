const fs = require('fs');
const path = require('path');

// sync directory creation
fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {
	recursive: true,
});

console.log('-START-');

// async directory creation
fs.mkdir(
	path.resolve(__dirname, 'sdir', 'sdir2', 'sdir3'),
	{
		recursive: true,
	},
	(error) => {
		if (error) {
			console.error(error);
		} else {
			console.log('-FOLDER IS CREATED-');
		}
	},
);

console.log('-END-');

// async directory deletion
// fs.rmdir(
// 	path.resolve(__dirname, 'sdir'),
// 	{
// 		recursive: true,
// 	},
// 	(error) => {
// 		if (error) {
// 			throw error;
// 		}
// 	},
// );

// sync directory deletion
fs.rmdirSync(path.resolve(__dirname, 'dir'), {
	recursive: true,
});

// async writing
// fs.writeFile(path.resolve(__dirname, 'tmp.txt'), 'hello', (error) => {
// 	if (error) {
// 		throw err;
// 	} else {
// 		fs.appendFile(path.resolve(__dirname, 'tmp.txt'), ' (appended)', (error) => {
// 			if (error) {
// 				throw err;
// 			}
// 		});
// 	}
// });

// async file writing
const writeFileAsync = async (path, data) => {
	return new Promise((resolve, reject) =>
		fs.writeFile(path, data, (error) => {
			if (error) {
				return reject(err.message);
			}
			resolve();
		}),
	);
};

const appendFileAsync = async (path, data) => {
	return new Promise((resolve, reject) =>
		fs.appendFile(path, data, (error) => {
			if (error) {
				return reject(err.message);
			}
			resolve();
		}),
	);
};

// async file reading
const readFileAsync = async (path) => {
	return new Promise((resolve, reject) =>
		fs.readFile(
			path,
			{
				encoding: 'utf-8',
			},
			(error, data) => {
				if (error) {
					return reject(err.message);
				}

				return resolve(data);
			},
		),
	);
};

// async file deleting
const removeFileAsync = async (path) => {
	return new Promise((resolve, reject) =>
		fs.rm(path, (error) => {
			if (error) {
				return reject(err.message);
			}
			return resolve();
		}),
	);
};

writeFileAsync(path.resolve(__dirname, 'tmp.txt'), 'hello')
	.then(() => appendFileAsync(path.resolve(__dirname, 'tmp.txt'), ' (append)'))
	.then(() => appendFileAsync(path.resolve(__dirname, 'tmp.txt'), ' (another append)'))
	.then(() => readFileAsync(path.resolve(__dirname, 'tmp.txt')))
	.then((data) => console.log('tmp.txt data: ', data))
	.then(() => removeFileAsync(path.resolve(__dirname, 'tmp.txt')))
	.then(() => console.log('tmp.txt deleted'))
	.catch((errorMessage) => console.error(errorMessage));

console.log('\n---\n');

// practice
// const dotenv = require('dotenv');
// dotenv.config();
const text = process.env.TEXT ?? 'hello from code';

writeFileAsync(path.resolve(__dirname, 'practice.txt'), text)
	.then(() => readFileAsync(path.resolve(__dirname, 'practice.txt')))
	.then((data) => data.split(' ').length)
	.then((count) => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Кол-во слов: ${count.toString()}`))
	.then(() => removeFileAsync(path.resolve(__dirname, 'practice.txt')));

