
class SocialFactory {

    constructor(socialType) {
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