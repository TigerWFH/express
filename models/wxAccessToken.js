let https = require('https');
let fs = require('fs');
let path = require('path');
const config = require('../config');

module.exports = class DomainBusiness {
    constructor() { }
    // 可手动获取token
    getAccessToken() {
        let params =
            'grant_type=client_credential&appid='
            + config.appid
            + '&secret=' + config.secret;
        let wxAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-bin/token?';
        let fullUrl = wxAccessTokenBaseUrl + params;
        return new Promise((resolve, reject) => {
            https.get(fullUrl, (res) => {
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    // 所有的业务逻辑
                    let ret = JSON.parse(data.toString());
                    resolve(ret);
                });
                res.on('end', () => {
                    console.log('get access_token done!');
                });
            }).on('error', (err) => {
                // 非业务逻辑的错误
                reject(err);
            });
        });
    }
    saveToken() {
        return new Promise((resolve, reject) => {
            this.getAccessToken().then(result => {
                if (result.access_token) {
                    let expireTime = result.expires_in * 1000;
                    let time = (new Date()).getTime() + expireTime;
                    result.deadline = time;
                    fs.writeFile(path.join(__dirname, '\\token.json'),
                        JSON.stringify(result), 'utf8', (err) => {
                            if (err) {
                                console.log('写token文件出错--->', err);
                                reject(err);
                            }
                            resolve('文件写入成功!');
                        });
                }
                else {
                    console.log('get access token wrong!--->' + result.errcode + ':', result.errmsg);
                }
            }, error => {
                console.log('error--->', error);
            });
        });
    }
    // 自动刷新token
    refreshToken() {
        this.saveToken().then(result => {
            let token = fs.readFileSync(path.join(__dirname, '\\token.json'), 'utf8');
            if (token) {
                setInterval(() => {
                    saveToken();
                }, (JSON.parse(token).expires_in - 5) * 1000)
            }
        }, error => {
        });
    };
};