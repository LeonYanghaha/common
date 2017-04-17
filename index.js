/*
 * 20170416
 * comment项目的入口文件
 * */
var express = require('express');
var session = require('express-session');
var config = require('config-lite');
var route = require('./route/index.js');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//设置模版引擎
app.set('view engine','ejs');

app.set('views',__dirname+"/view");

app.use(
    bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    }//,
    //store: new MongoStore({// 将 session 存储到 mongodb
    //    url: config.mongodb// mongodb 地址
    //})
}));


route(app);

app.listen(
    config.host_port,
    config.host_url
);
