var express = require('express');
var router = express.Router();

const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');
const Parameter = require('../utils/Parameter');
const Social = require('../socials/SocialFactory');

router.get('/', main);
router.get('/dbtest', dbtest);
router.get('/signup',signup);
router.get('/login',login);
router.get('/social/:socialType/login', socialLogin);
router.get('/social/:socialType/auth', socialAuth);

function main(req,res){
    res.render('main');
}

function login(req, res){
    res.render('login');
}

function signup(req, res){
    res.render('signup');
}

async function dbtest(req, res) {
  try {
      let query = 'select * from member';

      let result = await Database.call(query); // async, await 방식

      // db.call(query).then((result)=>{   // promise then catch 방식
      //   ~~
      // }).catch((e)=>{
      //    ~~
      // });

      res.status(HttpResponse.StatusCode.OK).send(result);
  } catch(e) {
      console.log(e.message);
      res.status(HttpResponse.StatusCode.UNEXPECTED).end();
  }
}

function socialLogin(req, res) {
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);

        let social = new Social(socialType);
        let url = social.getLoginUrl();

        res.redirect(url);
    } catch(e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

async function socialAuth(req, res){
    try {
        let socialType = Parameter.getLowerCase(req.params.socialType);
        let code = Parameter.get(req.parameter['code']);
        let state = Parameter.get(req.parameter['state']);
        let social = new Social(socialType);

        let accessToken = await social.getAccessToken(code, state);
        res.render('socialRedirect', {accessToken : accessToken, social : socialType});
    } catch(e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}



module.exports = router;
