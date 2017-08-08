
const Procedure = require('./lib/procedure');

Procedure.AUTH.SIGNUP = Procedure.prototype.AUTH.SIGNUP = (userNickname, userPassword, userEmail) => {
    return `SignUp(${userNickname}, ${userPassword}, ${userEmail})`;
};

Procedure.AUTH.EMAIL_CHECK = Procedure.prototype.AUTH.EMAIL_CHECK = (userEmail) => {
    return `EmailCheck(${userEmail})`;
};

module.exports = Procedure.AUTH;