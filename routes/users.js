var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/center', function(req, res, next) {
  res.render('user/user_center', {});
});

router.get("/credit",function(req,res,next){
  res.render('user/user_credit',{})
});

router.get("/login",function(req,res,next){
  res.render('user/reg_login/login',{})
});

router.get("/register",function(req,res,next){
  res.render('user/reg_login/register',{})
});

router.get("/info",function(req,res,next){
  res.render('user/reg_login/register_info',{})
});

router.get("/settings",function(req,res,next){
  res.render('user/reg_login/settings',{})
});
module.exports = router;
