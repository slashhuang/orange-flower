'use strict';

/* App Module */

var orangeFlowerAPP = angular.module('orangeFlowerAPP', [
  'ngRoute','indexControllers','saleController','ngTouch'
]);
//配置路由
orangeFlowerAPP.config(['$routeProvider',
  function($routeProvider) {
      //主页部分路由
      $routeProvider.when("/main",{
          templateUrl: '/views/main.html',
          controller: 'indexCtrl'
      });
      //用户部分路由
      $routeProvider.
        when("/user/settings",{
            templateUrl: '/views/user/settings.html',
            controller: 'userSettingsCtrl'
        }).
        when("/user/center",{
              templateUrl: '/views/user/center.html',
              controller: 'userCenterCtrl'
          }).
        when("/user/credit",{
              templateUrl: '/views/user/credit.html',
              controller: 'userCreditCtrl'
          });
      //登录注册部分
      $routeProvider.
          when("/register",{
              templateUrl: '/views/reg_login/register.html',
              controller: 'userRegisterCtrl'
          }).
          when("/login",{
              templateUrl: '/views/reg_login/login.html',
              controller: 'loginCtrl'
          }).
          when("/registerInfo",{
             templateUrl: '/views/reg_login/info.html',
            controller: 'userRegisterInfoCtrl'
          }).
          when("/forgetpwd",{
              templateUrl: '/views/reg_login/forget_pwd.html',
              controller: 'forgetPWDCtrl'
          });
      //订单部分路由
      $routeProvider.
          when('/order/detail', {
          templateUrl: '/views/order/detail.html',
          controller: 'orderDetailCtrl'
          }).
          when('/order/info', {
              templateUrl: '/views/order/info.html',
              controller: 'orderInfoCtrl'
          }).
          when('/order/list', {
              templateUrl: '/views/order/list.html',
              controller: 'orderListCtrl'
          });
      //账单部分路由
      $routeProvider.
          when('/bill', {
              templateUrl: '/views/bill/bill.html',
              controller: ''
          });
      //默认状态下路由转向登录页面
      $routeProvider.
          otherwise({
              redirectTo: '/main'
          });
      //商品部分路由
  }]);
