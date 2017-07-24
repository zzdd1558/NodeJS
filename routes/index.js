var express = require('express');
var router = express.Router();

const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');

router.get('/', main);
router.get('/dbtest', dbtest);
router.get('/signup',signup);
router.get('/login',login);
router.get('/social/:socialType/login', socialLogin);


function login(req, res){
    res.render('login');
}

function signup(req, res){
    res.render('signup');
}

function socialLogin(req, res) {
    let socialType = req.params.socialType;
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

module.exports = router;
