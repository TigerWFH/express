var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var client = mongo.MongoClient;
var serverUrl = 'mongodb://127.0.0.1:27017/blog';
/* GET users listing. */
router.get('/', function (req, res, next) {
  client.connect(serverUrl, (err, db) => {
    if (err) {
      throw '数据库连接出错：' + err;
    }
    db.collection('users').find().toArray((err, result) => {
      if (err) {
        throw err;
      }
      console.log(JSON.stringify(result));
      console.log(result);
      res.json(result);
      db.close();
    })
  })
  // res.sendfile('./views/index.html');
});

module.exports = router;
