let https = require('https');
let fs = require('fs');
let path = require('path');
const request = require('request');

module.exports = class WxMenu {
    createMenu() {
        let menus = {
            "button": [
                {
                    "name": "TestButton1",
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "authentication",
                            "url": "http://104.194.91.80"
                        }
                    ],
                },
                {
                    "name": "TestButton2",
                    "type": "view",
                    "name": "authentication",
                    "url": "http://104.194.91.80"
                },
                {
                    "name": "联系我",
                    "type": "view",
                    "name": "authentication",
                    "url": "http://104.194.91.80"
                }
            ]
        };
        let access_token = fs.readFileSync(path.join(__dirname, '\\token.json'), 'utf8');
        if (!access_token) {
            console.log('can not get access_token!');
            return;
        }
        let token = JSON.parse(access_token).access_token;
        let options = {
            url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + token,
            form: JSON.stringify(menus),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return new Promise((resolve, reject) => {
            request.post(options, (err, res, body) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body);
                }
            })
        });
    }
    // createMenu() {
    //     let menus = {
    //         "button": [
    //             {
    //                 "name": "TestButton1",
    //                 "sub_button": [
    //                     {
    //                         "type": "view",
    //                         "name": "authentication",
    //                         "url": "http://104.194.91.80"
    //                     }
    //                 ],
    //             },
    //             {
    //                 "name": "TestButton2",
    //                 "type": "view",
    //                 "name": "authentication",
    //                 "url": "http://104.194.91.80"
    //             }
    //         ]
    //     };
    //     let access_token = fs.readFileSync(path.join(__dirname, '\\token.json'), 'utf8');
    //     if (!access_token) {
    //         console.log('can not get access_token!');
    //         return;
    //     }
    //     console.log('*************--->', access_token);
    //     let token = JSON.parse(access_token).access_token;
    //     let options = {
    //         protocol: 'https',
    //         hostname: "api.weixin.qq.com",
    //         path: "/cgi-bin/menu/create?access_token=" + token,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         }
    //     };
    //     return new Promise((resolve, reject) => {
    //         let req = https.request(options, res => {
    //             console.log('createMenu--->');
    //             res.setEncoding('utf8');
    //             res.on('data', result => {
    //                 console.log('result--->', JSON.parse(result));
    //                 resolve(result);
    //             });
    //             res.on('end', () => {
    //                 console.log('create menu done!');
    //             });
    //         });
    //         req.on('error', error => {
    //             reject(error)
    //         });
    //         req.write(JSON.stringify(menus));
    //         req.end();
    //     });
    // }
};