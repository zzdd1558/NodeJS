/**
 * Created by parkjp on 2017-07-26.
 */
const express = require('express');
const router = express.Router();

const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');
const InputValidator = require('../../utils/InputValidator');
const HttpRequest = require('../../utils/HttpRequest');
const JWT = require('../../utils/JsonWebToken');

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


function socialLogin(req, res) {
    try {

    } catch (e) {

    }
    try {
        //소셜 타입을 req.params로 받아와 소문자로 변형후 변수에 저장
        let socialType = Parameter.getLowerCase(req.params.socialType);

        /*let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));*/
        //req.parameter로 넘어온 accessToken값을 가져와 decode한후 변수에 저장
        //req.parameter이 안되서 body-parser 썼습니다.
        let accessToken = decodeURI(Parameter.get(req.body.accessToken));

        console.log(socialType + " : " + typeof socialType);
        console.log(accessToken);

        // InputValidator.isValidSocialType(socialType)이 true거나 액세스토큰의 길이가 0이라면 에러.
        if (!InputValidator.isValidSocialType(socialType) || accessToken.length == 0) {
            console.debug();
            return res.status(HttpResponse.StatusCode.PARAMETER_WRONG).end();
        }

        if (socialType === 'facebook') {
            console.log('페이스북');

            var headers = {}
            const basicRequest = require('request');

            console.log('request success');
            var options = {
                url: 'https://graph.facebook.com/me?access_token=' + accessToken,
                method: 'GET',
            }

            console.log('options success');

            basicRequest(options, function (error, response, body) {
                console.log('요청 성공 success');
                if (!error && response.statusCode == 200) {
                    console.log('body ; ' + body);
                }
            })
        }
        else if (socialType == 'google') {
            console.log('구글');


            const basicRequest = require('request');
            var headers = {'Authorization': 'Bearer ' + accessToken}
            console.log('request success');
            var options = {
                url: 'https://www.googleapis.com/oauth2/v2/userinfo',
                method: 'GET',
            }

            console.log('options success');

            basicRequest(options, function (error, response, body) {
                console.log('요청 성공 success');
                if (!error && response.statusCode == 200) {
                    console.log('abc');
                    console.log('body ; ' + body);
                }
            });
        }
        else if (socialType === 'kakao') {
            var headers = {
                'Authorization': 'Bearer {' + accessToken + '}',
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            }
            const basicRequest = require('request');
            var options = {
                url: 'https://kapi.kakao.com/v1/user/me',
                method: 'POST',
                headers: headers,
            }
            basicRequest(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let userProfile = JSON.parse(body);
                    console.log(body);
                    console.log('Kakao user email : ' + userProfile.kaccount_email);
                    console.log('Kakao user unique id : ' + userProfile.id);
                    console.log('Kakao user userProfile.properties : ' + userProfile.properties.nickname);
                }
            })
        }
    }
    catch (e) {
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;