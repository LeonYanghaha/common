/**
 * 2017-04-16.
 * 路由文件
 */
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var user = require('../entity/user');
var userServer = require('../server/userServer');
var sha1 = require('utility');
var superagent = require('superagent');
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
       function(req,res){
           var data = req.query;
           console.log(data.username);
           console.log(data.password);
           var url = data.url-0;
           userServer.loginUserServer(data,function(results){
               if(results.length>=1){
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
                   var str = 'logint_state=1&userName='+user.userName+'&userAddress='+user.userAddress+
                             "&userEmail="+user.userEmail+"&userId="+user.userId+
                             "&userIntroduce="+user.userIntroduce+"&userSex="+user.userSex+
                             "&userBack="+user.userBack+"&userState="+user.userState+
                             "&userHead="+user.userHead+"&userType="+user.userType;
                   //如果登陆成功.
                   res.send({logint_state:1,user:str});
               }else{
                   res.send({logint_stat:0});
               }
           });
       }
   );
};
