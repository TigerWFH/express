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
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "中文页面",
                            "url": "http://104.194.91.80"
                        }
                    ],
                },
                {
                    "name": "联系我",
                    "type": "view",
                    "url": "http://104.194.91.80"
                }
            ]
        };
        let allMenus = {
            "button": [
                {
                    "name": "monkey",
                    "sub_button": [
                        {
                            "name": "扫码带提示",
                            "type": "scancode_waitmsg",
                            "key": "rselfmenu_0_0",
                            "sub_button": []
                        },
                        {
                            "name": "扫码推事件",
                            "type": "scancode_push",
                            "key": "rselfmenu_0_1",
                            "sub_button": []
                        },
                        {
                            "name": "点击",
                            "type": "click",
                            "key": "rselfmenu_0_2",
                            "sub_button": []
                        }
                    ]
                },
                {
                    "name": "lion",
                    "sub_button": [
                        {
                            "name": "系统拍照发图",
                            "type": "pic_sysphoto",
                            "key": "rselfmenu_1_0",
                            "sub_button": []
                        },
                        {
                            "name": "拍照或者相册发图",
                            "type": "pic_photo_or_album",
                            "key": "rselfmenu_1_1",
                            "sub_button": []
                        },
                        {
                            "name": "微信相册发图",
                            "type": "pic_weixin",
                            "key": "rselfmenu_1_2",
                            "sub_button": []
                        }
                    ]
                },
                {
                    "name": "tiger",
                    "sub_button": [
                        {
                            "name": "发送位置",
                            "type": "location_select",
                            "key": "rselfmenu_2_0"
                        },
                        // {
                        //     "name": "图片",
                        //     "type": "media_id",
                        //     "media_id": "MEDIA_ID1"
                        // },
                        // {
                        //     "name": "图文消息",
                        //     "type": "view_limited",
                        //     "media_id": "MEDIA_ID2"
                        // },
                        {
                            "name": "页面跳转",
                            "type": "view",
                            "url": "http://104.194.91.80"
                        },
                    ]
                }
            ]
        }
        let access_token = fs.readFileSync(path.join(__dirname, '\\token.json'), 'utf8');
        if (!access_token) {
            console.log('can not get access_token!');
            return;
        }
        let token = JSON.parse(access_token).access_token;
        let options = {
            url: "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + token,
            form: JSON.stringify(allMenus),
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