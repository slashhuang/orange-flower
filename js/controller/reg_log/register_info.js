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
        $scope.idTip = "";
        $scope.hintStatus = false;

        /**
         * /设置省份/城市/大学
         * @param params
         */
        $scope.setProvince = function(){
            var param = 'province';
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.province = response
                //console.log(response);
                $scope.debugLog(response);
            }).error(function(res){
            });
        };

        $scope.setCity = function(val){
            var param = val;
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.city = response;
                //console.log(response);
                $scope.debugLog(response);
            }).error(function(res){
            });
        };

        $scope.setSchool = function(val){
            var param = val;
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.school = response
                //console.log(response);
                $scope.debugLog(response);
            }).error(function(res){
            });
        };

        //初始情况下
        $scope.setProvince();

        /**
         * 检测身份证号码
         */
        var checkId = function(data){
            var bool = (/^[\d]{15}$/).test(data) || (/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/g).test(data);
            $scope.idTip = bool ? "" : "身份证格式错误";
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
            if(checkId($scope.completeData.idNo)&&checkIsAllOk(data)){
                return true;
            }
            else{
                $scope.idTip="请填写所有字段"
                return false
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
                "Room":$scope.selectedRoom,
            };

            $scope.debugLog(checkInfoEveryting(data))
           if(checkInfoEveryting(data)){
               $http({
                   "method":"post",
                   "url":completeInfoURL,
                   "data":data
               }).success(function(response, status, headers, config){
                   hintFUNC();
               }).error($scope.httpError);
           }
        };

        /**
         *提示额度功能
         */
        var hintFUNC = function(){//完善信息成功后输出提示并且跳转首页
            $scope.hintStatus =true;
            $scope.infoHint = "您已经获取6000元额度，可以立即购物哦";
            $timeout(function(){
                $scope.hintStatus = false;
                window.location.href="#/main"
            },2500);
        };

    };
    registerInfoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout','$rootScope'];

    return registerInfoCtrl;
});