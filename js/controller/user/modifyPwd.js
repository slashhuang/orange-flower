/**
 * Created by slashhuang on 15/8/23.
 */
define([], function () {
    //定义商品分类controller
    function modifyPwdCtrl($scope, $routeParams, $location, $http, $timeout) {
        var modifyPwdUrl = prefuri + "";
        $scope.submitHint = "";//输入错误提示
        $scope.hintStatus = false;//初始情况下不显示提示
        //需要提交服务器的数据
        $scope.currentPWD = "";
        $scope.newPWD = "";
        $scope.repeatNewPWD = "";
        $scope.verifyNewPwd = function () {
            if ($scope.currentPWD.length == 0) {
                $scope.submitHint = "原密码不能为空";
            } else if (!$scope.newPWD.length || !$scope.repeatNewPWD) {
                $scope.submitHint = "新密码不能为空";
            } else if ($scope.newPWD == $scope.repeatNewPWD) {
                $scope.submitHint = "密码输入已经一致";
            } else {
                $scope.submitHint = "密码校验错误";
            }
        };
        //登出函数
        $scope.modfifyRequest = function () {
            $scope.verifyNewPwd();
            $scope.hintStatus = true;
            $http({
                "method": "post",
                "url": modifyPwdUrl
            }).success(function (data) {
                console.log("空接口成功");
                $timeout(function () {
                    location.hash = "#/user/center"
                }, 1000)

            }).error(function () {
                console.log("接口调试失败")
            });
            $timeout(function () {
                $scope.hintStatus = false;
            }, 1500);
        };
        //重置头像@TODO
        $scope.changeHead = function () {

        }
    }

    modifyPwdCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout'];
    return modifyPwdCtrl;
});