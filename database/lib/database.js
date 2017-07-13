
const mysql = require('promise-mysql');

class Database {

    constructor() {
        this.pool = mysql.createPool(config);
    }

    async call(query) {
        let connection = await this.pool.getConnection();
        let result = await connection.query(query);  // async, await 방식

        // return this.pool.query(query).then((results)=>{   // promise 방식
        //     return results;
        // });

        return result;
    }
}

const config = {
    host:'35.189.190.250',
    port : '3306',
    user : 'root',
    password : '1q2w3e4r!@',
    database : 'member'
};

module.exports = Database;