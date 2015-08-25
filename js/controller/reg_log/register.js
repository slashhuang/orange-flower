/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function registerCtrl($scope, $routeParams, $location, $http, $timeout) {

        var sendSmsUrl = prefuri + "/user/getCode";//发送短信url
        var registerUrl = prefuri + "/user/register";//提交注册信息
        $scope.telephone = "";
        $scope.password = "";
        $scope.repeatPassword = "";
        $scope.code = "";

        $scope.registerSmsHint = "发送验证码";

        //通用函数
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
        /**
         * 点击切换checkbox样式
         */
        $scope.checkbox_register = function () {
            $scope.verified = !$scope.verified;
        };
        /**
         *
         * @paramjj
         */
        $scope.countTime = 0;
        var showCountDown = function () {
            //避免多次点击事件
            if ($scope.countTime == 0) {
                $scope.countTime = 10;
                $scope.registerSmsHint = $scope.countTime + "秒后重发";
                var state = setInterval(function () {
                    $scope.$apply(function () {
                        $scope.countTime--;
                        $scope.registerSmsHint = $scope.countTime + "秒后重发";
                        if ($scope.countTime <= 0) {
                            $scope.registerSmsHint = "发送验证码";
                            $scope.countTime = 0;
                            clearInterval(state);
                        }
                    })
                }, 1000)
            }


        };
        /**
         * 发送短信
         * @param tel
         */

        $scope.sendsms = function (tel) {
            //$http({
            //    "method":"post",
            //    "url":""
            //}).success(function(response, status, headers, config){
            showCountDown();
            //}).error(function(){
            //    showCountDown(10);
            //});
        };

        /**
         * 点击注册按钮
         * @param telephone
         * @param password
         * @param code
         */
        $scope.register = function (telephone, password, code) {
            $http({
                "method": "post",
                "url": registerUrl,
                "data": {
                    "tetephone": telephone,
                    "password": password,
                    "code": code
                }
            }).success(function (response, status, headers, config) {
                $timeout(function () {
                    alert("register succeed")
                }, 1000)
                //@TODO 跳转个人信息


            }).error(function () {
                alert('register failed')
            });
        };

        $scope.countTime = 0;
        var showCountDown = function () {
            //避免多次点击事件
            if ($scope.countTime == 0) {
                $scope.countTime = 10;
                $scope.registerSmsHint = $scope.countTime + "秒后重发";
                var state = setInterval(function () {
                    $scope.$apply(function () {
                        $scope.countTime--;
                        $scope.registerSmsHint = $scope.countTime + "秒后重发";
                        if ($scope.countTime <= 0) {
                            $scope.registerSmsHint = "发送验证码";
                            $scope.countTime = 0;
                            clearInterval(state);
                        }
                    });
                }, 1000);
            }
        };
    };
    registerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout'];

    return registerCtrl;
});