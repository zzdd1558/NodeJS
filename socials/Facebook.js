const HttpRequest = require('../utils/HttpRequest');

class Facebook {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        console.log(accessToken);
        let profileApiUrl = `https://graph.facebook.com/me?fields=name,email,birthday,gender&access_token=${accessToken}`;

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }
}

module.exports = Facebook;