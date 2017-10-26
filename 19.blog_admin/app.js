const express = require('express');//引入express框架
const path = require('path');//引入path模块
const bodyParser = require('body-parser');//处理post数据，req.body
const cookieParser = require('cookie-parser');//处理cookie
const cookieSession = require('cookie-session');//处理session
const multer = require('multer');//处理上传文件
const consolidate = require('consolidate');//管理模板引擎的
const mysql = require('mysql');//数据库模块
let flash = require('connect-flash');//消息提示模块
let server = express();//创建服务器
server.use(bodyParser.urlencoded({ //使用bodyparser中间件
    extended:false
}));

server.use(cookieParser());
server.use(cookieSession({
    //数组中必须是字符串形式，否则 session 会出错，导致 connect-flash不可用
    keys:['111','2222','3333','4444','555']
}));

server.use(flash());

//模板引擎的配置
server.set('view engine','html');

server.set('views','./views');

server.engine('html',consolidate.ejs);

//分配公共信息
server.use((req,res,next)=>{
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    //用户登录的信息
    res.locals.user = req.session.user ? req.session.user : null;
    res.locals.act = res.locals.act ? res.locals.act : '';
    next();
})


//设置静态文件
let url = path.join(__dirname,'/public');
server.use(express.static(url));

let log_reg = require('./router/log_reg');
//localhost:8888/log_reg
server.use('/log_reg',log_reg);
//localhost:8888/
let index = require('./router/index');
server.use('/index',index);
//栏目路由
server.use('/category',require('./router/category'));
//文章路由
server.use('/article',require('./router/article'));


//所有路由的下面，是404页面
server.use((req,res)=>{

    res.render('admin/404.ejs');

})

server.listen(8888);//监听端口号
