/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function forgetPWDCtrl($scope,$routeParams,$location,$http){
        //统一Ajax请求
        $scope.dataCollection={
            mobile:"",
            password:"",
            code:""
        };
        //页面载入请求
        $scope.AJAXhttp = function(){
            var forgetDATA = $scope.dataCollection;
            $http({
                "method":"post",
                "url":prefuri+"/user/forgot/"+forgetDATA.mobile+'/'+forgetDATA.code+'/'+forgetDATA.password
            }).success(function(data){
                console.log(data);
                console.log("forgotpwd data succeed");
            }).error(function(){
                alert("请求失败")
            });
        }
    };
    forgetPWDCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return forgetPWDCtrl;
});