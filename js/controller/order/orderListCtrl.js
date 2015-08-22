/**
 * Created by slashhuang on 15/8/21.
 */
define([],function(){
    //定义商品分类orderList
    function orderListCtrl($scope,$routeParams,$location,$http){
        //初始化变量完成

        var uId = $location.search()["uId"],
        //  从url里面获取uId

            httpProfix = "http://juhua-server.orange.com";
        //  请求前缀

        $http({
            "method":"get",
            "url":httpProfix + "/order/list/" + uId
        }).success(function(res){
            $scope.data = res["content"];
        }).error(function(){
            $scope.data = [];
        });
        //  请求数据

        /**
         * 删除订单
         * @param id
         */
        $scope.deleteOrder = function(id){
            var index = _findIndex($scope.data,id,'orderNum');
            $scope.data.splice(index,1);
        };

        /**
         * 再次购买
         * @param id
         */
        $scope.reBuy = function(id){};

        /**
         * 根据具体的键值(有或没有)返回该元素在数组中的位置
         * @param data
         * @param id
         * @param attr
         * @returns {number}
         * @private
         */
        function _findIndex(data,id,attr){
            var index = -1;
            angular.forEach(data,function(item,key){
                if(attr){
                    if(item[attr] === id){
                        index = key;
                    }
                }else{
                    if(item === id){
                        index = key;
                    }
                }
            });
            return index;
        }
    };
    orderListCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return orderListCtrl;
});
