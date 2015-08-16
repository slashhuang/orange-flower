/**
 * Created by slashhuang on 15/8/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/detail', function(req, res, next) {
    res.render('order/order_detail', {});
});

router.get("/list",function(req,res,next){
    res.render('order/order_list',{})
});


module.exports = router;
