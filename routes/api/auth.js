/**
 * Created by parkjp on 2017-07-26.
 */
var express = require('express');
var router = express.Router();

router.get('/login', login);
router.get('/social/:socialType/login', socialLogin);

function login(req, res) {

}

function socialLogin(req, res) {
    let socialType = req.params.socialType;
    let accessToken = req.parameter['accessToken'];
}

module.exports = router;