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
         *@param data 数组
         * @param id 查询参数
         * @returns {number}
         */
         var findIndex = function(id,data){
            var index = -1;
            angular.forEach(data,function(item,key){
                if(item.id === id){
                    index = key;
                }
            });
            return index;
        };
        /*查询颜色选项
         *@param data 数组
         * @param id 查询参数
         * @returns {number}
         */
        var findColorIndex = function(data){
            var index = -1;
            angular.forEach(data,function(item,key){
                if(item.selected){
                    index = item.id;
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
         *设置选中的颜色
         * @param tags
         */////@TODO这边先不用写动作，直接请求数据后渲染
        $scope.setSelectedColor=function(id){
            $scope.selectedColorId = id
        };
        $scope.setSelectedShape=function(id){
            $scope.selectedShapeId = id
        };
        //初始化http请求+变量
        $http({
            "method":"post",
            "url":detailUrl
        }).success(function(data){
            console.log(data);
            $scope.saleDetail = data;

            /***初始化自己设置的变量*/
            //选择商品标签及颜色
            $scope.itemColors = $scope.saleDetail.attrs[0];//颜色
            $scope.itemShapes = $scope.saleDetail.attrs[1];//外形


            ///@TODO直接请求数据，不用自己写动作
            $scope.selectedColorId = findColorIndex($scope.itemColors.items);
            $scope.selectedShapeId = findColorIndex($scope.itemShapes.items);

            console.log('color='+$scope.selectedColorId+'shape'+$scope.selectedShapeId);

            // [选择价格月份]
            $scope.finalMonth = $scope.saleDetail.minMonth;
            $scope.firstTimePay = "0";
            $scope.calculateMoney = $scope.transferPrice($scope.saleDetail.price);


        }).error(function(){
        });

        //初始化数据
        $scope.showFrame = false;




    };
    detailCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return detailCtrl
});