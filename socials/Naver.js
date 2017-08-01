const HttpRequest = require('../utils/HttpRequest');

const client_id = 'VxgHymo8VpJl3iyxveUB';
const client_secret = '4gsd0DLvZp';
const redirectURI = encodeURI("http://localhost:3000/social/naver/login");

class Naver {

    async getProfile(accessToken) {
        let http = new HttpRequest();
        let profileApiUrl = 'https://openapi.naver.com/v1/nid/me';
        let header = {'Authorization': `Bearer ${accessToken}`};

        http.setHeaders(header);

        return await http.sendRequest(profileApiUrl, {}, 'GET');
    }

    async getAccessToken(code, state) {
        let http = new HttpRequest();
        let url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
        let header = {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret};

        http.setHeaders(header);

        return await http.sendRequest(url, {});
    }
}

module.exports = Naver;