
class HttpResponse {
    
    constructor(statusCode) {
        this.additionalData = new Object();
        this.statusCode = statusCode;
        switch (this.statusCode) {
            case StatusCode.OK :
                break;
            case StatusCode.NOT_EXIST :
                this.description = 'Not Exist';
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
    NOT_EXIST : 404,
    UNEXPECTED : 500
};


module.exports = HttpResponse;
module.exports.StatusCode = StatusCode;