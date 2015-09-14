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
        app.run(['$rootScope','$location','$timeout','$http',function ($rootScope,$location,$timeout,$http) {

            $rootScope.prefuri = "http://api.orangezc.com";

            /**
             * 全局处理errorMessage
             * @type {string}
             */
            $rootScope.ErrorMessage="";
            $rootScope.debugFlat = true;
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
             * TO_AUTH("立即认证"), FAIL("认证失败"), SUCCESS("认证成功"), AUTHING("待认证")
             * @param res
             * @returns {boolean}
             */
            $rootScope.verifyActive = function (res) {
                switch (res){
                    case  'TO_AUTH':
                        return false;
                        break;
                    case  'FAIL':
                        return false;
                        break;
                    case 'SUCCESS':
                    case "AUTHING":
                        return true;
                        break;
                }
            };
            /**
             * 渲染优惠信息
             * @param info
             * @param type
             * @param now
             * @param left
             * @returns {string}
             */
            $rootScope.rendOffInfo = function(info,type,now,left){
                var html = "",
                    start,end,progress,nums = "HAS";
                if(Object.prototype.toString.apply(info) == "[object Null]" || !info){
                    //  优惠信息不存在
                    return "";
                }
                //  判断优惠信息是否存在

                start = info["startTime"];
                end = info["endTime"];

                if(now < start){
                    progress = "NOT_START";
                    //  还没开始
                }else if(now >= start && now <= end){
                    progress = "ING";
                    //  正则进行
                }else if(now > end){
                    progress = "END";
                    //  活动结束
                }
                //  活动时间流程

                if(left == 0){
                    nums = "END";
                }
                //  是否售罄

                if(type == "detail"){
                    if(progress == "ING"){
                        html = "<div class='item-detail-position'> <div class='item-detail-banner active'> <div class='item-detail-inner'><div class='item-detail-inner1 active'>" +
                        "<span>立减</span> <span>" + info["discount"] + "</span> ";

                        if(nums == "END"){
                            html += "<i>罄</i>";
                        }

                        html += " </div> </div> </div> </div>";
                    }else{
                        html = "<div class='item-detail-position'> <div class='item-detail-banner gray'> <div class='item-detail-inner'><div class='item-detail-inner1 active'>" +
                        "<span>立减</span> <span>" + info["discount"] + "</span>";

                        if(nums == "END"){
                            html += "<i>罄</i>";
                        }

                        html += "</div> </div> </div> </div>";
                    }
                }else{

                    if(progress == "ING"){
                        html = "<div class='item-detail-position'> <div class='item-detail-banner active'> <div class='item-detail-inner'><div class='item-detail-inner1 active'>" +
                        "<span>立减</span> <span>" + info["discount"] + "</span> ";

                        if(nums == "END"){
                            html += "<i>罄</i>";
                        }

                        html += " </div> </div> </div> </div>";
                    }else{
                        html = "<div class='item-detail-position'> <div class='item-detail-banner gray'> <div class='item-detail-inner'><div class='item-detail-inner1 active'>" +
                        "<span>立减</span> <span>" + info["discount"] + "</span>";

                        if(nums == "END"){
                            html += "<i>罄</i>";
                        }

                        html += "</div> </div> </div> </div>";
                    }
                }
                return html;
                //}
            };


            /**
             * 统一处理ERROR
             * @param res
             * @param callback
             * @returns {Function|*}
             */
            $rootScope.httpError = function(res,callback){
                if(res&&res.message&&res.code!='10024'){
                    $rootScope.ErrorMessage = res.message;
                    $timeout(function(){
                        $rootScope.ErrorMessage="";
                        if(typeof callback=='function'){
                            callback();
                        }
                    },1000);
                }
                if(res&&res.code){
                    switch (res.code){
                        case '10000':
                            window.localStorage.isLogin = false;
                                $timeout(function () {
                                    $location.path('/login');
                                    //location.href="#/login"
                                },800);
                            break;//    用户未登录
                        case '10023':
                            window.localStorage.isLogin=false;
                                $timeout(function () {
                                    $location.path('/registerInfo');
                                    //location.href='#/registerInfo';
                                },800);
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
                return $location.path().indexOf(status) > -1 ? "active" : "";
            };
            /**
             * 处理HTTP请求，统一放置用户信息
             */
            $rootScope.jumpToCenter=function(centerFlag,where){

                /**
                 * 用户修改注册信息需要重新存储storage,加一层判断
                 */
                if(where){
                    window.localStorage.centerData="";
                }
                else{

                };

                if(window.localStorage.centerData){
                        $location.path("/user/center");
                    }
                else{
                    var userCenterUrl = $rootScope.prefuri + "/user/info";
                    var XHRrequest = $http({
                        "method": "post",
                        "url": userCenterUrl
                    });
                    XHRrequest.success(function (data) {
                        if(data){
                            window.localStorage.centerData = JSON.stringify(data);
                            window.localStorage.isLogin=true;
                            if(centerFlag){
                                $location.path("/user/center")
                            }
                        }
                    });
                    XHRrequest.error($rootScope.httpError);
                }
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

            $http({
                "url":$rootScope.prefuri + "/product/monthRates",
                "method":"post"
            }).success(function(res){
                $rootScope.rateInfo = res;
            }).error($rootScope.httpError);

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
                var hash = $location.path();
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