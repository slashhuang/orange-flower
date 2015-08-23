/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function forgetPWDCtrl($scope,$routeParams,$location,$http){
        var forgetpwdURL = prefuri + "/user/forgot/"
        //收集数据并初始化
        $scope.passwordStatus = false;
        $scope.passwordHint = "";
        $scope.showPwd =false;
        $scope.dataCollection={
            mobile:"",
            password:"",
            code:""
        };
        //点击触发下一步
        $scope.checkNextMove = function(){
            console.log()
            $http({
                "method":"post",
                "url":forgetpwdURL+$scope.dataCollection.mobile+'/'+$scope.dataCollection.code+'/'+$scope.dataCollection.password,
            }).success(function(response, status, headers, config){
                alert("即将跳转到登录页面");
                window.location.href="#/login"
            }).error(function(){
                console.log($scope.dataCollection);
                alert("即将跳转到登录页面");
                window.location.href="#/login"
            });
        };
        //校验密码是否一致
        $scope.checkPassword = function(passwordRepeat,password){
            if(passwordRepeat == password){
                $scope.passwordHint="密码输入已保持一致"
            }
            else{
                $scope.passwordHint="密码输入还味保持一致"
            }
        };
        //显示密码设置页面
        $scope.openPwd = function(){
            $scope.showPwd =true;
        }
        $scope.closePwd = function(){
            $scope.showPwd =false;
        }
    };


    forgetPWDCtrl.$inject=['$scope','$routeParams','$location','$http'];

    return forgetPWDCtrl;
});