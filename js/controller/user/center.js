/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function centerCtrl($scope, $routeParams, $location, $http,$rootScope) {
        var userCenterUrl = $rootScope.prefuri + "/user/info";
        $scope.centerData = {};
        //页面载入请求
        $http({
            "method": "post",
            "url": userCenterUrl
        }).success(function (data) {
            $scope.centerData = data;
            console.log(data)
        }).error(function () {
        });

        $scope.verifyActive = function () {
            return $scope.authenticate == "yes";
        };

    }
    centerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return centerCtrl;
});