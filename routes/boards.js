const express = require('express');
const router = express.Router();

//mysql-promiss module util js
const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');


//글 쓰기
router.post('/', boardWriteDB);

//글 조회
router.get('/:id', boardRead);

//글 수정
router.put('/:id', boardUpdate);

//글 삭제
router.delete('/:id', boardDelete);

router.post('/category/getCategory', getCategory);


async function boardWriteDB(req, res) {
    /** user Email 어떻게 넣어줄지 ..*/
    let boardUserEmail = 'zzdd1558@naver.com';


    let categoryNum = req.parameter['category'];
    let boardTitle = req.parameter['title'];
    let boardContent = req.parameter['content'];

    let result;
    try {
        let values = [boardUserEmail,boardTitle, boardContent, categoryNum];

        console.log(values);
        result = await Database.testCall("insert into blogBoard values ( NULL , ? , ? , ? , now() , 0 ,?)", values);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
    /** post 값 받을때 req.parameter['name'] 사용*/
    res.status(HttpResponse.StatusCode.OK).redirect("/");
}


async function boardRead(req, res) {
    let result;

    try {
        /** 파라미터로 값 받기 */
        let id = req.params['id'];

        /** preparedstatement 값 */
        let values = [id];

        /** SQL Query 작성*/
        let query = `select * from board where idx=?`;

        /** Database.testCall로 query와 배열 전송*/
        result = await Database.testCall(query, values);

    } catch (e) {
        console.log(`Error :  ${e}`);
    }

    res.status(HttpResponse.StatusCode.OK).render('noticeBoardRead', {title: "abcd"});
}
async function boardUpdate(req, res) {
    let result
    try {

        let query = "";
        let result = await Database.testCall(query, values);

        console.log(result);
    } catch (e) {
    }
    res.send('풋 put');
}
async function boardDelete(req, res) {
    try {

        let query = "";
        let result = await Database.testCall(query, values);

        console.log(result);
    } catch (e) {
    }
    res.send('딜리트 delete');
}

async function getCategory(req,res){
    let result;
    try{
        let query="SELECT * FROM category";
        result = await Database.call(query);

    }catch(e){

    }


    console.log ( result );
    res.send(result);
}

module.exports = router;
