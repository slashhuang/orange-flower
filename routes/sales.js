/**
 * Created by slashhuang on 15/8/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/discount', function(req, res, next) {
    res.render('sale/discount_sale', {});
});

router.get("/hotsale",function(req,res,next){
    res.render('sale/hot_sale',{})
});

router.get("/detail",function(req,res,next){
    res.render('sale/item_detail',{})
});

module.exports = router;
