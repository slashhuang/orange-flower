/**
 * Created by slashhuang on 15/8/17.
 */
var express = require('express');
var router = express.Router();

module.exports = router;
router.get("/",function(req,res,next){
    res.render("bill/bill",{})
});

