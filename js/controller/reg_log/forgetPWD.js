/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function forgetPWDCtrl($scope, $routeParams, $location, $http) {
        var forgetpwdURL = prefuri + "/user/forgot/";
        //收集数据并初始化
        $scope.passwordStatus = false;
        $scope.telHint = "";
        $scope.passwordHint = "";
        $scope.showPwd = false;
        $scope.telBool = false;
        $scope.dataCollection = {
            mobile: "",
            password: "",
            code: ""
        };

        //点击触发下一步
        $scope.checkNextMove = function () {
            if(!!$scope.passwordHint.length){
                return false;
            }
            //  验证不通过就直接不放行
            $http({
                "method": "post",
                "url": forgetpwdURL + $scope.dataCollection.mobile + '/' + $scope.dataCollection.code + '/' + $scope.dataCollection.password,
            }).success(function (response, status, headers, config) {
                location.hash = "/login"
            }).error(function () {
                console.log($scope.dataCollection);
                location.hash = "/login"
            });
        };

        /**
         * 检测密码输入是否正确
         * @param passwordRepeat
         * @param password
         */
        $scope.checkPassword = function (passwordRepeat, password) {
            if (!password.length) {
                $scope.passwordHint = "原密码不得为空!";
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
            if(!$scope.telBool){
                if(!_checkMobile($scope.dataCollection.mobile)){
                    $scope.telHint = "手机号格式不符!";
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
        $scope.getCode = function () {
            if (!_checkMobile($scope.dataCollection.mobile)) {
                $scope.telHint = "手机号格式不符!";
                $scope.telBool = false;
            } else {
                $scope.telHint = "";
                $http({
                    "url": prefuri + "/user/getCode/" + $scope.dataCollection.mobile,
                    "method": "post"
                }).success(function (res) {
                    $scope.telHint = "短信已下发至您的手机,请查收!";
                }).error(function (err) {
                });
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
    };

    forgetPWDCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];

    return forgetPWDCtrl;
});