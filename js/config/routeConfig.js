
define([], function () {
    function routecfg($routeProvider){
        //主页部分路由
        $routeProvider.when("/main",{
            templateUrl: '/views/main.html',
            controller: ''
        });
        //商品部分路由
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
        //用户部分路由
        $routeProvider.
            when("/user/settings",{
                templateUrl: '/views/user/settings.html',
                controller: 'userSettingsCtrl'
            }).
            when("/user/center",{
                templateUrl: '/views/user/center.html',
                controller: 'userCenterCtrl'
            }).
            when("/user/credit",{
                templateUrl: '/views/user/credit.html',
                controller: 'userCreditCtrl'
            });
        //登录注册部分
        $routeProvider.
            when("/register",{
                templateUrl: '/views/reg_login/register.html',
                controller: 'userRegisterCtrl'
            }).
            when("/login",{
                templateUrl: '/views/reg_login/login.html',
                controller: 'loginCtrl'
            }).
            when("/registerInfo",{
                templateUrl: '/views/reg_login/info.html',
                controller: 'userRegisterInfoCtrl'
            }).
            when("/forgetpwd",{
                templateUrl: '/views/reg_login/forget_pwd.html',
                controller: 'forgetPWDCtrl'
            });
        //订单部分路由
        $routeProvider.
            when('/order/detail', {
                templateUrl: '/views/order/detail.html',
                controller: 'orderDetailCtrl'
            }).
            when('/order/info', {
                templateUrl: '/views/order/info.html',
                controller: 'orderInfoCtrl'
            }).
            when('/order/list', {
                templateUrl: '/views/order/list.html',
                controller: 'orderListCtrl'
            }).
            when('/order/confirm',{
                templateUrl: '/views/order/confirm.html',
                controller: 'orderConfirmCtrl'
            });
        //账单部分路由
        $routeProvider.
            when('/bill', {
                templateUrl: '/views/bill/bill.html',
                controller: ''
            });
        //默认状态下路由转向登录页面
        $routeProvider.
            otherwise({
                redirectTo: '/main'
            });
        //商品部分路由
    };
    routecfg.$inject=['$routeProvider'];
    return routecfg;
});