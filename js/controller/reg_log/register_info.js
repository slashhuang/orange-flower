/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerInfoCtrl($scope,$routeParams,$location,$http,$timeout,$rootScope){

        var completeInfoURL = $rootScope.prefuri+"/user/complete";//完善信息url
        var gettingDistrictList = $rootScope.prefuri+"/dict/items/";//获取城市和大学列表Url
        //页面载入请求
        $scope.completeData = {
            "idNo": "",
            "province": "",
            "city": "",
            "county": "",
            "school": "",
            "campus": "",
            "level": "",
            "userName": ""
        };

        /**
         * /设置省份/城市/大学
         */
        $scope.setProvince = function(){
            var param = 'province';
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.province = response
                $scope.debugLog(response);
            }).error(function(res){
                $rootScope.httpError(res);
            });
        };

        $scope.setCity = function(val){
            var param = val;
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.city = response;
                $scope.debugLog(response);
            }).error(function(res){
                $rootScope.httpError(res);
            });
        };

        $scope.setSchool = function(val){
            var param = val;
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.school = response;
                $scope.debugLog(response);
            }).error(function(res){
                $rootScope.httpError(res);
            });
        };

        /**
         * 初始情况下
         */
        $scope.setProvince();

        /**
         * 检测身份证号码
         */
        var checkId = function(data){
            var bool = (/^[\d]{15}$/).test(data) || (/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/g).test(data);
            $rootScope.errorMessage = bool ? "" : "身份证格式错误";
            $scope.idErr = !bool ? true : false;
            return bool;
        };
        /**
         * 检测对象中的所有数据都存在
         * @param data
         * @returns {boolean}
         */
        var checkIsAllOk= function(data){
            for(var index in data) {
                if (data.hasOwnProperty(index)) {
                    if (!data[index]) {
                        return false;
                    }
                }
            }
            return true;
        };

        /**
         *点击触发下一步
         */
        var checkInfoEveryting = function(data){
            console.log(data)
            if(checkId($scope.completeData.idNo)&&checkIsAllOk(data)){
                return true;
            }
            else{
                //alert($scope.idErr);
                $rootScope.ErrorMessage="请完善相关信息";
                if($scope.idErr){
                    $rootScope.ErrorMessage="身份证号格式错误";
                }
                $timeout(function(){$rootScope.ErrorMessage=""},800);
                return false;
            }
        };
        //注册字段要修改
        $scope.nextStep = function(){
            var data = {
                "idNo": $scope.completeData.idNo,
                "province": $scope.selectedProvince,
                "city": $scope.selectedCity,
                "school": $scope.selectedSchool,
                "campus": $scope.selectedCampus,
                "level": $scope.selectedLevel,
                "userName": $scope.completeData.userName,
                "room":$scope.selectedRoom
            };

           if(checkInfoEveryting(data)){
               data.invitedCode = $scope.invitedCode;
               console.log(data);
               $http({
                   "method":"post",
                   "url":completeInfoURL,
                   "data":data
               }).success(function(res){
                   hintFUNC(res);
                   $rootScope.jumpToCenter(false,'regInfo')
               }).error($scope.httpError);
           }
        };

        /**
         * 完善信息后有提示信息
         * @param money
         */
        var hintFUNC = function(money){
            //完善信息成功后输出提示并且跳转首页
            $scope.regInfoHint = "您已经获取"+ $scope.transferPrice(money) +"元额度，可以立即购物哦";
            var isBack = $location.search()["back"];
            $timeout(function(){
                $scope.regInfoHint = "";
                //window.location.href="#/main"
                isBack && history.back();
                !isBack && $location.path("/main");
            },2500);
        };


    };
    registerInfoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];

    return registerInfoCtrl;
});