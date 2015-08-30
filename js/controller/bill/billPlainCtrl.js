define([], function () {
    //还款历史
    function billPlainCtrl($scope, $routeParams, $location, $http,$rootScope) {
        //初始化变量完成

        $http({
            "method":"post",
            "url":$rootScope.prefuri + "/repay/repayments"
        }).success(function(res){
            $scope.data = res;
        }).error(function(err){

        });

        /**
         * 通过bill来判断是否返回
         * @param bill
         * @returns {string}
         */
        $scope.backClass = function (bill) {
            var className = "";
            if (bill == true) {
                className += "billed";
            }
            return className;
        };

        /**
         * 返回已还或待还
         * @param billed
         */
        $scope.getState = function(billed){
            return billed ? "已还":"待还";
        };

        /**
         * 根据具体的键值(有或没有)返回该元素在数组中的位置
         * @param data
         * @param id
         * @param attr
         * @returns {number}
         * @private
         */
        function _findIndex(data, id, attr) {
            var index = -1;
            angular.forEach(data, function (item, key) {
                if (attr) {
                    if (item[attr] === id) {
                        index = key;
                    }
                } else {
                    if (item === id) {
                        index = key;
                    }
                }
            });
            return index;
        }

    };
    billPlainCtrl.$inject = ['$scope', '$routeParams', '$location', '$http','$rootScope'];
    return billPlainCtrl;
});