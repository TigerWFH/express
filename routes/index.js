var express = require('express');
var router = express.Router();
var data = require('../datas/users');
/* GET home page. */
router.get('/', function(req, res, next) {
    data.init();
    res.sendfile('./views/index.html');
});

module.exports = router;