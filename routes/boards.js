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
router.get('/update/:id', updateDataRead);
router.post('/update', updateData);

//글 삭제
router.delete('/:id', boardDelete);

//ajax로 카테고리 목록 받아오는 부분
router.post('/category/getCategory', getCategory);

/** method = post  글 DB에 저장하는 함수.*/
async function boardWriteDB(req, res) {

    console.log("post");

    /** user Email 어떻게 넣어줄지 ..*/
    let boardUserEmail = 'zzdd1558@naver.com';


    let categoryNum = req.parameter['category'];
    let boardTitle = req.parameter['title'];
    let boardContent = req.parameter['content'];

    let result;
    try {
        let values = [boardUserEmail, boardTitle, boardContent, categoryNum];
        let sql = "insert into blogBoard values ( NULL , ? , ? , ? , now() , now() , 0 ,?)";
        result = await Database.testCall(sql, values);
    } catch (e) {
        console.log(e);
    }

    res.status(HttpResponse.StatusCode.OK).redirect("/");
}


/** method = get  DB에 저장되어 있는 글 읽어 오는 함수*/
async function boardRead(req, res) {
    let result;
    let sendResultData = "";
    try {
        /** 파라미터로 값 받기 */
        let id = req.params['id'];
        /** preparedstatement 값 */
        let values = [id];


        /** SQL Query 작성*/
        let query = `select boardTitle,boardContent,boardEmail,  DATE_FORMAT(boardTime ,"%Y.%c.%e %H:%i" ) as boardTime, boardViewsCount,category_name from blogBoard INNER JOIN category ON blogBoard.category_num = category.category_num WHERE boardIdx = ?`;

        /** Database.testCall로 query와 배열 전송*/
        result = await Database.testCall(query, values);
        sendResultData = result[0];
        console.log(sendResultData);
    } catch (e) {
        console.log(`Error :  ${e}`);
    }

    res.status(HttpResponse.StatusCode.OK).render('noticeBoardRead', {result: sendResultData});

}
async function updateDataRead(req, res) {
    let result;
    let boardIdx = req.params['id'];
    let sendResultData;
    try {
        let query = "SELECT boardIdx,boardTitle, boardContent, category_num FROM blogBoard WHERE boardIdx = ?";
        result = await Database.testCall(query, boardIdx);
        sendResultData = result[0];
    } catch (e) {
    }
    res.status(HttpResponse.StatusCode.OK).render('noticeBoardUpdate', {result: sendResultData});
}


async function updateData(req,res){
    let result;
    let boardIdx = req.parameter['boardIdx'];
    let categoryNum = req.parameter['category'];
    let boardTitle = req.parameter['title'];
    let boardContent = req.parameter['content'];

    let values = [categoryNum , boardTitle , boardContent ,boardIdx ];

    console.log(values);

    try {
        let query = `UPDATE blogBoard SET category_num = ? , boardTitle=? , boardContent=?,lastUpdateTime=now() where boardIdx = ?`;
        result = await Database.testCall(query, values);

        console.log(result);
    } catch (e) {
    }
    res.status(HttpResponse.StatusCode.OK).redirect(`/board/${boardIdx}`);
}

/** 게시글 삭제 */
async function boardDelete(req, res) {

    let boardIdx = req.parameter['boardIdx'];
    try {

        let query = "delete from blogBoard where boardIdx = ?";
        let result = await Database.testCall(query, boardIdx);

        console.log(result);
    } catch (e) {
    }
    res.send('딜리트 delete');
}


/** 카테고리 종류 반환 */
async function getCategory(req, res) {
    let result;
    try {
        let query = "SELECT * FROM category";
        result = await Database.call(query);

    } catch (e) {

    }
    console.log(result);
    res.send(result);
}

module.exports = router;
