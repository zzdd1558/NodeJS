/**
 * Created by yunjin on 2017-08-04.
 */

let express = require('express');
let router = express.Router();

const Database = require('../../database/lib/database');
const HttpResponse = require('../../utils/HttpResponse');
const Parameter = require('../../utils/Parameter');

router.get('/',signup);
router.post('/createMember',createMember);
router.post('/emailCheck' , emailCheck);


/** 회원가입 페이지 */
function signup(req, res){
    res.render('signup');
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

        let query = `insert into user values (
        NULL,
        '${userNickname}',
        '${userPassword}',
        '${userEmail}',
        NULL,
        '${userBirth}' , NULL,NULL,NULL,NULL
        )`;

        /** 결과값 필요하면 사용하려고 남겨놨습니다 */
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


        if(result[0].emailIsEmpty > 0 ){
            resultDate = 'fail';
        }
        res.status(HttpResponse.StatusCode.OK).send(resultDate);
    } catch(e) {
        console.log(e.message);
        res.status(HttpResponse.StatusCode.UNEXPECTED).end();
    }
}

module.exports = router;