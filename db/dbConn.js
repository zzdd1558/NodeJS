const mysql = require('mysql');
const config = require('./dbInfo').local;

module.exports = (function() {
  return {
    init: function() {
      return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database
      })
    },

    testConn: function(con) {
      con.connect(function(err) {
        if (err) {
          console.error('mysql connection error ' + err);
        } else {
          console.info('mysql is connected successfully.');
        }
      });
    }
  }
})();
