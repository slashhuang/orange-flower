/**
 *   build by rwson 2015-09-14
 *   活动列表控制器
 */
define([], function () {
    function activityCtrl($scope, $routeParams, $location, $http,$rootScope) {

        $http({
            "url": $scope.prefuri + "/lottery/list",
            "method":"POST"
        }).success(function(res){
            $scope.listItem = res["content"];
        }).error($scope.httpError);

    }
    activityCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return activityCtrl;
});