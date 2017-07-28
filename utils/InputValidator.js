const socialType = require('../socials/SocialFactory').socialType;

class InputValidator {

    static isValidEmail(email) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return this.validate(email, regex);
    }

    static isValidPassword(password) {
        let regex = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;

        return this.validate(password, regex);
    }

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