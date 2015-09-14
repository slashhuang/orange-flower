/**
 * Created by slashhuang on 15/9/14.
 */
/**
 * Created by slashhuang on 15/8/23.
 */
define([], function () {
    //定义商品分类controller
    function invitedCodeCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {
        var codeUrl=$scope.prefuri+"/user/saveInviteCode/";
        $scope.checkCode="";
        //登出函数
        $scope.submitCode = function (invitedCode) {
            if(invitedCode){
                $http({
                    "method": "post",
                    "url": codeUrl+invitedCode
                }).success(function (data) {
                    $scope.checkCode="邀请码提交成功";
                    $timeout(function(){ $location.path("/user/center"); $scope.checkCode="";},1000)
                }).error($rootScope.httpError);
            }
            else{
                $scope.checkCode="请输入验证码";
                $timeout(function(){
                    $scope.checkCode="";
                },1000)
            }
        };
    }

    invitedCodeCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return invitedCodeCtrl;
});