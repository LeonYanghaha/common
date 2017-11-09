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
var sesseion_List = new Array();

module.exports = function(app){
    app.get(
        '/getlogin',
        function(req,res){
            res.render('login');
        }
    );
    /*
    * 20170430
    * 获取session
    * */
    app.get(
        '/getsession/:cookie',
        function(req,res){
            var cookie = req.params.cookies;
            for(var i = 0 ; i < sesseion_List.length ; i++){
                var temp = sha1.md5(sesseion_List[i].userName);
                if(temp==cookie){
                    res.send({logint_state:1,user:JSON.stringify(sesseion_List[i]) });
                }
            }
            res.send({logint_state:1});
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
           var cookie = req.query.cookies;
           var username = sha1.md5(req.query.username);

           console.log("cookie:"+cookie);
           console.log("username:"+username);
           if(cookie.length ==32 ){
               if(username == cookie){ //当前已经成功登陆了。并且cookie是合法的。
                   //遍历session数组
                   for(var i = 0 ; i < sesseion_List.length ; i++){
                       var temp = sha1.md5(sesseion_List[i].userName);
                       if(temp==cookie){
                           console.log("遍历session数组");
                           res.send({logint_state:1,user:JSON.stringify(sesseion_List[i]) });
                       }
                   }
               }
           }

           //当前还没有登陆
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
                       sesseion_List.push(user);
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
