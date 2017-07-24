var express = require('express');
var router = express.Router();

const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');

/*네이버 로그인 필요한 정보들*/
let client_id = 'VxgHymo8VpJl3iyxveUB';
let client_secret = '4gsd0DLvZp';
let state = "RAMDOM_STATE";
let redirectURI = encodeURI("http://localhost:3000/member");
let api_url = "";
let token;

router.get('/', main);
router.get('/dbtest', dbtest);
router.get('/signup',signup);
router.get('/login',login);
router.get('/member',member);


function login(req,res){
    res.render('login');
}
function signup(req,res){
    res.render('signup');
}

//액세스 토큰을 통해 회원 정보를 얻어오는곳
function main(req,res){
    api_url = 'https://openapi.naver.com/v1/nid/me';
    var header = "Bearer " + token; // Bearer 다음에 공백 추가
    let options = {
        url: api_url,
        headers: {'Authorization': header}
    };
    // request.get(options, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    //         let parseBody = JSON.parse(body);
    //         console.log(parseBody)
    //         res.end(body);
    //     } else {
    //         console.log('error');
    //         if(response != null) {
    //             res.status(response.statusCode).end();
    //             console.log('error = ' + response.statusCode);
    //         }
    //     }
    // });
}


//액세스 토큰을 얻어오는곳.
function member(req, res) {
    try {
        code = req.query.code;
        state = req.query.state;
        api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
            + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;

        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };
    } catch (e) {

    }

    // request.get(options, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    //         let jsonBody = JSON.parse(body);
    //         token = jsonBody.access_token;
    //         res.end(body);
    //     } else {
    //         res.status(response.statusCode).end();
    //         console.log('error = ' + response.statusCode);
    //     }
    // });
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
