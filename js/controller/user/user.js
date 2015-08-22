define(['angular','./center'],
    function(angular,center){
        var userModule = angular.module('userModule',["ngRoute"]);
        userModule.controller('centerCtrl',center);
    });