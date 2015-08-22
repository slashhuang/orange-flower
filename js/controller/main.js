/**
 * Created by slashhuang on 15/8/22.
 */
define(['angular'],function(angular){
        var mainModule = angular.module('mainModule',["ngRoute"]);
        mainModule.controller('mainCtrl', ['$scope', '$routeParams', '$http',
            function($scope, $routeParams, $http) {

                $scope.mainData={
                    discount:[],
                    category:[]
                };
                $http({
                    "method":"post",
                    "url":prefuri+"/product/typedProducts"
                }).success(function(data){
                    $scope.mainData.category =data;
                }).error(function(){
                });
                $http({
                    "method":"post",
                    "url":prefuri+" "
                }).success(function(data){
                    console.log(data);
                    $scope.mainData.discount =data;
                }).error(function(){
                });
                console.log($scope.mainData.category)
            }]);
    });