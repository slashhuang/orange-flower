/**
 * Created by slashhuang on 15/8/23.
 */
define([], function () {
    //定义商品分类controller
    function userSettingsCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {
        /**
         * 初始化页面效果变量
         */
        $scope.logoutStatus = false;
        $scope.showFunc = false;
        $scope.infoHint = "";
        /**
         * 点击右上角，toggle功能区域
         */
        $scope.navIcon =function(){
            $scope.showFunc = !$scope.showFunc;
        };
        /**
         * 点击遮罩层，隐藏右上角
         */
        $scope.maskFunc = function(){
            $scope.showFunc = false;
        };
        /**
         * 点击退出登录，显示遮罩层，并隐藏右上角
         */
        $scope.logoutButton=function(){
            $scope.logoutStatus = true;
            $scope.showFunc = false;
        };
        /**
         * 点击取消，所有数据恢复原样
         */
        $scope.cencelLogout=function(){
            $scope.logoutStatus = false;
            $scope.showFunc = false;
        };

        /**
         * 发送邀请码
         */
        $scope.jumpCode=function(){
            var verifyCodeUrl = $scope.prefuri+"/user/judgeYqm";
            $http({
                "method": "post",
                "url": verifyCodeUrl
            }).success(function (data) {
                if(!data){
                    $scope.infoHint="您已经使用过邀请码";
                    $timeout(function(){ $scope.infoHint = "";},1000)
                }
                else{
                    $location.path("/invitedCode");
                }
            }).error($rootScope.httpError);

        };
        /**
         * 登出函数
         */
        $scope.logout = function () {
            var logoutURL = $rootScope.prefuri + "/user/logout";
            $http({
                "method": "get",
                "url": logoutURL
            }).success(function () {
                window.localStorage.centerData="";
                window.localStorage.isLogin = false;
                localStorage.clear();
                $location.path("/main");
            }).error(function (err) {
                $scope.cencelLogout();
                $rootScope.httpError(err);
            });
        };
    }

    userSettingsCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return userSettingsCtrl;
});