var express = require('express');
var dataPromise = require('../module/dataPromise');
var router = express.Router();
router.post('/', function (req, res) {
    let name = req.body.name;
    let pwd = req.body.pwd;
    console.log('收到数据：', name, pwd);
    var sql = `UPDATE test.user SET pwd='${pwd}' WHERE name='${name}';`;
    var obj = {};
    dataPromise(sql).then(result => {
        console.log(result);
        if (result.changedRows == "0") {
            obj.code = '501';
            obj.msg = "用户名不存在"; 
        } else {
            obj.code = '201';
            obj.msg = "密码找回成功";  
        }
        res.send(JSON.stringify(obj));
    }).catch(error => {})
});
module.exports = router;