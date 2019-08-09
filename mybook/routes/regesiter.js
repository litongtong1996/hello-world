var express = require('express');
var dataPromise = require('../module/dataPromise');
var router = express.Router();

router.post('/', function (req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    let tel = req.body.tel;
    console.log('收到数据：', name, pwd, tel);
    var sql = `select * from user where name='${name}';`;
    var sql1 = `insert into test.user (name,pwd,tel) values ('${name}','${pwd}','${tel}');`;
    var obj = {};
    dataPromise(sql).then(result => {
        if (result == "") {
            return dataPromise(sql1);
        } else {
            obj.code = '501';
            obj.msg = "用户名重复";  
        }
        res.send(JSON.stringify(obj));
    }).then(result => {
        obj.code = '202';
        obj.msg = "注册成功";
        res.send(JSON.stringify(obj));
    }).catch(error => {})
});


module.exports = router;