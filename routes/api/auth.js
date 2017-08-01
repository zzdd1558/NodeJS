/**
 * Created by parkjp on 2017-07-26.
 */
const express = require('express');
const router = express.Router();

const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');
const InputValidator = require('../../utils/InputValidator');
const HttpRequest = require('../../utils/HttpRequest');
const Social = require('../../socials/SocialFactory');

const request = new HttpRequest();
router.post('/login', login);
//:socialType에 무엇이 들어오냐에 따라 다르다.

router.post('/social/:socialType/login', socialLogin);

function login(req, res) {
    try {
        //req.parameter로 데이터를 받아 Parameter을 통한 메서드 수행후 변수에 값 저장.
        let email = Parameter.getLowerCase(req.parameter['email']);
        let password = Parameter.get(req.parameter['password']);

        // TODO : email, password validation

        // TODO : login

    } catch (e) {
        //500 error를 보여준다.
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}


async function socialLogin(req, res) {
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);
        let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));

        console.log(accessToken);

        if (!InputValidator.isValidSocialType(socialType) || accessToken.length == 0) {
            console.debug();
            return res.status(HttpResponse.StatusCode.PARAMETER_WRONG).end();
        }

        let social = new Social(socialType);
        let user = await social.getProfile(accessToken);

        // TODO : db

        console.log(user);
        res.status(HttpResponse.StatusCode.OK).end();
    }
    catch (e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;