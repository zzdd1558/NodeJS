
const naver = require('./Naver');
const facebook = require('./Facebook');
const google = require('./Google');
const kakao = require('./Kakao');

class SocialFactory {

    constructor(socialType) {
        this.socialType = socialType;
        switch (this.socialType) {
            case SocialType.NAVER :
                this.social = new naver();
                break;
            case SocialType.GOOGLE :
                this.social = new google();
                break;
            case SocialType.FACEBOOK :
                this.social = new facebook();
                break;
            case SocialType.KAKAO :
                this.social = new kakao();
                break;
            default :
                throw new Error('SocialType Error');
        }
    }

    async getProfile(accessToken) {
        return await this.social.getProfile(accessToken);
    }
}

const SocialType = {
    NAVER : 'naver',
    FACEBOOK : 'facebook',
    GOOGLE : 'google',
    KAKAO : 'kakao'
};

module.exports = SocialFactory;
module.exports.socialType = SocialType;