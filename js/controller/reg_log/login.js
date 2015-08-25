/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http,$timeout){
        //页面载入请求
        var loginURL = prefuri+"/user/login/";

        //初始情况下不显示提示
        $scope.loginStatus=false;

        //登录函数
        var outLogin=function(txt){
            var time = 4;
            $scope.infoHint=txt+time+"秒后转向首页";
            $scope.loginStatus = true;
            var interval = setInterval(function(){
                $scope.$apply(function(){
                    time --;
                    $scope.infoHint=txt+time+"秒后转向首页";
                    if(time == 0){
                        clearInterval(interval);
                        location.hash = "#/main";
                    }
                });
            },1000);
        };

        //点击登录按钮
        $scope.userLogin =function(loginName,password){
            window.isLogin = true;
            $http({
                "method":"post",
                "url":loginURL+loginName+'/'+password
            }).success(function(data){
                window.isLogin = true;
                //  登录成功
                outLogin("登录成功");
            }).error(function(){
                window.isLogin = false;
                outLogin("登录失败");
            });
        }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];

    return loginCtrl;
});