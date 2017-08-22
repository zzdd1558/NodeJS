
const Procedure = require('./lib/procedure');

Procedure.AUTH.LOGIN = Procedure.prototype.AUTH.LOGIN = (userEmail, userPassword) => {
    return `Login(${userEmail}, ${userPassword})`;
};

Procedure.AUTH.SOCIAL_LOGIN = Procedure.prototype.AUTH.SOCIAL_LOGIN = (userEmail, socialType) => {
    return `SocialLogin(${userEmail}, ${socialType})`;
};

Procedure.AUTH.SIGNUP = Procedure.prototype.AUTH.SIGNUP = (userNickname, userPassword, userEmail) => {
    return `SignUp(${userNickname}, ${userPassword}, ${userEmail})`;
};

Procedure.AUTH.EMAIL_CHECK = Procedure.prototype.AUTH.EMAIL_CHECK = (userEmail) => {
    return `EmailCheck(${userEmail})`;
};

module.exports = Procedure.AUTH;