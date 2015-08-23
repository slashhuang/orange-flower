define([], function () {
    //还款历史
    function billMainCtrl($scope, $routeParams, $location, $http) {
        //初始化变量完成

        var date = new Date(),
            month = date.getMonth();

        $scope.year = date.getFullYear();
        $scope.month = date.getMonth() + 1;
        //  取得当前年月


    };
    billMainCtrl.$inject = ['$scope', '$routeParams', '$location', '$http'];
    return billMainCtrl;
});