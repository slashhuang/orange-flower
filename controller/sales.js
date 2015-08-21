
var saleController = angular.module("saleController",[]);
//配置路由
saleController.config(['$routeProvider',function($routeProvider){
    $routeProvider.
        when('/sale/list', {
            templateUrl: '/views/sale/list.html',
            controller: 'saleListCtrl'
        }).
        when('/sale/discount', {
            templateUrl: '/views/sale/discount.html',
            controller: 'discountCtrl'
        }).
        when('/sale/category', {
            templateUrl: '/views/sale/category.html',
            controller: 'categoryCtrl'
        }).
        when('/sale/detail', {
            templateUrl: '/views/sale/detail.html',
            controller: 'detailCtrl'
        });
}]);
//定义商品分类controller
saleController.controller('categoryCtrl', ['$scope','$route','$routeParams','$location','$http',
    function($scope,$route, $routeParams,$location,$http) {
        //初始化变量完成
        $scope.category={
            saleNav:["苹果手机","安卓手机","手机配件","潮流数码","平板电脑","手提电脑","视频摄像"],
            saleNavStyle:[],
            itemInfo:[],
        };
        for(var i=0;i<5;i++){
            $scope.category.itemInfo[i]={
                img:"/images/item_detail/iphone6.png",
                detail:"苹果 iPhone6"
            };
        }
        for(var i=5;i<10;i++){
            $scope.category.itemInfo[i]={
                img:"/images/item_detail/iphone6.png",
                detail:"魅族 MX5"
            };

        };
        //定义JS
        $scope.toggle=function(){

        }
    }]);
//定义热卖商品controller
saleController.controller('discountCtrl',  ['$scope','$route','$routeParams','$location','$http',
    function($scope,$route, $routeParams,$location,$http) {
        $scope.discountList=[];
        for(var i=0;i<10;i++){
                $scope.discountList[i]={
                itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
                itemImg:"/images/item_detail/iphone6.png",
                itemPrice:"4788.00",
                itemOldPrice:"4688.00",
                itemInstallation:"220.94",
                itemCycle:24,
                discount:{
                    firstTime:300,
                    payOncePercent:[20,300]
                },
                saleState:true,
                timeCountDown:new Date().toLocaleString(),
                numLeft:0,
            };
        }
    }]);
//定义商品列表controller
saleController.controller('saleListCtrl',  ['$scope','$route','$routeParams','$location','$http',
    function($scope,$route, $routeParams,$location,$http) {
        $scope.saleList=[];
        for(var i=0;i<10;i++){
            $scope.saleList[i]={
                itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
                itemImg:"/images/item_detail/iphone6.png",
                itemPrice:"4788.00",
                itemInstallation:"220.94",
                itemCycle:24,
                saleState:true,
            };
        }
    }]);
//定义商品展示controller
saleController.controller('detailCtrl',  ['$scope','$route','$routeParams','$location','$http',
    function($scope,$route, $routeParams,$location,$http) {
        $scope.saleDetail={
            itemInfo:"苹果（Apple）iPhone 6 (A1586)金色 16GB 每个ID限购一单",
            itemImg:"/images/item_detail/iphone6.png",
            itemPrice:"4788.00",
            itemInstallation:"220.94",
            itemCycle:24,
            saleState:true,
        };

    }]);
