/**
 * 取消订单原因控制器
 * build by rwson @2015-08-23
 */
define([],function(){
    //定义取消订单原因orderReason
    function orderReasonCtrl($scope,$routeParams,$location,$http){

        //初始化变量完成
        $scope.data = [
            {
                "text":"卖家缺货",
                "checked":true
            },
            {
                "text":"拍错了",
                "checked":false
            },
            {
                "text":"不想要了",
                "checked":false
            },
            {
                "text":"订单信息错误",
                "checked":false
            },
            {
                "text":"其他",
                "checked":false
            }
        ];

        /**
         * 选中某个具体的原因
         * @param index
         */
        $scope.checkThis = function(index){
            angular.forEach($scope.data,function(item,indx){
               item["checked"] = false;
            });
            $scope.data[index]["checked"] = true;
        };

        /**
         * 判断是否返回具体的class名
         * @param arg
         */
        $scope.checkedClass = function(arg){
            if(arg){
                return "checked-reason";
            }
            return "";
        };
    };
    orderReasonCtrl.$inject=['$scope','$routeParams','$location','$http'];
    return orderReasonCtrl;
});
