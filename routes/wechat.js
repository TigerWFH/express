var express = require('express');
var router = express.Router();
var fs = require('fs');
// wechat相关业务模块
let WeChat = require('../models/wxAuthentication');
let DomainBusiness = require('../models/wxAccessToken');
let WxMenu = require('../models/wxMenu');
let wx = new DomainBusiness();
let menu = new WxMenu();
wx.refreshToken();
menu.createMenu().then(result => {
    console.log('result--->***', result);
}, error => {

});
// 验证接入服务器
router.get('/', (req, res, next) => {
    let wechat = new WeChat();
    res.end(wechat.checkSignature(req.query));
});
// 获取token

module.exports = router;