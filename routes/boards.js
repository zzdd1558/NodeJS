const express = require('express');
const router = express.Router();

//mysql-promiss module util js
const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');

// 글작성 페이지로 render
router.get('/', boardWrite)

//글 쓰기
router.post('/', boardWriteDB);

//글 조회
router.get('/:id', boardRead);

//글 수정
router.put('/:id', boardUpdate);

//글 삭제
router.delete('/:id', boardDelete);


function boardWrite(req, res) {
    console.log("글을 써보쟈꾸나~");
    res.render('noticeBoardWrite');
}
async function boardWriteDB(req, res) {
    let idx = req.parameter['title'];
    let title = req.parameter['user'];
    let content = req.parameter['content'];
    let result;
    try {
        let values = [idx , title , content];

        console.log(values);
         result = await Database.testCall("insert into board values(NULL,?,?,?)" , values);

    } catch (e) {
        console.log(e);
    }
    /** post 값 받을때 req.parameter['name'] 사용*/



    res.status(HttpResponse.StatusCode.OK).send(result);
}


async function boardRead(req, res) {
    let result;

    try{
        /** 파라미터로 값 받기 */
        let id = req.params['id'];
        
        /** preparedstatement 값 */
        let values = [id];
        
        /** SQL Query 작성*/
        let query = `select * from board where idx=?`;
        
        /** Database.testCall로 query와 배열 전송*/
        result = await Database.testCall(query,values);

    }catch (e){
        console.log(`Error :  ${e}`);
    }

    res.status(HttpResponse.StatusCode.OK).render('noticeBoardRead' , {title : "abcd"});
}
async function boardUpdate(req, res) {
    let result
    try{

        let query = "";
        let result = await Database.testCall(query,values);

        console.log(result);
    }catch (e){}
    res.send('풋 put');
}
async function boardDelete(req, res) {
    try{

        let query = "";
        let result = await Database.testCall(query,values);

        console.log(result);
    }catch (e){}
    res.send('딜리트 delete');
}


module.exports = router;
