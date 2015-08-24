/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http,$timeout){
        //页面载入请求
        var loginURL = prefuri+"/user/login/";

        //初始情况下不显示提示
        $scope.loginStatus=false;

        //跳出登录函数
        var outLogin=function(){
            var time = 4;
            $scope.infoHint="登录成功"+time+"秒后转向首页";
            $scope.loginStatus = true;
            var interval = setInterval(function(){
                $scope.$apply(function(){
                    time --;
                    $scope.infoHint="登录成功"+time+"秒后转向首页";
                    if(time == 0){
                        clearInterval(interval);
                        location.hash = "#/main";
                    }
                });
            },1000);
        };

        //点击登录按钮
        $scope.userLogin =function(loginName,password){
            $http({
                "method":"post",
                "url":loginURL+loginName+'/'+password
            }).success(function(data){
                outLogin();
            }).error(function(){
            });
        }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];

    return loginCtrl;
});