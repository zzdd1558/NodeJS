
const database = require('./lib/database');

module.exports = database;
module.exports.procedure = database.procedure;
module.exports.procedure.AUTH = database.procedure.AUTH;