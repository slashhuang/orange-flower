//加载中间件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//创建APP实例
var app = express();


//加载中间件解析
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置模版引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置静态资源路径
app.use(favicon(path.join(__dirname+"/favicon.ico")));
app.use(express.static(path.join(__dirname, 'public')));

//路由文件
var routes = require('./routes/index');//公有视图
var users = require('./routes/users');//个人设置相关
var sales = require("./routes/sales");//所有的商品页面
var orders = require("./routes/orders");//所有订单页面
//加载路由
app.use('/', routes);
app.use('/user', users);
app.use('/sale', sales);
app.use('/order', orders);
//错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
