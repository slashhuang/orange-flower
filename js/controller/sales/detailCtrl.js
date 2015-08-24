/**
 * Created by slashhuang on 15/8/21.
 */
/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类controller
    function detailCtrl($scope,$routeParams,$location,$http){
        //获取参数渲染页面
        var itemID= $routeParams.detailId;

        //统一URL
        var detailUrl = prefuri+"/product/"+itemID;

        /*******通用函数
         *
         * @param id
         * @returns {number}
         */
         var findIndex = function(id){
            var index = -1;
            angular.forEach($scope.category.saleNav,function(item,key){
                if(item.id === id){
                    index = key;
                }
            });
            return index;
        };

        /**
         * 价格转换器
         * @param price
         * @returns {string}
         */
        $scope.transferPrice = function(price){
            return (price / 100).toFixed(2);
        };
        /**
         *
         * @param state
         */
        $scope.activeShowFrame = function(state){
            if(state){
                $scope.showFrame = false;
            }
            else{
                $scope.showFrame = true;
            }
            //document.getElementsByTagName("body")[0].style.position = fixed;
        };
        /**
         *
         * @param min
         * @param max
         * @returns {Array}
         */

        $scope.monthSelector = function(min,max){
            var monthArray = [];
            for(var i =min-1;i<max;i++){
                monthArray[i]=min+i;
            }
            return monthArray;
        };

        /**
         * 计算月份公式
         * @param finalMonth
         * @param firstTimePay
         */
        $scope.calculate =function(finalMonth,firstTimePay){
            $scope.calculateMoney = (($scope.transferPrice($scope.saleDetail.price)-firstTimePay)/finalMonth).toFixed(2);
        };
        /**
         * 改变三角形style
         * @param index
         */
        $scope.changeTrianlge = function(index){
            var triangleClass = ["item-canvas-firstTime","item-canvas-secondTime","item-canvas-thirdTime"];
            switch(index){
                case 0:
                    return triangleClass[0];
                case 1:
                    return triangleClass[1];
                case 2:
                    return triangleClass[2];
                default:
                    return triangleClass[0];
            }
        };
        /**
         *
         * @param tags
         */
        $scope.selectStyle=function(id,data){
            var selectCss = "active";
            $scope.tapColor = findIndex(id,data);

        };
        $scope.activeSelect =function(id){


        };
        //初始化http请求+变量
        $http({
            "method":"post",
            "url":detailUrl
        }).success(function(data){
            console.log(data);
            $scope.saleDetail = data;
            //初始化自己设置的变量
            $scope.finalMonth = $scope.saleDetail.minMonth;
            $scope.firstTimePay = "0";
            $scope.calculateMoney = $scope.transferPrice($scope.saleDetail.price)

        }).error(function(){
        });

        //初始化数据
        $scope.showFrame = false;




    };
    detailCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return detailCtrl
});