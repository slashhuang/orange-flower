
define([], function () {
    function routecfg($routeProvider){
        //主页部分路由
        $routeProvider.when("/main",{
            templateUrl: '/views/main.html',
            controller: 'mainCtrl'
        });
        //商品部分路由
        $routeProvider.
            when('/sale/list/:listName/:listId', {
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
            when('/sale/detail/:detailId', {
                templateUrl: '/views/sale/detail.html',
                controller: 'detailCtrl'
            }).
            when('/sale/search',{
                templateUrl:"/views/sale/searchProduct.html",
                controller:"searchCtrl"
            })
        ;
        //用户部分路由
        $routeProvider.
            when("/user/settings",{
                templateUrl: '/views/user/settings.html',
                controller: 'userSettingsCtrl'
            }).
            when("/user/center",{
                templateUrl: '/views/user/center.html',
                controller: 'centerCtrl'
            }).
            when("/user/credit",{
                templateUrl: '/views/user/credit.html',
                controller: 'userCreditCtrl'
            }).
            when("/user/setAccount",{
                templateUrl: '/views/user/setAccount.html',
                controller: 'setAccountCtrl'
            }).
            when("/user/modifypwd",{
            templateUrl: '/views/user/modifyPWD.html',
            controller: 'modifyPwdCtrl'
        });
        //登录注册部分
        $routeProvider.
            when("/register",{
                templateUrl: '/views/reg_login/register.html',
                controller: 'registerCtrl'
            }).
            when("/login",{
                templateUrl: '/views/reg_login/login.html',
                controller: 'loginCtrl'
            }).
            when("/registerInfo",{
                templateUrl: '/views/reg_login/info.html',
                controller: 'registerInfoCtrl'
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
            }).
            when('/order/reason',{
                templateUrl: '/views/order/reason.html',
                controller: 'orderReasonCtrl'
            });
        //账单部分路由
        $routeProvider.
            when('/bill', {
                templateUrl: '/views/bill/bill.html',
                controller: 'billMainCtrl'
            }).
            when('/bill/plain', {
                templateUrl: '/views/bill/plain.html',
                controller: 'billPlainCtrl'
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