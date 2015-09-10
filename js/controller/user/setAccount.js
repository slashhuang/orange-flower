/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    //定义商品分类controller
    function setAccountCtrl($scope,$routeParams,$location,$http,$rootScope) {
        var setAccountUrl = $rootScope.prefuri + "/user/complete";
        //登出函数
        $scope.logout = function () {
            $http({
                "method": "post",
                "url": setAccountUrl
            }).success(function (data) {
            }).error($rootScope.httpError);
        };

        var uData = JSON.parse(localStorage.centerData);
        //  显示用户头像
        if (uData["displayPicture"] && uData["displayPicture"] != 0) {
            $scope.headPic = $scope.prefuri + "/file/z2/" + uData["displayPicture"];
        } else {
            $scope.headPic = "../images/default-head.jpg";
        }
        //  显示用户头像

        //重置头像@TODO
        $scope.changeHead = function () {

            var uData = JSON.parse(localStorage.centerData);
            //  显示用户头像
            if (uData["displayPicture"] && uData["displayPicture"] != 0) {
                $scope.headPic = $scope.prefuri + "/file/z2/" + uData["displayPicture"];
            } else {
                $scope.headPic = "../images/default-head.jpg";
            }
            //  显示用户头像

        }
    }
    setAccountCtrl.$inject=['$scope','$routeParams','$location','$http','$rootScope'];
    return setAccountCtrl;
});