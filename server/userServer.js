/**
 * 20170318
 * 用户的server层
 */
var userDao = require('../dao/userDao.js');
module.exports = {
    /*
     * 20170318
     * 用户登陆
     * */
    loginUserServer:function(data,cb){
        userDao.loginUserDao(data,cb);
    }
}

