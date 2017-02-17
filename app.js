// 程序的逻辑层次
/*      ------------------
        |    UI layer    |----->UI process:复杂的系统可衍生出来该层，用于和Business通信
        ------------------
        |  Business过程  |----->service：复杂的系统可衍生出来该层，用来封装Business对象
        ------------------
        |  Business对象  |----->DAO：复杂的系统可衍生出来该层，用来封装对数据库的操作；简单的直接在Business对象中处理了
        ------------------
        |    基础设施    |
        ------------------
        Business对象：抽象业务模型，实现业务流程
        Business过程：组合Business对象，实现业务流程的自动化，其输入输出都是Business对象
        model包含：business过程和business对象在内
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');

var app = express();

// view engine setup
// 此处可以采用模板开发，注释掉则相当于存ajax请求开发
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    // res.render('error', {
    //   message: err.message,
    //   error: {}
    // });
});


module.exports = app;