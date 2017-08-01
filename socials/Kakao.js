const HttpRequest = require('../utils/HttpRequest');

class Kakao {

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

}

module.exports = Kakao;