const mysql = require('mysql');
var db = mysql.createConnection({
            host:'localhost',//主机名
            user:'root',//用户名ing
            password:'root',//密码
            database:'jy1608_blog',//数据库名
            port:8889//mysql端口号
        });


module.exports = {
    query(sql){
        return new Promise((resolve,reject)=>{
            db.query(sql,(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })

    }
};
