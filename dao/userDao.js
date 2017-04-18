/*
* 20170318
* 和用户相关的数据库操作方法
* */
var query = require('./getPool.js');

module.exports = {
    /*
     * 20170318
     * 用户登陆
     * */
    loginUserDao:function(data,cb){
        query('SELECT userId,userName,userPassword,userEmail,userSex,userAddress,userIntroduce,userState,userHead,userType,userBack FROM USER WHERE userName = ? AND userPassword =?',
            [data.username,data.password],
            function(error,results){
                //console.log(results);
                if(error){
                    console.log("用户登陆出错！");
                    console.log(error);
                }else{
                    cb(results);
                }
            });
    }
};