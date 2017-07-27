/**
 * Created by parkjp on 2017-07-26.
 */
const express = require('express');
const router = express.Router();

const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');
const InputValidator = require('../../utils/InputValidator');

router.post('/login', login);
router.post('/social/:socialType/login', socialLogin);

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

function socialLogin(req, res) {
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);
        let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));

        if(!InputValidator.isValidSocialType(socialType) || accessToken.length == 0) {
            console.debug();
            return res.status(HttpResponse.StatusCode.PARAMETER_WRONG).end();
        }

        // TODO : socialLogin

    } catch (e) {
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;