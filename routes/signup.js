let express = require('express');
let router = express.Router();
let User = require('../models/users');

// 注册新用户
router.post('/', (req, res, next) => {
    console.log('name--->', req.body.name);
    res.json({
        msgCode: 0,
        msgText: 'success'
    });
});

module.exports = router;