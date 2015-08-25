/* Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function loginCtrl($scope,$routeParams,$location,$http,$timeout) {
        //页面载入请求
        var loginURL = prefuri + "/user/login/";

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
            if (password.length > 5) {
                return true
            }
        }

        /**
         * 在点击登录时判断是否合法
         * @param mobile
         */
        $scope.checkMobile = function (mobile, password) {
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

        //初始情况下不显示提示
        $scope.loginStatus = false;
        $scope.checkVaildHint = "";

        //组件
        //跳出登录函数
            var outLogin = function (txt) {
                var time = 2;
                $scope.infoHint = txt + time + "秒后转向首页";
                $scope.loginStatus = true;
                var interval = setInterval(function () {
                    $scope.$apply(function () {
                        time--;
                        $scope.infoHint = txt + time + "秒后转向首页";
                        if (time == 0) {
                            clearInterval(interval);
                            switch(txt){
                                case "登录成功":
                                    location.hash = "#/main";
                                    break;
                                case "登录失败":
                                    $scope.loginStatus = false;
                            }
                        }
                    });
                }, 1000);
            };
            //点击登录按钮
            $scope.userLogin = function (loginName, password) {
                if ($scope.checkMobile(loginName, password)){
                    $http({
                        "method": "post",
                        "url": loginURL + loginName + '/' + password
                    }).success(function (data) {
                        //接口存在问题，无论如何都能登录
                        console.log(data)
                        window.isLogin = true;
                        outLogin("登录成功");
                    }).error(function () {
                        window.isLogin = false;
                        $scope.infoHint = "密码错误";
                        $scope.loginStatus = true;
                            $timeout(function(){
                            $scope.loginStatus = false;
                        },1000)
                    });
                }
            }
    };
    loginCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];

    return loginCtrl;
});