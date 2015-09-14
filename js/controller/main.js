/**
 * Created by slashhuang on 15/8/22.
 */
define(['angular',"util/swiper_"],function(angular,swiper){
        var mainModule = angular.module('mainModule',["ngRoute"]);
        mainModule.controller('mainCtrl', ['$scope', '$routeParams', '$http','$timeout','$rootScope','$location',
            function($scope, $routeParams, $http,$timeout,$rootScope,$location) {


                ///**
                // * 判断是否微信浏览器
                // * @returns {boolean}
                // */
                //function is_weixin(){
                //    var ua = navigator.userAgent.toLowerCase();
                //    console.log(ua)
                //    if(ua.match(/MicroMessenger/i)=="micromessenger") {
                //        return true;
                //    } else {
                //        return false;
                //    }
                //}
                //if(is_weixin()){
                //    $http({
                //        "method":"post",
                //        "url":$rootScope.prefuri+"/user/weixinOpenId"
                //    }).success(function(data){
                //        if(!data){
                //            $location.path($rootScope.prefuri+"/oauth/init?url="+encodeURI($location.absUrl()));
                //            console.log($rootScope.prefuri+"/oauth/init?url="+encodeURI($location.absUrl()))
                //        }
                //        else{
                //            window.localStorage.openId = JSON.stringify(data);
                //            console.log( window.localStorage.openId)
                //        }
                //    }).error($scope.httpError);
                //}
                //else{
                //    alert("只有在微信中才能购买橘花分期产品哦～")
                //}



                //首页数据请求地址
                var mainUrl = $rootScope.prefuri+"/product/typedProducts",
                    limeTimeSale = $scope.prefuri + "/product/listActivities/XSTM";
                //  主页数据url和限时特卖请求url

                //首页数据收集
                $scope.mainData={
                    discount:[],
                    category:[]
                };

                $http({
                    "method":"post",
                    "url":limeTimeSale
                }).success(function(res){
                    $scope.mainData.discount = res.slice(0,3);
                    console.log($scope.mainData.discount);
                }).error($scope.httpError);
                //  请求限时特卖数据

                /**
                 * http请求，渲染首页数据
                 */
                $http({
                    "method":"post",
                    "url":mainUrl
                }).success(function(data){

                    $scope.mainData.category =data;
                    $timeout(function(){
                        swiper.mainItem();
                        swiper.picture();
                    },30);
                    //加载数据后再调用
                }).error($rootScope.httpError);

                /**
                 * 根据不同的名字返回不同的图片名字
                 * @param name
                 */
                $scope.getPic = function(name){
                    var srcPri = "";
                    switch (name){
                        case "苹果手机":
                            srcPri = "iphone";
                            break;
                        case "摄影摄像":
                            srcPri = "camera";
                            break;
                        case "充值缴费":
                            srcPri = "service";
                            break;
                        case "手机配件":
                            srcPri = "mobile_collection";
                            break;
                        case "品牌电脑":
                            srcPri = "brand_pc";
                            break;
                        case "平板电脑":
                            srcPri = "laptop_pc";
                            break;
                        case "安卓手机":
                            srcPri = "android";
                            break;
                        case "数码潮流":
                            srcPri = "digital";
                            break;
                        default :
                            srcPri = "iphone";
                            break;
                    }
                    return srcPri;
                };

            }]);
    });
