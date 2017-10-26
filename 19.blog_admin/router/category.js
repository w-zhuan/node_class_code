const express = require('express');
const utils = require('../utils/utils');
const db = require('../db/db');
const checkLogin = require('../middleware/checkLogin');
//创造一个路由
let router = express.Router();
//登录操作
// 栏目列表
router.get('/list',checkLogin,(req,res)=>{
    res.locals.act = 'cat_list';
    let sql = 'select * from blog_category';
    db.query(sql).then(data=>{
        if(data.length){
            res.render('admin/category/list.ejs',{categoryList:data});
        }
    })
})
//栏目添加
router.get('/add',checkLogin,(req,res)=>{
    res.locals.act = 'cat_add';
    res.render('admin/category/add.ejs');
})
router.post('/add',checkLogin,(req,res)=>{
    let cname = req.body.cname;
    let sql = `insert into blog_category (cname) values ('${cname}')`;
    db.query(sql).then((data)=>{
        if(data.affectedRows){
            req.flash('success','栏目添加成功');
            res.redirect('/category/list');
        }else{
            req.flash('error','添加失败');
            res.redirect('back');
        }
    })

    console.log(sql);
})

router.get('/del/:cid',checkLogin,(req,res)=>{
    let cid = req.params.cid;
    let sql = `delete from blog_category where cid=${cid}`;
    db.query(sql).then(data=>{
        if(data.affectedRows){
            req.flash('success','删除成功');
            res.redirect('/category/list');
        }else{
            req.flash('error','删除失败');
            res.redirect('back');
        }
    })
})

router.get('/edit/:cid',checkLogin,(req,res)=>{
    let cid = req.params.cid;
    let sql = `select * from blog_category where cid=${cid}`;
    db.query(sql).then(data=>{
        let category = data[0];
        res.render('admin/category/edit.ejs',{category:category});
    })
})
router.post('/edit',checkLogin,(req,res)=>{
    let cid = req.body.cid;
    let cname = req.body.cname;
    //更新的sql  update blog_category set cname='更新的值' where cid='4'
    let sql = `update blog_category set cname='${cname}' where cid=${cid}`;
    db.query(sql).then(data=>{
        if(data.affectedRows){
            req.flash('success','更新成功');
            res.redirect('/category/list');
        }else{
            req.flash('error','更新失败');
            res.redirect('back');
        }
    })
})

module.exports = router;
