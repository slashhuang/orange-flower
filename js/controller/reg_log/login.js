/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope) {
        //页面载入请求
        var loginURL = $rootScope.prefuri + "/user/login/";


        //初始情况下不显示提示
        $scope.infoHint="";
        $scope.checkVaildHint = "";

        /**
         * 检测手机号是否合法
         * @param mobile
         * @private
         */
        function _checkMobile(mobile) {
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
            return reg.test(mobile);
        }

        /**
         * password.length>=6
         * @param password
         */
        function checkPws(password) {
            if (password&&password.length > 5) {
                return true
            }
        }

        /**
         * 在点击登录时判断是否合法
         * @param mobile
         */
        $scope.checkLoginData = function (mobile, password) {
            if (!_checkMobile(mobile)) {
                $scope.checkVaildHint = "手机号格式不符!";
                return false;
            } else {
                if (!checkPws(password)) {
                    $scope.checkVaildHint = "密码至少6位!";
                    return false;
                }
                else {
                    return true;
                }
            }
        };

        //组件
        //跳出登录函数
            var outLogin = function (txt) {
                var time = 2;
                $scope.infoHint = txt + time + "秒后转向首页";
                var interval = setInterval(function () {
                    $scope.$apply(function () {
                        time--;
                        $scope.infoHint = txt + time + "秒后转向首页";
                        if (time == 0) {
                            clearInterval(interval);
                            switch(txt){
                                case "登录成功":
                                    location.href = "/main";
                                    break;
                                case "登录失败":
                                    $scope.infoHint=""
                            }
                        }
                    });
                }, 1000);
            };
            //点击登录按钮
            $scope.userLogin = function (loginName, password) {
                if ($scope.checkLoginData(loginName, password)){
                   var XHRrequest= $http({
                        "method": "post",
                        "url": loginURL + loginName + '/' + password
                    }).success(function (data) {
                       if(data) {
                           $rootScope.isLogin = true;
                           outLogin("登录成功");
                       }
                        else{
                           $rootScope.isLogin = false;
                           $scope.infoHint = "密码错误";
                           $timeout(function(){
                               $scope.infoHint=""
                           },1000)
                       }
                    });
                    XHRrequest.error(function(res){
                        $rootScope.httpError(res);
                        $scope.infoHint = res.message;
                        $timeout(function(){$scope.infoHint = ""},1500)
                    })
                }
            }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];

    return loginCtrl;
});