/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope) {

        //初始情况下不显示提示
        $scope.loginfoHint="";
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

        /**
         * 跳出登录函数
         */

            var outLogin = function (txt) {
                var time = 2;
                $scope.loginfoHint = txt + time + "秒后转向首页";
                var interval = setInterval(function () {
                    $scope.$apply(function () {
                        time--;
                        $scope.loginfoHint = txt + time + "秒后转向首页";
                        if (time == 0) {
                            clearInterval(interval);
                            switch(txt){
                                case "登录成功":
                                    location.href = "/main";
                                    break;
                                case "登录失败":
                                    $scope.loginfoHint=""
                            }
                        }
                    });
                }, 1000);
            };


        /**
         * 点击登录按钮
         */
            $scope.userLogin = function (loginName, password) {
                var loginURL = $rootScope.prefuri + "/user/login";
                if ($scope.checkLoginData(loginName, password)){
                   var XHRrequest= $http({
                        "method": "post",
                        "url": loginURL+"/"+loginName+'/'+ password
                    }).success(function (data) {
                       if(data) {
                           window.localStorage.isLogin=true;
                           outLogin("登录成功");
                       }
                    });
                    XHRrequest.error($rootScope.httpError)
                }
            }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];

    return loginCtrl;
});