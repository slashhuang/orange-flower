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
            $rootScope.isLogin = false;
            /**
             * 根据debug句柄判断是否调用console.log或者alert
             * @param info  输出的信息
             * @param type  类型
             */
            $rootScope.debugLog = function(info,type){
                if($rootScope.debugFlat){
                    console.trace();
                    if(type == "alert"){
                        alert(info);
                    }else{
                        console.log(info);
                    }
                }
            };
            /**
             * NONE("未认证"), NO("认证失败"), YES("认证成功");
             * @param res
             * @returns {boolean}
             */
            $rootScope.verifyActive = function (res) {
                switch (res){
                    case  'NONE':
                        return false;
                        break;
                    case  'NO':
                        return false;
                        break;
                    case 'YES':
                        return true;
                        break;
                    case "WAIT":
                        return true;
                }
            };

            /**
             * 渲染优惠信息
             * @param info
             */
            $rootScope.rendOffInfo = function(info){

                if(Object.prototype.toString.apply(info) == "[object Null]" || !info){
                    //  优惠信息不存在
                    return "";
                }
                return "<div class='item-detail-position'> <div class='item-detail-banner active'> <div class='item-detail-inner'><div class='item-detail-inner1 active'>" +
                "<span>立减</span> <span>" + info["discount"] + "</span> <!--i>罄</i--> </div> </div> </div> </div>";
            };

            /**
             * 统一处理ERROR
             * @param res
             * @param callback
             * @returns {Function|*}
             */
            $rootScope.httpError = function(res,callback){
                if(res&&res.message){
                    $rootScope.ErrorMessage = res.message;
                    $timeout(function(){
                        $rootScope.ErrorMessage="";
                        callback && callback();
                    },1800);
                }
                if(res&&res.code){
                    switch (res.code){
                        case '10000':
                            $rootScope.isLogin = false;
                                $timeout(function () {
                                    location.href='/login';
                                    //location.href="#/login"
                                },2000);
                            break;//    用户未登录
                        case '10023':
                            $rootScope.isLogin = false;
                                $timeout(function () {
                                    location.href='/registerInfo';
                                    //location.href='#/registerInfo';
                                },2000);
                            break;//    完善信息
                        case '10024':
                            $rootScope.debugLog(res.message,'alert');
                            break;
                        default :
                            break;
                    }
                }
            };

            /**
             * 价格单位转换,从分转成元
             * @param price
             * @returns {string}
             */
            $rootScope.transferPrice = function (price) {
                if(!price || price == 0){
                    price = 0;
                }
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

            /**
             * 根据不同的type渲染class
             * @param type
             * @param index
             * @returns {string}
             */
            $rootScope.curClass = function(type,index){
                var sortArr = ["DEFAULT","SALE","PRICE"];
                return _findIndex(sortArr,type) == index ? "cur-choosed-tab" : "";
            };
        }]);


        /**
         * 根据具体的键值(有或没有)返回该元素在数组中的位置
         * @param data
         * @param id
         * @param attr
         * @returns {number}
         * @private
         */
        function _findIndex(data,id,attr){
            var index = -1;
            angular.forEach(data,function(item,key){
                if(attr){
                    if(item[attr] === id){
                        index = key;
                    }
                }else{
                    if(item === id){
                        index = key;
                    }
                }
            });
            return index;
        }

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