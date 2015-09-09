/**
 * Created by slashhuang on 15/8/23.
 */
define([],function(){
    function infoCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){

        /**
         * 重新取数据，之后再模块化
         * @type {string}
         */
        var userCenterUrl = $rootScope.prefuri + "/user/info";
        /**
         * 处理HTTP请求
         */
        var XHRrequest = $http({
            "method": "post",
            "url": userCenterUrl
        });
        XHRrequest.success(function (data) {
            if(data){
                console.log(data);
                $scope.centerData = data;
                $scope.verifiedStatus = $scope.verifyActive($scope.centerData.userAuthOffline.authStatus.value);
            }
            else{
                $scope.verifiedStatus=false;
            }
        });
        XHRrequest.error($scope.httpError);


    }
    infoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];
    return infoCtrl;
});