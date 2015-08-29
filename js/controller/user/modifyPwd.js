/**
 * Created by slashhuang on 15/8/23.
 */
define([], function () {
    //定义商品分类controller
    function modifyPwdCtrl($scope, $routeParams, $location, $http, $timeout,$rootScope) {
        var modifyPwdUrl = $rootScope.prefuri + "";
        $scope.submitHint = "";//输入错误提示
        $scope.hintStatus = false;//初始情况下不显示提示
        //需要提交服务器的数据
        $scope.currentPWD = "";
        $scope.newPWD = "";
        $scope.repeatNewPWD = "";
        $scope.modifyState =false;
        $scope.verifyNewPwd = function () {
            if ($scope.currentPWD.length == 0) {
                $scope.submitHint = "原密码不能为空";
                $scope.modifyState =false
            } else if (!$scope.newPWD.length || !$scope.repeatNewPWD) {
                $scope.submitHint = "新密码不能为空";
                $scope.modifyState =false;
            } else if ($scope.newPWD == $scope.repeatNewPWD) {
                $scope.submitHint = "密码修改成功,即将跳转用户中心";
                $scope.modifyState =true;
            } else {
                $scope.submitHint = "密码校验错误";
                $scope.modifyState =false;
            }
        };
        //登出函数
        $scope.modfifyRequest = function () {
            $scope.verifyNewPwd();
            $scope.hintStatus = true;
            $timeout(function () {
                $scope.hintStatus = false;
                if( $scope.modifyState){
                    $http({
                        "method": "post",
                        "url": modifyPwdUrl
                    }).success(function (data) {
                        console.log("空接口成功");
                        location.hash = "#/user/center"
                    }).error(function () {
                        console.log("接口调试失败")
                    });
                }
            }, 2000);
        };
        //重置头像@TODO
        $scope.changeHead = function () {

        }
    }

    modifyPwdCtrl.$inject = ['$scope', '$routeParams', '$location', '$http', '$timeout','$rootScope'];
    return modifyPwdCtrl;
});