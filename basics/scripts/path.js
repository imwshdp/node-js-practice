const path = require('path');

console.log('path.join __dirname:', path.join(__dirname, '/'));
console.log('path.join __filename:', path.join(__filename, '/'));

console.log('path.resolve:', path.resolve('first', 'second'));

const fullpath = path.resolve('first', 'second');
console.log('path.parse: ', path.parse(fullpath));

