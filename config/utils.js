const path = require('path');

exports.resolveRoot = (pathname) => path.resolve(__dirname, `../${pathname}`);
