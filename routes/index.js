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
router.post('/signup/createMember',createMember);
router.post('/signup/emailCheck' , emailCheck);
router.get('/social/:socialType/login', socialLogin);
router.get('/social/:socialType/auth', socialAuth);

function main(req,res){
    res.render('main');
}

/** 로그인 페이지 */
function login(req, res){
    res.render('login');
}

/** 회원가입 페이지 */
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


async function createMember(req, res){
    try {
        let userEmail = Parameter.get(req.parameter['email']);
        let userPassword = Parameter.get(req.parameter['password']);
        let userNickname = Parameter.get(req.parameter['nickname']);
        let userYear = Parameter.get(req.parameter['year']);
        let userMonth = Parameter.get(req.parameter['month']);
        let userDate = Parameter.get(req.parameter['date']);
        let userBirth = userYear + "-" + userMonth + "-" + userDate;

        /** 데이터 넘어오는지 값 찍어보는 부분 */
        console.log("email : " + userEmail);
        console.log("userPassword : " + userPassword);
        console.log("userNickname : " + userNickname);
        console.log("userBirth : " + userBirth);

        let query = `insert into user values (
        NULL,
        '${userNickname}',
        '${userPassword}',
        '${userEmail}',
        NULL,
        '${userBirth}' , NULL,NULL,NULL,NULL
        )`;


        let result = await Database.call(query); // async, await 방식

        res.redirect('/');
    } catch(e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

async function emailCheck(req,res){
    try {
        let resultDate='success';
        let userEmail = req.parameter['email'];

        let query = `select count(*) as emailIsEmpty from user where userEmail = '${userEmail}'`;
        let result = await Database.call(query); // async, await 방식*!/

        if(result[0].emailIsEmpty >0){
            resultDate = 'fail';
        }



        res.status(HttpResponse.StatusCode.OK).send(resultDate);
    } catch(e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;
