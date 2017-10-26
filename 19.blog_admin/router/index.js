const express = require('express');
const utils = require('../utils/utils');
const db = require('../db/db');
const checkLogin = require('../middleware/checkLogin');
//创造一个路由
let router = express.Router();
//登录操作


// localhost:8888/index
router.get('/',checkLogin,(req,res)=>{
    res.render('admin/index.ejs');
})

module.exports = router;
