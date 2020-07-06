// nodemon crashes the first time it doesn't find the dist/server.js file
// This is just a shim to avoid the issue
const fs = require('fs');

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
  fs.writeFileSync('./dist/server.js', '');
}
