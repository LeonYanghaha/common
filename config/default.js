/*
* 20170317
*
* 整个项目的配置文件
* */
module.exports ={
  //path 这个配置项，是实在没办法之后的最low的解决方案。
  path:'../../../../..',
  //配置session的相关信息
  session:{
    secret:'user',
    key:'user',
    maxAge:2592000000
  },
  //主机的链接信息
  host_port:8081,
  host_url:'127.0.0.1',
  //数据库连接信息
  db_port:3306,
  db_host:'127.0.0.1',
  db_username:"root",
  db_password:"111111",
  db_connectionLimit:15,
  db_name:'photo',
};