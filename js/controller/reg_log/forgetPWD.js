/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function forgetPWDCtrl($scope, $routeParams, $location, $http,$timeout,$rootScope) {
        var forgetpwdURL = $rootScope.prefuri + "/user/forgot/";
        //收集数据并初始化
        $scope.passwordStatus = false;
        $scope.telHint = "";
        $scope.passwordHint = "";
        $scope.submitHint="";
        $scope.showPwd = false;
        $scope.telBool = false;
        
        $scope.telephone="";
        $scope.password="";
        $scope.code="";

        //点击触发下一步
        $scope.checkNextMove = function () {
            if($scope.passwordHint!="密码输入一致"){
                return false;
            };
            //  验证不通过就直接不放行
            $http({
                "method": "post",
                "url": forgetpwdURL + $scope.telephone + '/' + $scope.code + '/' + $scope.password,
            }).success(function (response, status, headers, config) {
                //console.log(response);
                $scope.debugLog(response);
                $scope.submitHint = "修改密码成功，即将跳转登录页面";
                $timeout(function(){
                    location.hash = "/login";
                },1000)
            }).error(function (response, status, headers, config) {
                alert(response.message);
            });
        };

        /**
         * 检测密码输入是否正确
         * @param passwordRepeat
         * @param password
         */
        $scope.checkPassword = function (passwordRepeat, password) {
            if (password.length<5) {
                $scope.passwordHint = "密码长度至少6位!";
                return false;
            } else if (!passwordRepeat.length) {
                $scope.passwordHint = "确认密码不得为空!";
            } else if (passwordRepeat == password && passwordRepeat) {
                $scope.passwordHint = "密码输入一致";
            } else {
                $scope.passwordHint = "密码输入不一致";
            }
        };

        /**
         * 显示密码输入
         */
        $scope.showPwdArea = function () {
            if(!$scope.telBool||($scope.code.length<3)){
                if(!_checkMobile($scope.telephone)){
                    $scope.telHint = "手机号格式不符!";
                }
                else{
                    $scope.telHint = "请输入正确的验证码!";
                }
                return false;
            }
            $scope.showPwd = true;
        };

        /**
         * 隐藏密码输
         */
        $scope.hidePwdArea = function(){
            $scope.showPwd = false;
        };

        /**
         * 在输入手机号时判断是否合法
         * @param mobile
         */
        $scope.checkMobile = function (mobile) {
            if (!_checkMobile(mobile)) {
                $scope.telHint = "手机号格式不符!";
                $scope.telBool = false;
            } else {
                $scope.telHint = "手机号格式正确!";
                $scope.telBool = true;
            }
        };

        /**
         * 获取验证码
         */
        $scope.sendsms = function (tel) {
            if (_checkMobile($scope.telephone)&&($scope.countTime==0)) {
                $scope.telHint = "";
                $http({
                    "method": "post",
                    "url": $scope.prefuri + "/user/getCode/" + tel
                }).success(function (res) {
                    //console.log(res)
                    $scope.debugLog(res);
                    if(res) {
                        $scope.telHint = "短信已下发至您的手机,请查收!";
                        showCountDown();
                    }
                    else{
                        $scope.telHint = "发送失败"
                    }
                }).error($rootScope.httpError);
            }
        };

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
         *显示倒计时
         * @paramjj
         */
        $scope.countTime = 0;
        $scope.registerSmsHint = "发送验证码";
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




    };

    forgetPWDCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$timeout','$rootScope'];

    return forgetPWDCtrl;
});