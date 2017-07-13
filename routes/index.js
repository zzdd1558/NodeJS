var express = require('express');
var router = express.Router();

/* db연결하는 부분 */
var mysql_dbc = require('../db/dbConn')();
var connection = mysql_dbc.init();
mysql_dbc.testConn(connection);
/*---------------------------*/

/* GET home page. */
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

module.exports = router;
