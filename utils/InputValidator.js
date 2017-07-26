const socialType = require('../socials/SocialFactory').socialType;

class InputValidator {

    static isValidSocialType(type) {
        return (type == socialType.NAVER || type == socialType.FACEBOOK || type == socialType.GOOGLE || type == socialType.KAKAO);
    }

    static validate(value, regex) {
        return regex.test(value) && this.isset(value);
    }

    static isset(value) {
        return !this.isUndefined(value) && (value.length > 0 || value > 0);
    }

    static isUndefined(value) {
        return typeof value === 'undefined';
    }
}

module.exports = InputValidator;