/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function centerCtrl($scope, $routeParams, $location, $http) {
        var userCenterUrl = prefuri + "/user/info";
        $scope.centerData = {};
        //页面载入请求
        $http({
            "method": "post",
            "url": userCenterUrl
        }).success(function (data) {
            $scope.centerData = data;
        }).error(function () {
        });

        $scope.verifyActive = function () {
            return $scope.authenticate == "yes";
        };

        /**
         * 根据hash区分是第几个tab
         * @param cur
         */
        $scope.addActive = function(cur){
            var hash = location.hash;
            if(hash.indexOf(cur) > 0){
                return "active";
            }
            return "";
        };

    }
    centerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return centerCtrl;
});