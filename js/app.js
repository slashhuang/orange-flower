/**
 * Created by slashhuang on 15/8/21.
 */
define(['loadScript', 'angular', 'config/routeConfig', 'lib/angular-route',
        'controller/main', 'controller/sales/sales',
        'controller/user/user', 'controller/order/order',
        'controller/reg_log/reglog', 'controller/main',
        'controller/sales/sales', 'controller/user/user',
        'controller/reg_log/reglog', 'controller/order/order', 'controller/bill/bill'],
    function (scriptsLoader, angular, routeConfig) {

        //window.prefuri = "http://api.orangezc.com";
        window.isLogin = false;
        var app = angular.module('app',
            ["ngRoute", "mainModule", "salesModule", "ngLoadScript", "userModule", "orderModule", "reglogModule", "orderModule", "billModule"]);


        //定义全局变量
        app.run(function ($rootScope) {
            $rootScope.prefuri = "http://api.orangezc.com";
            //  ajax请求前缀

            $rootScope.isLogin = false;
            //  判断是否登录成功

            /**
             * 价格单位转换,从分转成元
             * @param price
             * @returns {string}
             */
            $rootScope.transferPrice = function (price) {
                return (price / 100).toFixed(2);
            };

            /**
             * 根据不同的url判断来追加不同的class样式
             * @param status
             * @returns {string}
             */
            $rootScope.addActive = function (status) {
                return location.href.indexOf(status) > -1 ? "active" : "";
            };

        });


        var loadEl = document.getElementsByClassName("refresh-mask")[0];

        app.controller("BottomController", ['$http', '$location', '$scope', '$rootScope', function ($http, $location, $scope, $rootScope) {
            $scope.addActive = function (cur) {
                var hash = location.hash;
                if (hash.indexOf(cur) > 0) {
                    return "active";
                }
                return "";
            };
            //console.log($scope)

        }]);
        //定义全局变量
        //配置路由
        app.config(routeConfig);
        angular.bootstrap(document, ['app']);
    });