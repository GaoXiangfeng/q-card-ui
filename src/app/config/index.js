var _exports = {};
// _exports.env = require('./production.config.js')
_exports.env = process.env.NODE_ENV === 'production' ? require('./production.config') : require('./env.config.js');

module.exports = _exports;
