const HttpRequest = require('../utils/HttpRequest');

class Facebook {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = `https://graph.facebook.com/me?access_token=${accessToken}`;

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }
}

module.exports = Facebook;