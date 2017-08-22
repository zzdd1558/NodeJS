const HttpRequest = require('../utils/HttpRequest');
const SocialService = require('./SocialService');
const clientId = '393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com';
const clientSecret = 'pDzSJJ9KBqeNkWiCAg76zhwP';

class Google extends SocialService {

    constructor(socialType) {
        super(socialType);
    }

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = 'https://www.googleapis.com/oauth2/v2/userinfo';
        let header = {'Authorization': `Bearer ${accessToken}`};

        http.setHeaders(header);

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    async getAccessToken(code) {
        let http = new HttpRequest();
        let tokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
        let params = {
            code: code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: this.redirectUrl,
            grant_type: 'authorization_code'
        };

        let result = await http.sendRequest(tokenUrl, params);
        let accessToken = result.access_token;

        return accessToken;
    }

    getLoginUrl() {
        return `https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&access_type=offline&
        approval_prompt=force&redirect_uri=${this.redirectUrl}&response_type=code&client_id=${clientId}&state=${this.state}`;
    }
}

module.exports = Google;