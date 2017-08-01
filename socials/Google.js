const HttpRequest = require('../utils/HttpRequest');

class Google {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        let header = {'Authorization': `Bearer ${accessToken}`};

        http.setHeaders(header);

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

}

module.exports = Google;