var express = require('express');
var router = express.Router();
// users 相关操作
var User = require('../models/users');
let users = new User();
/* GET users listing. */
//  用户列表
router.get('/', function (req, res, next) {
  users.getUserList().then((result) => {
    res.json(result);
  }, (err) => {
    res.json(err);
  });
  // res.sendfile('./views/index.html');
});
// 根据_id获取用户信息
router.get('/:id', (req, res, next) => {
  console.log('param--->', req.params.id);
  console.log('param--->', typeof req.params.id);
  users.getUser(req.params.id)
    .then((result) => {
      res.json(result);
    }, (err) => {
      res.json(result);
    })
});

module.exports = router;
