/**
 * Created by parkjp on 2017-08-03.
 */

const InputValidator = require('./utils/InputValidator');
const HttpStatusCode = require('./utils/HttpResponse').StatusCode;
const JWT = require('./utils/JsonWebToken');
const JWT_EXPIRE_TIME = 86400000; // 24 hours
const skipApiRouteArray = ['auth'];

function isSkip(route) {
    let skip = false;
    let seperatedRouteBySlash = route.split('/');
    let apiRoute = seperatedRouteBySlash[1];

    if(skipApiRouteArray.includes(apiRoute)) {
        skip = true;
    }

    return skip;
}

module.exports = (req, res, next) => {
    let routeName = req._parsedUrl.pathname;

    try {
        if(!isSkip(routeName)) {
            let authHeader = req.headers['authorization'];
            if(!InputValidator.isset(authHeader)) {
                throw new Error();
            }

            let jwt = authHeader.split(' ')[1];
            if(!InputValidator.isset(jwt)) {
                throw new Error();
            }

            let token = JWT.decode(jwt);
            let userIdx = token['user_idx'];
            let iat = token['iat'];
            let deviceToken = token['dt'];

            if(!InputValidator.isValidIndexValue(userIdx) || !InputValidator.isset(iat) || !InputValidator.isset(deviceToken)) {
                throw new Error();
            }

            let time = new Date().getTime();
            if(iat >= time) {
                throw new Error();
            }

            if(iat + JWT_EXPIRE_TIME < time) {
                return res.status(HttpStatusCode.EXPIRED_AUTHORIZATION).end();
            }

            req.userIdx = parseInt(userIdx);
            next();
        }
    } catch (e) {
        res.status(HttpStatusCode.NOT_AUTHORIZED).end();
    }
};