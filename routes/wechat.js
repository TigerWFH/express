var express = require('express');
var router = express.Router();
let wechat = require('wechat');
var config = require('../config.js');
var fs = require('fs');

// get access_token
const getAccessToken = () => {
    let queryParams = {
        'grant_type': 'client_credential',
        'appid': config.appid,
        'secret': config.secret
    };
    let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?'
        + JSON.stringify(queryParams);
    let options = {
        method: 'GET',
        url: wxGetAccessTokenBaseUrl
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (res) {
                resolve(JSON.parse(body));
            }
            else {
                reject(err);
            }
        });
    })
};
// save access_token
const saveToken = () => {
    getAccessToken().then(res => {
        let token = res['access_token'];
        fs.writeFile('./token', token, (err) => {

        })
    });
}
// update token
const refreshToken = () => {
    saveToken();
    setInterval(() => {
        saveToken();
    }, 7000 * 1000)
}
router.use('/', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
}));
module.exports = router;