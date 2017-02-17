let router = require('express').Router();
let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectID;
let client = mongodb.MongoClient;
let serverUrl = 'mongodb://127.0.0.1:27017/blog';
module.exports = class User {
    constructor() {
    }
    getUserList() {
        return new Promise((resolve, reject) => {
            client.connect(serverUrl, (err, db) => {
                let ret = {
                    msgCode: 1,
                    msgText: 'failure',
                };
                if (err) {
                    reject(ret);
                    return;
                }
                db.collection('users')
                    .find()
                    .toArray((err, result) => {
                        if (err) {
                            db.close();
                            reject(ret);
                            return;
                        }
                        ret.msgCode = 0;
                        ret.msgText = 'success';
                        ret.data = result;
                        resolve(ret);
                        db.close();
                    });
            });
        })

    }
    getUser(userId) {
        return new Promise((resolve, reject) => {
            client.connect(serverUrl, (err, db) => {
                let ret = {
                    msgCode: 1,
                    msgText: '失败'
                };
                if (err) {
                    reject(ret);
                    return;
                }
                db.collection('users')
                    .find({ "_id": new ObjectId(userId) })
                    .toArray((err, result) => {
                        if (err) {
                            db.close();
                            reject(ret);
                            return;
                        }
                        ret.msgCode = 0;
                        ret.msgText = "success";
                        ret.data = result;
                        resolve(ret);
                        db.close();
                    });
            });
        })
    }
};