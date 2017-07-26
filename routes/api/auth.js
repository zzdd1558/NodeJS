/**
 * Created by parkjp on 2017-07-26.
 */
const express = require('express');
const router = express.Router();

const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');

router.get('/login', login);
router.get('/social/:socialType/login', socialLogin);

function login(req, res) {

}

function socialLogin(req, res) {
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);
        let accessToken = decodeURI(Parameter.get(req.parameter['accessToken']));

        // TODO : socialLogin

    } catch (e) {
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;