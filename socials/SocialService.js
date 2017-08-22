
const randomString = require('randomstring');

class SocialService {

    constructor(socialType) {
        this.redirectUrl = encodeURI(`http://localhost:3000/social/${socialType}/auth`);
        this.state = randomString.generate(7);
    }
}

const SocialType = {
    NAVER : 'naver',
    FACEBOOK : 'facebook',
    GOOGLE : 'google',
    KAKAO : 'kakao'
};

module.exports = SocialService;
module.exports.socialType = SocialType;