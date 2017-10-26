var checkLogin = function (req,res,next){
    if(!req.session.user){
        res.redirect('log_reg/login');
    }else{
        next();
    }
}

module.exports = checkLogin;
