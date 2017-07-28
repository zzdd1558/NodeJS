/**
 * Created by parkjp on 2017-07-26.
 */
const express = require('express');
const router = express.Router();

const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');
const InputValidator = require('../../utils/InputValidator');

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


function socialLogin(req, res) {
    try {
        //소셜 타입을 req.params로 받아와 소문자로 변형후 변수에 저장
        let socialType = Parameter.getLowerCase(req.params.socialType);

        /*let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));*/
        //req.parameter로 넘어온 accessToken값을 가져와 decode한후 변수에 저장
        //req.parameter이 안되서 body-parser 썼습니다.
        let accessToken = decodeURI(Parameter.get(req.body.accessToken));

        console.log(socialType);
        console.log(accessToken);

        // InputValidator.isValidSocialType(socialType)이 true거나 액세스토큰의 길이가 0이라면 에러.
        if (!InputValidator.isValidSocialType(socialType) || accessToken.length == 0) {
            console.debug();
            return res.status(HttpResponse.StatusCode.PARAMETER_WRONG).end();
        }


        // TODO : socialLogin

    } catch (e) {
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;