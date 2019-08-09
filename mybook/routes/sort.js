var express = require('express');
var database = require('../module/database');
var router = express.Router();
router.get('/', function (req, res) {
    //sql语句
    var sql = `SELECT * FROM test.book_type;`;
    var obj = {};
    database(sql, function (err, result) {
        if (!err) {
            console.log('读取成功');
        } else {
            console.log('访问数据库出错：', err.message);
        }
        res.send(JSON.stringify(result));
    })
});
router.get('/book?', function (req, res) {
    // console.log(req.query);
    // 判断对象是否为空
    var arr = Object.keys(req.query);
    if (arr.length == 0) {
        //sql语句
        var sql = `SELECT * FROM test.book_list;`;
        database(sql, function (err, result) {
            if (!err) {
                console.log('读取成功');
            } else {
                console.log('访问数据库出错：', err.message);
            }
            res.send(JSON.stringify(result));
        })
    } else {
        console.log(req.query.id);
        let id = req.query.id;
        console.log('收到数据：', id);
        //sql语句
        var sql = `select * from test.book_list where bid='${id}';`;
        database(sql, function (err, result) {
            if (!err) {
                console.log('读取成功');
            } else {
                console.log('访问数据库出错：', err.message);
            }
            res.send(JSON.stringify(result));
        })
    }
});
module.exports = router;