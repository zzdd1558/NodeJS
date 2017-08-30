
const mysql = require('promise-mysql');
const config = {
    host:'35.189.190.250',
    port : '3306',
    user : 'root',
    password : '1q2w3e4r!@',
    database : 'blog'
};

const Procedure = require('./procedure');
const pool = mysql.createPool(config);

class Database {

    static async getConnection() {
        return await pool.getConnection();
    }

    static async call(query) {
        let connection = await this.getConnection();
        let result = await connection.query(query);

        return result;
    }

    static async testCall(query,value) {
        let connection = await this.getConnection();
        let result = await connection.query(query, value);

        return result;
    }

    static async callProcedure(procedureName) {
        let connection = await this.getConnection();
        let procedure = `CALL ${procedureName}`;

        let result = await connection.query(procedure);

        return result;
    }
}

const databaseStatusCode = {
    OK : 1,
    LOGIN_FAIL : -1
};

module.exports = Database;
module.exports.StatusCode = databaseStatusCode;
module.exports.procedure = Procedure;