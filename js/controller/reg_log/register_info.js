/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function registerInfoCtrl($scope,$routeParams,$location,$http,$timeout){

        var completeInfoURL = prefuri+"/user/complete";//完善信息url
        var gettingDistrictList = prefuri+"/dict/items/";//获取城市和大学列表Url

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
        $scope.idStatus = false;

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
                console.log(response);
            }).error(function(res){
            });
        };

        $scope.setCity = function(val){
            //console.log($scope.completeData.province)
            var param = findId(val, $scope.completeData.province);
            console.log(findId(val, $scope.completeData.province));
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.city = response
                console.log(response);
            }).error(function(res){
            });
        };

        $scope.setSchool = function(val){
            var param = findId(val,$scope.completeData.city);
            $http({
                method:"get",
                url:gettingDistrictList+param
            }).success(function(response, status, headers, config){
                $scope.completeData.school = response
                console.log(response);
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
            $scope.idTip = bool ? "身份证格式正确" : "身份证格式错误";
            $scope.idStatus =bool;
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
         *@param data 数组
         * @param id 查询参数
         * @returns {number}
         */
        var findId = function (val, data) {
            var index =""
            angular.forEach(data, function (item, key) {
                if (item.value === val) {
                    index = item.id;
                }
            } )
            return index;
        };
        /**
         *点击触发下一步
         */
        var checkInfoEveryting = function(data){
            if(checkId($scope.completeData.idNo)&&checkIsAllOk(data)){
                return true;
            }
            else{
                return false
            }
        };
        //注册字段要修改
        $scope.nextStep = function(){
            var data = {
                "idNo": $scope.completeData.idNo,
                "province": $scope.selectedProvince,
                "county": 0,
                "city": $scope.selectedCity,
                "school": $scope.selectedSchool,
                "campus": $scope.selectedCampus,
                "level": $scope.selectedLevel,
                "userName": $scope.completeData.userName
            };
            checkId($scope.completeData.idNo);
           if( $scope.idStatus){
               $http({
                   "method":"post",
                   "url":completeInfoURL,
                   "data":data,
               }).success(function(response, status, headers, config){
                   hintFUNC();
               }).error(function(){
                   alert("程序员哥哥正在抢救服务器，请稍等")
               });
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
    registerInfoCtrl.$inject=['$scope','$routeParams','$location','$http','$timeout'];

    return registerInfoCtrl;
});