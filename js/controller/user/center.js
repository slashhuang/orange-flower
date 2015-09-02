/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function centerCtrl($scope, $routeParams, $location, $http,$rootScope) {
        var userCenterUrl = $rootScope.prefuri + "/user/info";
        $scope.centerData = {};
        //页面载入请求

        $scope.verifyActive = function (res) {
            switch (res){
                case 'NONE':
                    return false;
                    break;
                case  'NO':
                    return false;
                    break;
                case  'YES':
                    return true;
                    break;
            }
        };
        $http({
            "method": "post",
            "url": userCenterUrl
        }).success(function (data) {
            $scope.debugLog(data);
            if(data){
                $scope.centerData = data;
            }
            else{
                alert('fucking not login')
            }

        }).error(
            function(){
                alert("fucking error")
            });


    }
    centerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return centerCtrl;
});