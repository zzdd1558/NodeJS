
class HttpResponse {

    constructor(statusCode) {
        this.additionalData = new Object();
        this.statusCode = statusCode;
        switch (this.statusCode) {
            case StatusCode.OK :
                break;
            case StatusCode.PARAMETER_WRONG :
                this.description = 'Parameter is wrong';
                break;
            case StatusCode.NOT_AUTHORIZED :
                this.description = 'Not Authorized';
                break;
            case StatusCode.LOGIN_FAIL :
                this.description = 'Login Failed';
                break;
            case StatusCode.NOT_EXIST :
                this.description = 'Not Exist';
                break;
            case StatusCode.EXPIRED_AUTHORIZATION :
                this.description = 'Expired Authorization';
                break;
            case StatusCode.UNEXPECTED :
                this.description = 'Unexpected Error';
                break;
        }
    }

    addData(key, value) {
        this.additionalData[key] = value;
        return this;
    }

    getData(key) {
        return this.additionalData[key];
    }

    getStatusCode() {
        return this.statusCode;
    }
}

const StatusCode = {
    OK : 200,
    PARAMETER_WRONG : 400,
    NOT_AUTHORIZED : 401,
    LOGIN_FAIL : 403,
    NOT_EXIST : 404,
    EXPIRED_AUTHORIZATION : 440,
    UNEXPECTED : 500
};


module.exports = HttpResponse;
module.exports.StatusCode = StatusCode;
