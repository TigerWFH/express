var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.json({ "name": "return json" });
    res.sendfile('./views/index.html')
});
// router.route('/').get().delete().post().put()
module.exports = router;