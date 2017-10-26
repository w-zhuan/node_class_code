const express = require('express');
const utils = require('../utils/utils');

const db = require('../db/db');

//创造一个路由
let router = express.Router();
//登录操作
// localhost:8888/login
router.get('/login',(req,res)=>{
    res.render('admin/log_reg/login.ejs',{});
})
//登录操作
router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let newPassword = utils.md5(password);
    let sql = `select uid,username,avatar from blog_user where username='${username}' and password='${newPassword}'`;

    console.log(sql);
    db.query(sql).then((data)=>{
        if(data.length){
            req.flash('success','登录成功');
            req.session.user = data[0];
            res.redirect('/index');
        }else{
            req.flash('error','用户名或密码错误');
            res.redirect('back');
        }
    });
})
//退出登录
router.get('/logout',(req,res)=>{
    req.session.user = null;
    res.redirect('/log_reg/login');
})
//注册操作
//localhost:8888/log_reg/reg
router.get('/reg',(req,res)=>{
    res.render('admin/log_reg/reg.ejs',{});
})



router.post('/reg',(req,res)=>{

    let password = req.body.password;
    let username = req.body.username;
    let newPassword = utils.md5(password);
    let sql = `insert into blog_user (username,password) values('${username}','${newPassword}')`;
    db.query(sql).then((data)=>{
        if(data.affectedRows){
            req.flash('success','注册成功');
            res.redirect('/log_reg/login');
        }else{

            req.flash('error','注册失败');
            res.redirect('back');
        }
    })
})

module.exports = router;
