const requestPromise = require('request-promise');

class HttpRequest {

    constructor() {
        this.options = {
            method: '',
            uri: '',
            headers: {},
            json: true
        };
    }

    async sendRequest(url, fields = {}, method = 'POST') {
        this.options.uri = url;
        this.options.form = fields;
        this.options.method = method;

        return await requestPromise(this.options);
    }

    setHeaders(header) {
        console.log("Abc");
        this.options.headers = header;
    }

}

module.exports = HttpRequest;
