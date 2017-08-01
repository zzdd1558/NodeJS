const HttpRequest = require('../utils/HttpRequest');
const clientId = '393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com';


class Google {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        let header = {'Authorization': `Bearer ${accessToken}`};

        http.setHeaders(header);

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    getLoginUrl() {

    }
}

module.exports = Google;