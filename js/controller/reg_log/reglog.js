//配置路由
define(['angular','./login','./register','./register_info','./forgetPWD'],
    function(angular,login,register,registerInfo,forgetPWD){
        var reglogModule = angular.module('reglogModule',["ngRoute"]);
        reglogModule.controller('loginCtrl',login);
        reglogModule.controller('registerCtrl',register);
        reglogModule.controller('registerInfoCtrl',registerInfo);
        reglogModule.controller('forgetPWDCtrl',forgetPWD);
    });