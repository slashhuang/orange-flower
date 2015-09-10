define(['angular', './center', "./settings", "./setAccount", "./modifyPwd", "./credit", "./infoCtrl","/js/lib/jquery.js", "/js/lib/jquery.form.min.js"],
    function (angular, center, settings, setAccount, modifyPwd, credit, infoCtrl,$,formSubmit) {
        var userModule = angular.module('userModule', ["ngRoute"]);
        userModule.controller('centerCtrl', center);
        userModule.controller('userSettingsCtrl', settings);
        userModule.controller('setAccountCtrl', setAccount);
        userModule.controller('modifyPwdCtrl', modifyPwd);
        userModule.controller('userCreditCtrl', credit);
        userModule.controller('infoCtrl', infoCtrl);

        //  自定义事件指令value-change
        userModule.directive("valueChange", ['$rootScope','$http',function ($rootScope,$http) {
            return {
                "restrict": "ECAM",
                "link": function (scope, iElements, iAttrs) {
                    iElements.on("change", function () {
                        var curEle = $(iElements);
                        $("#head-form").ajaxSubmit({
                            "type":"post",
                            "dataType":"json",
                            "url": $rootScope.prefuri + "/file/upload?space=user",
                            "success":function(data){
                                $http({
                                    "method":"POST",
                                    "url":$rootScope.prefuri + "/user/modifyDp/" + data["id"]
                                }).success(function(res){
                                    $http({
                                        "url": $rootScope.prefuri + "/user/info",
                                        "method":"POST"
                                    }).success(function(uData){
                                        localStorage.centerData = JSON.stringify(uData);
                                    }).error($rootScope.httpError);
                                }).error($rootScope.httpError);
                                curEle.next("img.user-head-pic").attr({
                                    "src":$rootScope.prefuri + data["smallUrl"]
                                });
                            },
                            "error":function(err){
                                $rootScope.httpError(err);
                            }
                        });
                    });
                }
            };
        }]);
    });