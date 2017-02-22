var express = require('express');
var router = express.Router();
var fs = require('fs');
// wechat相关业务模块
let WxAuthentication = require('../models/wxAuthentication');
let WxAccessToken = require('../models/wxAccessToken');
let WxMenu = require('../models/wxMenu');
let wxAccessToken = new WxAccessToken();
let wxMenu = new WxMenu();
wxAccessToken.saveToken().then(result => {
    wxMenu.createMenu();
}, err => {

});
// 验证接入服务器
router.get('/', (req, res, next) => {
    let wxAuthentication = new WxAuthentication();
    res.end(wxAuthentication.checkSignature(req.query));
});
// 获取token

module.exports = router;