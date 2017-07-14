var express = require('express');
var router = express.Router();

const Database = require('../database/lib/database');
const HttpResponse = require('../utils/HttpResponse');
/* db연결하는 부분 */
var mysql_dbc = require('../db/dbConn');
var connection = mysql_dbc.init();
mysql_dbc.testConn(connection);
/*---------------------------*/

router.get('/dbtest', dbtest);
router.get('/', function(req, res, next) {
  var query = 'select * from member';
  connection.query(query , function(err,result,fields){
    if(err){
      console.log(err);
    }

    /*
    console.log(result[0].idx);
    console.log(result[0].name);
    console.log(result[0].age);
    */


    res.render('index', {result : result});


  })
});

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
