const HttpRequest = require('../utils/HttpRequest');
const SocialService = require('./SocialService');
const appId = '1885966198315995';
const clientSecret = '4834c734b570b6c044455509070eeaf9';

class Facebook extends SocialService{

    constructor(socialType) {
        super(socialType);
    }

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = `https://graph.facebook.com/me?fields=gender%2Cname%2Cemail%2Cbirthday&access_token=${accessToken}`;

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    async getAccessToken(code) {
        let http = new HttpRequest();
        let tokenUrl = `https://graph.facebook.com/oauth/access_token?client_id=${appId}&redirect_uri=${this.redirectUrl}&client_secret=${clientSecret}&code=${code}`;

        let result = await http.sendRequest(tokenUrl, {}, 'GET');
        let accessToken = result.access_token;

        return accessToken;
    }

    getLoginUrl() {
        return `https://www.facebook.com/v2.10/dialog/oauth?client_id=${appId}&display=popup&response_type=code&redirect_uri=${this.redirectUrl}&scope=email%2Cpublic_profile%2Cuser_birthday&state=${this.state}`;
    }
}

module.exports = Facebook;