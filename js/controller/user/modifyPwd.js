/**
 * Created by slashhuang on 15/8/23.
 */
define([], function () {
    //定义商品分类controller
    function modifyPwdCtrl($scope, $routeParams, $location, $http, $timeout,$rootScope) {
        var modifyPwdUrl = $rootScope.prefuri + "/user/modifyPwd";
        /**
         * error 信息统一用rootscope中的ErrorMessage
         * @type {string}
         */
        $scope.currentPWD = "";
        $scope.newPWD = "";
        $scope.repeatNewPWD = "";

        $scope.passwordHint ="";

        /**
         * 验证部分
         */
        $scope.verifyOriginPwd =function(){
            if ($scope.currentPWD.length == 0) {
                $scope.passwordHint = "原密码不能为空";
                return false
            }
            else{
                $scope.passwordHint="";
                return true;
            }
        };
        $scope.verifyNewPwdLength =function(){
            if ($scope.newPWD.length<6 || $scope.newPWD.length>18) {
                $scope.passwordHint = "请设置6-18位新密码";
                return false
            }
            else{
                $scope.passwordHint="";
                return true;
            }
        };
        $scope.verifyNewPwd = function () {
            if ($scope.newPWD != $scope.repeatNewPWD){
                $scope.passwordHint = "新密码输入不一致";
                return false;
            }
            else{
                $scope.passwordHint = "新密码输入一致";
                return true;
            }
        };

        /**
         * 登出函数
         */

        $scope.modfifyRequest = function () {
            if($scope.verifyNewPwd()&&$scope.verifyNewPwdLength()&&$scope.verifyOriginPwd()){

                var jump_out = function () {
                    $scope.ErrorMessage ="修改密码成功";
                    $timeout(function () {
                        $scope.ErrorMessage ="";
                        //location.href = "#/user/center";
                        location.href = "/user/center"
                    }, 2000);
                };

                $http({
                    "method": "post",
                    "url": modifyPwdUrl+"/"+$scope.currentPWD+"/"+$scope.newPWD
                }).success(function (data) {
                    jump_out()
                }).error($rootScope.httpError);
            };
        };
    }

    modifyPwdCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout','$rootScope'];
    return modifyPwdCtrl;
});