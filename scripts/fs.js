const fs = require('fs');
const path = require('path');

// sync creation
fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {
	recursive: true,
});

console.log('-START-');

// async creation
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

// async deletion
fs.rmdir(
	path.resolve(__dirname, 'dir'),
	{
		recursive: true,
	},
	(error) => {
		if (error) {
			throw err;
		}
	},
);

// sync deletion
// fs.rmdirSync(path.resolve(__dirname, 'sdir'), {
// 	recursive: true,
// });

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

// async writing (promises)
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

writeFileAsync(path.resolve(__dirname, 'tmp.txt'), 'hello')
	.then(appendFileAsync(path.resolve(__dirname, 'tmp.txt'), ' (append)'))
	.then(appendFileAsync(path.resolve(__dirname, 'tmp.txt'), ' (another append)'))
	.catch((errorMessage) => console.error(errorMessage));

// async reading (promises)
const readFileAsync = async (path) => {
	return new Promise((resolve, reject) =>
		fs.readFile(path, (error) => {
			if (error) {
				return reject(err.message);
			}
			resolve();
		}),
	);
};

