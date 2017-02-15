var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
var client = mongo.MongoClient;
var serverUrl = 'mongodb://127.0.0.1:27017/blog';
/* GET users listing. */
//  用户列表
router.get('/', function (req, res, next) {
  client.connect(serverUrl, (err, db) => {
    if (err) {
      // 非必要的错误不应该挂掉整个系统
      // throw '数据库连接出错：' + err;
      let rel = {
        msgCode: -1,
        msgText: 'cant connect database'
      };
      console.log('--->', err.message);
      res.json(rel);
      return;
    }
    db.collection('users').find().toArray((err, result) => {
      if (err) {
        throw err;
      }
      let rel = {
        msgCode: 0,
        msgText: 'success',
        data: result
      }
      console.log("toArray--->", result);//json对象（也是js对象）
      console.log("stringify--->", JSON.stringify(result));//json字符串
      res.json(rel);
    });
    db.close();
  })
  // res.sendfile('./views/index.html');
});
// 根据_id获取用户信息
router.get('/:id', (req, res, next) => {
  console.log('param--->', req.params.id);
  console.log('param--->', typeof req.params.id);
  client.connect(serverUrl, (err, db) => {
    if (err) {
      let rel = {
        msgCode: 100,
        msgText: 'cant find user'
      };
      res.json(rel);
      return;
    }
    db.collection('users').find({ "_id": new ObjectId(req.params.id) }).toArray((err, result) => {
      res.json({
        msgCode: 0,
        msgText: 'success',
        data: result
      });
    });
    db.close();
  });
});

module.exports = router;
