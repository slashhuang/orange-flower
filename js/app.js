/**
 * Created by slashhuang on 15/8/21.
 */
define(['loadScript', 'angular', 'config/routeConfig','lib/angular-cookies', 'lib/angular-route',
        'controller/main', 'controller/sales/sales',
        'controller/user/user', 'controller/order/order',
        'controller/reg_log/reglog', 'controller/main',
        'controller/sales/sales', 'controller/user/user',
        'controller/reg_log/reglog', 'controller/order/order', 'controller/bill/bill'],
    function (scriptsLoader, angular, routeConfig) {

        var app = angular.module('app',
            ["ngRoute", "ngCookies","mainModule", "salesModule", "ngLoadScript",
              "userModule", "orderModule", "reglogModule", "orderModule", "billModule"]);
        //定义服务
        app.filter('trustHtml', ['$sce',function ($sce) {

            return function (input) {

                return $sce.trustAsHtml(input);

            }}]);


        //定义全局变量
        app.run(['$rootScope','$location','$timeout',function ($rootScope,$location,$timeout) {

            $rootScope.prefuri = "http://api.orangezc.com";

            /**
             * 全局处理errorMessage
             * @type {string}
             */
            $rootScope.ErrorMessage="";
            $rootScope.debugFlat = true;
            $rootScope.isLogin = true;
            /**
             * 根据debug句柄判断是否调用console.log或者alert
             * @param info  输出的信息
             * @param type  类型
             */
            $rootScope.debugLog = function(info,type){
                if($rootScope.debugFlat){
                    if(type == "alert"){
                        alert(info);
                    }else{
                        console.log(info);
                    }
                }
            };
            /**
             *
              * @param res
             * @returns {boolean}
             */
            $rootScope.verifyActive = function (res) {
                switch (res){
                    case  'DISABLED':
                        return false;
                        break;
                    case  'ENABLED':
                        return true;
                        break;
                }
            };


            //$rootScope.httpError = function(res){
            //    if(res&&res.message){
            //        alert(res.message);
            //    };
            //    if(res&&res.code){
            //        switch (res.code){
            //            case '10000':
            //                $rootScope.isLogin = false;
            //                break;//用户未登录
            //            default :
            //               break;
            //        }
            //    }
            //};

            $rootScope.httpError = function(res){
                var errorHandler={};
                if(res&&res.message){
                    $rootScope.ErrorMessage = res.message;
                };
                if(res&&res.code){
                    switch (res.code){
                        case '10000':
                            $rootScope.isLogin = false;
                            errorHandler.loginAction =
                                $timeout(function () {
                                    location.href='#/login';
                                },2000);
                            break;//用户未登录
                        default :
                            errorHandler.loginAction= function () {
                                return false;
                            }
                    }
                }
                return errorHandler.loginAction;
            };

            /**
             * 价格单位转换,从分转成元
             * @param price
             * @returns {string}
             */
            $rootScope.transferPrice = function (price) {
                return parseFloat((parseInt(price) / 100).toFixed(2));
            };

            /**
             * 根据不同的url判断来追加不同的class样式
             * @param status
             * @returns {string}
             */
            $rootScope.addActive = function (status) {
                return location.href.indexOf(status) > -1 ? "active" : "";
            };

        }]);
        var loadEl = document.getElementsByClassName("refresh-mask")[0];

        app.controller("BottomController", ['$http', '$location', '$scope', '$rootScope', function ($http, $location, $scope, $rootScope) {
            $scope.addActive = function (cur) {

                /**
                 * change location.hash to location.href
                 * @type {string}
                 */
                var hash = location.href;
                if (hash.indexOf(cur) > 0) {
                    return "active";
                }
                return "";
            };
        }]);
        //定义全局变量
        //配置路由
        app.config(routeConfig);
        angular.bootstrap(document, ['app']);
    });