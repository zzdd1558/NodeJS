const HttpRequest = require('../utils/HttpRequest');
const SocialService = require('./SocialService');
const app_key = '0e34b26f5967894741aa1e4f97e1537b';
const clientSecret = '';

class Kakao extends SocialService{

    constructor(socialType) {
        super(socialType);
    }

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = 'https://kapi.kakao.com/v1/user/me';
        let header = {
            'Authorization': `Bearer {${accessToken}}`,
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        };

        http.setHeaders(header);

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    async getAccessToken(code) {
        let http = new HttpRequest();
        let tokenUrl = 'https://kauth.kakao.com/oauth/token';
        let params = {
            grant_type : 'authorization_code',
            client_id : app_key,
            redirect_uri : this.redirectUrl,
            code : code,
            client_secret : clientSecret
        };

        let result = await http.sendRequest(tokenUrl, params)
        let accessToken = result.access_token;

        return accessToken;
    }

    getLoginUrl() {
        return `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${app_key}&redirect_uri=${this.redirectUrl}&state=${this.state}`;
    }
}

module.exports = Kakao;