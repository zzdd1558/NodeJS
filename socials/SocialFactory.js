/**
 * Created by parkjp on 2017-08-02.
 */

const naver = require('./Naver');
const facebook = require('./Facebook');
const google = require('./Google');
const kakao = require('./Kakao');
const SocialType = require('./SocialService').socialType;

class SocialFactory {
    constructor(socialType) {
        switch (socialType) {
            case SocialType.NAVER :
                this.social = new naver(socialType);
                break;
            case SocialType.GOOGLE :
                this.social = new google(socialType);
                break;
            case SocialType.FACEBOOK :
                this.social = new facebook(socialType);
                break;
            case SocialType.KAKAO :
                this.social = new kakao(socialType);
                break;
            default :
                throw new Error('SocialType Error');
        }
    }

    async getProfile(accessToken) {
        return await this.social.getProfile(accessToken);
    }

    async getAccessToken(code, state) {
        return await this.social.getAccessToken(code, state);
    }

    getLoginUrl() {
        return this.social.getLoginUrl();
    }
}

module.exports = SocialFactory;