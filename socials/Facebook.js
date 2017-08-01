const HttpRequest = require('../utils/HttpRequest');
const appId = '1885966198315995';
const redirectUri = '/social/auth';
class Facebook {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = `https://graph.facebook.com/me?fields=id%2Cname%2Cemail%2Cbirthday&access_token=${accessToken}`;

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    getLoginUrl() {
        return `https://www.facebook.com/v2.10/dialog/oauth?client_id=${appId}&display=popup&response_type=token&redirect_uri=${redirectUri}&scope=email%2Cpublic_profile%2Cuser_birthday`;
    }
}

module.exports = Facebook;