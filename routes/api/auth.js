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
const Database = require('../../database/lib/database');


router.post('/login', login);
router.post('/social/:socialType/login', socialLogin);
router.post('/signup', signup);
router.post('/email-check', emailCheck);


function login(req, res) {
    try {
        let email = Parameter.getLowerCase(req.parameter['email']);
        let password = Parameter.get(req.parameter['password']);

        // TODO : email, password validation

        // TODO : login

    } catch (e) {
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}


async function socialLogin(req, res) {
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);
        let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));

        if (!InputValidator.isValidSocialType(socialType) || accessToken.length == 0) {
            console.debug();
            return res.status(HttpResponse.StatusCode.PARAMETER_WRONG).end();
        }

        let social = new Social(socialType);
        let user = await social.getProfile(accessToken);

        // TODO : db
        // TODO : create jwt Token

        console.log(user);
        res.render('main', {/** jwt Token **/});
    }
    catch (e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

/** 회원가입 하는 부분 */
async function signup(req, res) {
    try {
        let userEmail = Parameter.get(req.parameter['email']);
        let userPassword = Parameter.get(req.parameter['password']);
        let userNickname = Parameter.get(req.parameter['nickname']);
        let userYear = Parameter.get(req.parameter['year']);
        let userMonth = Parameter.get(req.parameter['month']);
        let userDate = Parameter.get(req.parameter['date']);
        let userBirth = userYear + "-" + userMonth + "-" + userDate;


        if (!InputValidator.isValidEmail(userEmail) || !InputValidator.isValidPassword(userPassword)) {
            res.send(`<script>alert('잘못된 접근입니다'); location.href="/"; </script>`);
        }

        let query = `insert into user values (NULL,'${userNickname}','${userPassword}','${userEmail}',NULL,
            '${userBirth}' , NULL,NULL,NULL,NULL)`;  // TODO : 프로시저

        /** 결과값 필요하면 사용하려고 남겨놨습니다 */
        let result = await Database.call(query); // async, await 방식

        res.redirect('/');
    } catch (e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}


/** ajax로 email 중복 체크 하는 부분 */
async function emailCheck(req, res) {
    try {
        let resultDate = 'success';
        let userEmail = req.parameter['email'];

        let query = `select count(*) as emailIsEmpty from user where userEmail = '${userEmail}'`; // TODO : 프로시저
        let result = await Database.call(query); // async, await 방식*!/


        if (result[0].emailIsEmpty > 0) {
            resultDate = 'fail';
        }
        res.status(HttpResponse.StatusCode.OK).send(resultDate);
    } catch (e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}


module.exports = router;