
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

    static async callProcedure(procedureName) {
        let connection = await this.getConnection();
        let procedure = `CALL ${procedureName}`;

        let result = await connection.query(procedure);

        return result;
    }
}

module.exports = Database;
module.exports.procedure = Procedure;