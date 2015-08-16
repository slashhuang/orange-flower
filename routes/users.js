var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user_center', function(req, res, next) {
  res.render('user/user_center', {});
});

router.get("/user_credit",function(req,res,next){
  res.render('user/user_credit',{})
});

router.get("/login",function(req,res,next){
  res.render('user/reg_login/login',{})
});

router.get("/register",function(req,res,next){
  res.render('user/reg_login/register',{})
});

router.get("/register_info",function(req,res,next){
  res.render('user/reg_login/register_info',{})
});

router.get("/settings",function(req,res,next){
  res.render('user/reg_login/settings',{})
});
module.exports = router;
