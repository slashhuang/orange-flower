define(['angular','./center',"./settings","./setAccount","./modifyPwd"],
    function(angular,center,settings,setAccount,modifyPwd){
        var userModule = angular.module('userModule',["ngRoute"]);
        userModule.controller('centerCtrl',center);
        userModule.controller('userSettingsCtrl',settings);
        userModule.controller('setAccountCtrl',setAccount);
        userModule.controller('modifyPwdCtrl',modifyPwd);
    });