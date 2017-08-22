/**
 * Created by parkjp on 2017-08-03.
 */

const jwt = require('jsonwebtoken');
const uniqueID = require('uniqid');
const jwtKey = process.env.jwtToken;

class JsonWebToken {

    static decode(token) {
        let decodedToken = jwt.verify(token, jwtKey);

        return decodedToken;
    }

    static createJwtToken(userIdx) {
        let time = new Date().getTime();
        let token = {
            "user_idx" : userIdx,
            "iat" : time,
            "dt" : uniqueID(time)
        };

        return jwt.sign(token, jwtKey);
    }
}

module.exports = JsonWebToken;