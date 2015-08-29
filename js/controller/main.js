/**
 * Created by slashhuang on 15/8/22.
 */
define(['angular',"util/swiper_"],function(angular,swiper){
        var mainModule = angular.module('mainModule',["ngRoute"]);
        mainModule.controller('mainCtrl', ['$scope', '$routeParams', '$http','$timeout','$rootScope',
            function($scope, $routeParams, $http,$timeout,$rootScope) {
                //首页数据请求地址
                var mainUrl = $rootScope.prefuri+"/product/typedProducts";

                //通用函数

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
                }).error($rootScope.httpError);

            }]);
    });
