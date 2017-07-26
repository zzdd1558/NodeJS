/**
 * Created by parkjp on 2017-07-26.
 */

class Parameter {

    static get(param, defaultValue = '') {
        if(this.isInvalidParamters(param))
            param = defaultValue;

        return param.trim();
    }

    static getInt(param, defaultValue = 0) {
        if(this.isInvalidParamters(param))
            param = defaultValue;

        if(!(Number.isInteger(param) || Number.isSafeInteger(param)))
            throw new Error(`${param} is not integer value`);

        return parseInt(param);
    }

    static getLowerCase(param, defaultValue = '') {
        return this.get(param, defaultValue).toLowerCase();
    }

    static isInvalidParamters(param) {
        return (typeof param === 'undefined' || param == null);
    }
}

module.exports = Parameter;