/**
 * Created by slashhuang on 15/8/22.
 */
define(['angular',"util/swiper_"],function(angular,swiper){
        var mainModule = angular.module('mainModule',["ngRoute"]);
        mainModule.controller('mainCtrl', ['$scope', '$routeParams', '$http','$timeout',
            function($scope, $routeParams, $http,$timeout) {

                //首页数据请求地址
                var mainUrl = prefuri+"/product/typedProducts";

                //通用函数
                /**
                 * 价格转换器
                 * @param price
                 * @returns {string}
                 */
                $scope.transferPrice = function(price){
                    return (price / 100).toFixed(2);
                };


                //首页数据收集
                $scope.mainData={
                    discount:[],
                    category:[]
                };


                $http({
                    "method":"post",
                    "url":mainUrl
                }).success(function(data){
                    console.log(data)
                    $scope.mainData.category =data;
                    $timeout(function(){
                        swiper.mainItem();
                        swiper.picture()
                    },30);
                    //加载数据后再调用

                }).error(function(){
                });


                /**
                 * 根据hash区分是第几个tab
                 * @param cur
                 */
                $scope.addActive = function(cur){
                    var hash = location.hash;
                    if(hash.indexOf(cur) > 0){
                        return "active";
                    }
                    return "";
                };

            }]);
    });
