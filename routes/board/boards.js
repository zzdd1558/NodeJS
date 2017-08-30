const express = require('express');
const router = express.Router();

//mysql-promiss module util js
const Database = require('../../database/lib/database');
//글 작성
router.post('/', boardWrite);

//글 조회
router.get('/:id', boardRead);

//글 수정
router.put('/:id', boardUpdate);

//글 삭제
router.delete('/:id', boardDelete);


function boardWrite(req, res) {
    console.log("boardWrite");
    res.send("boardWrite");
}
function boardRead(req, res) {
    console.log("boardRead");
    let result = {"SUCCESS": 1};

    let num = req.params.num;
    console.log(num);
    res.json(result);
}
function boardUpdate(req, res) {
    console.log("boardUpdate");

    res.render('index');
}
function boardDelete(req, res) {
    console.log("boardDelete");

    res.render('index');
}


module.exports = router;
