define(['angular', './center', "./settings", "./setAccount", "./modifyPwd", "./credit", "./infoCtrl",'./invitedCode',"/js/lib/jquery.js", "/js/lib/jquery.form.min.js"],
    function (angular, center, settings, setAccount, modifyPwd, credit, infoCtrl,invitedCode,$,formSubmit) {
        var userModule = angular.module('userModule', ["ngRoute"]);
        userModule.controller('centerCtrl', center);
        userModule.controller('userSettingsCtrl', settings);
        userModule.controller('setAccountCtrl', setAccount);
        userModule.controller('modifyPwdCtrl', modifyPwd);
        userModule.controller('userCreditCtrl', credit);
        userModule.controller('infoCtrl', infoCtrl);
        userModule.controller('invitedCodeCtrl', invitedCode);
        //指令value-change迁移至directives

    });