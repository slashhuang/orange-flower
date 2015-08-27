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


        $scope.submitHint="";
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
            else{
                return false;
            }
        }

        /**
         * 在点击登录时判断是否合法
         * @param mobile
         */

        $scope.checkVaildHint = "";
        $scope.checkMobile = function (mobile, password,verified) {
            if(verified){
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
            }
            else{
                $scope.checkVaildHint = "请勾选同意协议按钮～";
            }

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
        $scope.sendsms=function(tel){
            $http({
                "method":"post",
                "url":sendSmsUrl+"/"+tel
            }).success(function(response, status, headers, config){
                $scope.checkVaildHint = "短信已发送，请查收";
                showCountDown();
            }).error(function(response, status, headers, config){
                console.log(response);
                alert(response.message)
            });
        };

        /**
         * 点击注册按钮
         * @param telephone
         * @param password
         * @param code
         */
        $scope.registerSubmit = function (telephone,password,code,verified) {
            if($scope.checkMobile(telephone, password,verified)){
                $http({
                    "method": "post",
                    "url": registerUrl+"?telephone="+telephone+"&password="+password+"&code="+code
                }).success(function (response, status, headers, config) {
                    $scope.submitHint="注册成功！";
                    hintFunc();
                }).error(function (res) {
                    $scope.submitHint=res.message;
                    hintFunc()
                });
            }
        };

        /**
         * 检测密码输入是否正确
         * @param passwordRepeat
         * @param password
         */
        $scope.checkPassword = function ( password,passwordRepeat) {
            if (password.length<5) {
                $scope.checkVaildHint = "密码长度至少6位!";
                return false;
            } else if (!passwordRepeat.length) {
                $scope.checkVaildHint = "确认密码不得为空!";
            } else if (passwordRepeat == password && passwordRepeat) {
                $scope.checkVaildHint = "密码输入一致";
            } else {
                $scope.checkVaildHint = "密码输入不一致";
            }
        };

        var hintFunc =function(){
            $timeout(function(){
                $scope.submitHint=""
            },2000)
        };
    };
    registerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout'];

    return registerCtrl;
});