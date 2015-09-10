/**
 * Created by slashhuang on 15/8/21.
 */
define([], function () {
    //定义商品分类controller
    function centerCtrl($scope, $routeParams, $location, $http,$rootScope,$timeout) {


        var userCenterUrl = $rootScope.prefuri + "/user/info";
        var XHRrequest = $http({
            "method": "post",
            "url": userCenterUrl
        });
        XHRrequest.success(function (data) {
            if(data){
                window.localStorage.centerData = JSON.stringify(data);
                if(window.localStorage.centerData){
                    $rootScope.centerData = JSON.parse(window.localStorage.centerData);
                    var uData = JSON.parse(localStorage.centerData);
                    if(uData["displayPicture"] && uData["displayPicture"] != 0){
                        $scope.headPic = $scope.prefuri + "/file/z2/" + uData["displayPicture"];
                    }else{
                        $scope.headPic = "../images/default-head.jpg";
                    }
                    //  显示用户头像
                }
                else{
                    $location.path("/login");
                    //location.href="/login"
                }

                /**
                 * 判断是否完善信息
                 * @param info
                 */
                $scope.rendInfo = function(info){
                    if(!info){
                        return "请先完善信息";
                    }
                    return info;
                };

                /**
                 * 处理跳转信用额度中心
                 * @param bool
                 */
                $scope.centerJump = function(offStatus){
                    var status = $scope.verifyActive(offStatus);
                    if(status){
                        //location.href = "#/user/info";
                        $location.path("/user/info");
                    }
                    else {
                        //location.href = "#/registerInfo";
                        $location.path("/registerInfo");
                    }
                };

            }
        });
        XHRrequest.error($rootScope.httpError);
    }
    centerCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope','$timeout'];
    return centerCtrl;
});