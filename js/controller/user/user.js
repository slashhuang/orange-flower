define(['angular','./center',"./settings","./setAccount","./modifyPwd","./credit"],
    function(angular,center,settings,setAccount,modifyPwd,credit){
        var userModule = angular.module('userModule',["ngRoute"]);
        userModule.controller('centerCtrl',center);
        userModule.controller('userSettingsCtrl',settings);
        userModule.controller('setAccountCtrl',setAccount);
        userModule.controller('modifyPwdCtrl',modifyPwd);
        userModule.controller('userCreditCtrl',credit);
    });