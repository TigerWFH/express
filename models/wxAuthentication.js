const crypto = require('crypto');
const config = require('../config');

module.exports = class WeChat {
    constructor() {

    }
    // 验证服务器
    sha1(param) {
        var shasum = crypto.createHash("sha1");
        shasum.update(param);
        let str = shasum.digest("hex");
        return str;
    }
    checkSignature(param) {
        let query = param;
        let signature = query.signature;
        let echostr = query.echostr;
        let timestamp = query['timestamp'];
        let nonce = query.nonce;

        let reqArray = [nonce, timestamp, config.token];
        reqArray.sort();
        let sortStr = reqArray.join('');
        let sha1Str = this.sha1(sortStr);
        if (sha1Str === signature) {
            return echostr;
        }
        else {
            console.log("授权失败！");
            return '无效的服务器';
        }
    };
};