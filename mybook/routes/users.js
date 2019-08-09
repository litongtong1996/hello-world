var express = require('express');
var database = require('../module/database');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  let name = req.body.name;
  let pwd = req.body.pwd;
  console.log('收到数据：', name, pwd);
  //sql语句
  var sql = `select pwd from test.user where name='${name}';`;
  var obj = {};
  database(sql, function (err, result) {
    if (!err) {
      if (result == '') {
        obj.code = '404';
        obj.msg = "用户名不存在";
      } else if (result[0].pwd == pwd) {
        obj.code = '202';
        obj.msg = "登录成功";
      } else {
        obj.code = 409;
        obj.msg = "登录失败";
      }
    } else {
      console.log('访问数据库出错：', err.message);
    }
    res.send(JSON.stringify(obj));
  })
});

module.exports = router;
