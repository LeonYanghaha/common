/**
 * 2017-04-16.
 * 路由文件
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var userEntity = require('../entity/user');
var userServer = require('../server/userServer');
var sha1 = require('utility');
var checkcookie = require('../middlewares/check').checkcookie;
var checklogin = require('../middlewares/check').checkLogin;

module.exports = function(app){
    app.get(
        '/getlogin',
        function(req,res){
            res.render('login');
        }
    );

    /*
    * 20170416
    * 公用的登录的路由
    * get请求
    * */
   app.get(
       '/login',
       checkcookie,
       function(req,res){
           var data = req.query;
           userServer.loginUserServer(data,function(results){
               if(results.length>=1){
                   var user = new userEntity();
                   user.userName = results[0].userName;
                   user.userAddress = results[0].userAddress;
                   user.userEmail = results[0].userEmail;
                   user.userHead = results[0].userHead;
                   user.userId = results[0].userId;
                   user.userIntroduce = results[0].userIntroduce;
                   user.userSex = results[0].userSex;
                   user.userState = results[0].userState;
                   user.userType = results[0].userType;
                   user.userBack =  results[0].userBack;
                   req.session.user = user;
                   var str = sha1.md5(user.userName);
                   req.cookie = str ;
                   res.send({logint_state:1,user:JSON.stringify(user) });
               }else{
                   res.send({logint_stat:0});
               }
           });
       }
   );
};
