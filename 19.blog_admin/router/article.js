const express = require('express');
const utils = require('../utils/utils');
const db = require('../db/db');
const checkLogin = require('../middleware/checkLogin');
//创造一个路由
let router = express.Router();
//添加文章
router.get('/add',checkLogin,(req,res)=>{

    let sql = 'select * from blog_category';
    db.query(sql).then(data=>{
        res.render('admin/article/add.ejs',{categoryList:data});
    })

})
router.post('/add',checkLogin,(req,res)=>{

    let cid = req.body.cid;
    let title = req.body.title;
    let content = req.body.content;
    let sql = `insert into blog_article (cid,title,content) values('${cid}','${title}','${content}')`;
    console.log(sql);
    db.query(sql).then(data=>{
        if(data.affectedRows){
            req.flash('success','文章添加成功');
            res.redirect('/article/list');
        }else{
            req.flash('error','文章添加失败');
            res.redirect('back');
        }
    })
})

router.get('/list',checkLogin,(req,res)=>{

    let sql = 'select aid,title,c.cname from blog_article a join blog_category c on a.cid=c.cid';
    db.query(sql).then(data=>{
        res.render('admin/article/list.ejs',{articleList:data});
    })
})

module.exports = router;
